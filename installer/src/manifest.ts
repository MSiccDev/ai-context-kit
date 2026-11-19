import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

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

export function readManifest(root: string): Manifest | undefined {
  const path = join(root, MANIFEST_PATH);
  if (!existsSync(path)) return undefined;
  return JSON.parse(readFileSync(path, "utf8")) as Manifest;
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
