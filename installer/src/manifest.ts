import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { checkRelative, guard } from "./paths.js";

export const MANIFEST_PATH = ".ai-context-kit/manifest.json";

export interface ManifestFile {
  path: string;
  sha256: string;
  /** The user deleted this file; updates leave it deleted. */
  deleted?: boolean;
}

export interface Manifest {
  schemaVersion: 1;
  kitVersion: string;
  tools: string[];
  files: ManifestFile[];
  blocks: ManifestFile[];
}

export function sha256(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

/** The manifest exists but cannot be read or does not have the expected shape. */
export class ManifestError extends Error {}

/**
 * Reads the manifest. Throws ManifestError for invalid JSON or a wrong shape, and
 * UnsafePathError for a symlinked manifest or any path that leaves the repository.
 */
export function readManifest(root: string): Manifest | undefined {
  const path = guard(root, MANIFEST_PATH);
  if (!existsSync(path)) return undefined;
  let data: unknown;
  try {
    data = JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    throw new ManifestError(`${MANIFEST_PATH} is not valid JSON (${(e as Error).message}).`);
  }
  const m = validate(data);
  for (const f of [...m.files, ...m.blocks]) checkRelative(f.path);
  return m;
}

function validate(data: unknown): Manifest {
  const fail = (what: string): never => {
    throw new ManifestError(`${MANIFEST_PATH} is malformed: ${what}.`);
  };
  if (typeof data !== "object" || data === null || Array.isArray(data)) fail("expected a JSON object");
  const m = data as Record<string, unknown>;
  if (m.schemaVersion !== 1) fail("schemaVersion must be 1");
  if (typeof m.kitVersion !== "string" || m.kitVersion === "") fail("kitVersion must be a version string");
  if (!Array.isArray(m.tools) || !m.tools.every((t) => typeof t === "string")) fail("tools must be a list of tool ids");
  for (const key of ["files", "blocks"] as const) {
    const list = m[key];
    if (!Array.isArray(list)) fail(`${key} must be a list`);
    (list as unknown[]).forEach((entry, i) => {
      const e = entry as Record<string, unknown>;
      if (typeof e !== "object" || e === null) fail(`${key}[${i}] must be an object`);
      if (typeof e.path !== "string") fail(`${key}[${i}].path must be a string`);
      if (typeof e.sha256 !== "string" || !/^[0-9a-f]{64}$/.test(e.sha256)) fail(`${key}[${i}].sha256 must be a sha256 hex digest`);
      if (e.deleted !== undefined && typeof e.deleted !== "boolean") fail(`${key}[${i}].deleted must be true or false`);
    });
  }
  return m as unknown as Manifest;
}

export function serializeManifest(m: Manifest): string {
  const sorted: Manifest = {
    ...m,
    tools: [...m.tools],
    files: [...m.files].sort((a, b) => a.path.localeCompare(b.path)),
    blocks: [...m.blocks].sort((a, b) => a.path.localeCompare(b.path)),
  };
  return JSON.stringify(sorted, null, 2) + "\n";
}
