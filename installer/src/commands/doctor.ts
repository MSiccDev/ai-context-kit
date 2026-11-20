import { existsSync, readFileSync } from "node:fs";
import { packageVersion } from "../bundle.js";
import type { Io } from "../io.js";
import { ManifestError, readManifest, sha256 } from "../manifest.js";
import { readBlock, styleFor } from "../markers.js";
import { cliGuidance, OpenSpec } from "../openspec.js";
import { guard, UnsafePathError } from "../paths.js";
import { compareVersions, MIN_NODE } from "../version.js";
import { targetRoot } from "./init.js";

interface Finding {
  check: "node" | "manifest" | "missing" | "edited" | "marker-block" | "stale" | "symlink" | "openspec" | "openspec-root" | "openspec-files";
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

  let manifest: ReturnType<typeof readManifest>;
  try {
    manifest = readManifest(root);
  } catch (e) {
    if (e instanceof ManifestError) {
      problems.push({ check: "manifest", path: ".ai-context-kit/manifest.json", message: e.message });
    } else if (e instanceof UnsafePathError) {
      problems.push({ check: e.reason === "symlink" ? "symlink" : "manifest", path: e.path, message: e.message });
    } else {
      throw e;
    }
    manifest = undefined;
  }
  if (manifest === undefined && problems.some((p) => p.check === "manifest" || p.check === "symlink")) {
    // Unsafe manifest: do not read any of its paths.
  } else if (!manifest) {
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
      const full = safe(root, f.path, problems);
      if (!full) continue;
      if (!existsSync(full)) {
        problems.push({ check: "missing", path: f.path, message: 'Missing. "ai-context-kit update" records it as deleted on purpose; "ai-context-kit update --force" restores it.' });
      } else if (sha256(readFileSync(full, "utf8").replace(/\r\n/g, "\n")) !== f.sha256) {
        warnings.push({ check: "edited", path: f.path, message: "Edited locally; updates write a .ai-context-kit-new copy beside it." });
      }
    }
    for (const b of manifest.blocks) {
      if (b.deleted) continue;
      const full = safe(root, b.path, problems);
      if (!full) continue;
      const text = existsSync(full) ? readFileSync(full, "utf8").replace(/\r\n/g, "\n") : undefined;
      if (text === undefined || readBlock(text, styleFor(b.path)) === undefined) {
        problems.push({ check: "marker-block", path: b.path, message: 'The kit block is missing; run "ai-context-kit update".' });
      }
    }
  }

  // OpenSpec (ADR-016): CLI version, root, generated files. Telemetry stays off for these checks.
  const openspec = new OpenSpec(io, root);
  if (manifest?.openspec?.telemetry === "on") openspec.telemetry = "on";
  const status = openspec.status();
  if (status.state === "missing" || status.state === "old") {
    problems.push({ check: "openspec", message: cliGuidance(status).join(" ") });
  } else {
    if (status.state === "newer") {
      warnings.push({ check: "openspec", message: `OpenSpec ${status.version} is newer than the kit's tested 2.1.0.` });
    }
    if (!openspec.hasRoot()) {
      problems.push({ check: "openspec-root", message: 'No OpenSpec root; run "ai-context-kit init" (it runs "openspec init").' });
    } else {
      const stale = openspec.staleFiles();
      if (stale === undefined) {
        warnings.push({ check: "openspec-files", message: 'Could not check OpenSpec\'s generated files; run "openspec update --dry-run".' });
      } else if (stale > 0) {
        warnings.push({ check: "openspec-files", message: `${stale} OpenSpec files are older than the CLI; review "openspec update --dry-run", then run "openspec update".` });
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

function safe(root: string, path: string, problems: Finding[]): string | undefined {
  try {
    return guard(root, path);
  } catch (e) {
    if (!(e instanceof UnsafePathError)) throw e;
    problems.push({ check: e.reason === "symlink" ? "symlink" : "manifest", path, message: e.message });
    return undefined;
  }
}
