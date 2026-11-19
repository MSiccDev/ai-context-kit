import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { packageVersion } from "../bundle.js";
import type { Io } from "../io.js";
import { readManifest, sha256 } from "../manifest.js";
import { readBlock } from "../markers.js";
import { compareVersions, MIN_NODE } from "../version.js";
import { targetRoot } from "./init.js";

interface Finding {
  check: "node" | "manifest" | "missing" | "edited" | "marker-block" | "stale";
  path?: string;
  message: string;
}

export function doctor(io: Io, positionals: string[], values: Record<string, unknown>): number {
  const root = targetRoot(io, positionals);
  const problems: Finding[] = [];
  const warnings: Finding[] = [];
  const node = io.nodeVersion ?? process.version;
  const version = packageVersion();

  if (compareVersions(node, MIN_NODE) < 0) {
    problems.push({ check: "node", message: `Node ${node} is older than ${MIN_NODE}; upgrade Node.` });
  }

  const manifest = readManifest(root);
  if (!manifest) {
    problems.push({ check: "manifest", message: 'No .ai-context-kit/manifest.json; run "ai-context-kit init".' });
  } else {
    if (compareVersions(manifest.kitVersion, version) < 0) {
      problems.push({
        check: "stale",
        message: `Installed by kit ${manifest.kitVersion}; this package is ${version}. Run "ai-context-kit update".`,
      });
    }
    for (const f of manifest.files) {
      if (f.deleted) continue;
      const full = join(root, f.path);
      if (!existsSync(full)) {
        problems.push({ check: "missing", path: f.path, message: 'Missing. "ai-context-kit update" records it as deleted on purpose; "ai-context-kit update --force" restores it.' });
      } else if (sha256(readFileSync(full, "utf8").replace(/\r\n/g, "\n")) !== f.sha256) {
        warnings.push({ check: "edited", path: f.path, message: "Edited locally; updates write a .ai-context-kit-new copy beside it." });
      }
    }
    for (const b of manifest.blocks) {
      if (b.deleted) continue;
      const full = join(root, b.path);
      const text = existsSync(full) ? readFileSync(full, "utf8").replace(/\r\n/g, "\n") : undefined;
      if (text === undefined || readBlock(text) === undefined) {
        problems.push({ check: "marker-block", path: b.path, message: 'The kit block is missing; run "ai-context-kit update".' });
      }
    }
  }

  if (values.json === true) {
    io.stdout(JSON.stringify({ kitVersion: version, node, problems, warnings }, null, 2));
  } else {
    if (problems.length === 0 && warnings.length === 0) io.stdout("All checks passed.");
    for (const p of problems) io.stdout(`PROBLEM ${p.check}${p.path ? ` ${p.path}` : ""}: ${p.message}`);
    for (const w of warnings) io.stdout(`WARNING ${w.check}${w.path ? ` ${w.path}` : ""}: ${w.message}`);
  }
  return problems.length > 0 ? 1 : 0;
}
