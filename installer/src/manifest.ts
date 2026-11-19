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

/** Reads the manifest. Throws UnsafePathError for a symlinked manifest or any path that leaves the repository. */
export function readManifest(root: string): Manifest | undefined {
  const path = guard(root, MANIFEST_PATH);
  if (!existsSync(path)) return undefined;
  const m = JSON.parse(readFileSync(path, "utf8")) as Manifest;
  for (const f of [...(m.files ?? []), ...(m.blocks ?? [])]) checkRelative(f.path);
  return m;
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
