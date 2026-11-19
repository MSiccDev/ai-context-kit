import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { codexSidecar, loadSkills, packageVersion, stampProvenance } from "./bundle.js";
import { MANIFEST_PATH, readManifest, serializeManifest, sha256, type Manifest, type ManifestFile } from "./manifest.js";
import { readBlock, writeBlock } from "./markers.js";
import { findTool, type Tool } from "./registry.js";

export const NEW_SUFFIX = ".ai-context-kit-new";

export type Action = "written" | "updated" | "unchanged" | "conflict" | "kept-deleted" | "removed" | "kept-edited";

export interface Event {
  path: string;
  action: Action;
}

/** Everything the kit wants on disk for a set of tools. */
export interface Plan {
  files: Map<string, string>;
  blocks: Map<string, string>;
}

export function plan(tools: Tool[], version: string): Plan {
  const files = new Map<string, string>();
  const skills = loadSkills();
  const dirs = new Map<string, Tool[]>();
  for (const t of tools) dirs.set(t.skillsDir, [...(dirs.get(t.skillsDir) ?? []), t]);
  for (const [dir, owners] of dirs) {
    const sidecars = owners.some((t) => t.codexSidecar);
    for (const skill of skills) {
      for (const [rel, text] of skill.files) {
        files.set(`${dir}/${skill.name}/${rel}`, rel === "SKILL.md" ? stampProvenance(text, version) : text);
      }
      if (sidecars && skill.invocation === "user") {
        files.set(`${dir}/${skill.name}/agents/openai.yaml`, codexSidecar(skill));
      }
    }
  }
  const blocks = new Map<string, string>();
  blocks.set("AGENTS.md", agentsBlock(tools));
  if (tools.some((t) => t.claudeBridge)) blocks.set("CLAUDE.md", "@AGENTS.md");
  return { files, blocks };
}

function agentsBlock(tools: Tool[]): string {
  const lines = [
    "## AI Context Kit",
    "Installed by `@msiccdev/ai-context-kit`. Edit outside these markers; `ai-context-kit update` rewrites the text between them.",
    "",
  ];
  if (tools.length === 0) {
    lines.push("No tool-specific skills are installed.");
  } else {
    lines.push("| Tool | Skills | Start a skill |", "| --- | --- | --- |");
    for (const t of tools) lines.push(`| ${t.name} | \`${t.skillsDir}/ack-*\` | \`${t.invoke("ack-guide")}\` |`);
  }
  lines.push(
    "",
    `Next: run \`${tools[0]?.invoke("ack-setup") ?? "/ack-setup"}\` to fill in this project's context, and \`${tools[0]?.invoke("ack-guide") ?? "/ack-guide"}\` to find the right skill for a task.`,
  );
  return lines.join("\n");
}

export interface SyncOptions {
  root: string;
  tools: Tool[];
  force?: boolean;
}

/** Applies the plan with the update rule and writes the manifest. */
export function sync({ root, tools, force = false }: SyncOptions): Event[] {
  const version = packageVersion();
  const previous = readManifest(root);
  const known = new Map<string, ManifestFile>((previous?.files ?? []).map((f) => [f.path, f]));
  const knownBlocks = new Map<string, ManifestFile>((previous?.blocks ?? []).map((f) => [f.path, f]));
  const desired = plan(tools, version);
  const events: Event[] = [];
  const files: ManifestFile[] = [];
  const blocks: ManifestFile[] = [];

  for (const [path, content] of desired.files) {
    const hash = sha256(content);
    const record = known.get(path);
    const full = join(root, path);
    if (!existsSync(full)) {
      if (record && !force) {
        events.push({ path, action: "kept-deleted" });
        files.push({ ...record, deleted: true });
      } else {
        write(full, content);
        events.push({ path, action: "written" });
        files.push({ path, sha256: hash });
      }
      continue;
    }
    const current = read(full);
    const currentHash = sha256(current);
    if (currentHash === hash) {
      events.push({ path, action: "unchanged" });
      files.push({ path, sha256: hash });
    } else if (force || (record && !record.deleted && record.sha256 === currentHash)) {
      write(full, content);
      events.push({ path, action: "updated" });
      files.push({ path, sha256: hash });
    } else {
      write(full + NEW_SUFFIX, content);
      events.push({ path, action: "conflict" });
      files.push({ path, sha256: record?.sha256 ?? hash });
    }
  }

  for (const [path, record] of known) {
    if (desired.files.has(path)) continue;
    const full = join(root, path);
    if (!existsSync(full)) continue;
    if (sha256(read(full)) === record.sha256) {
      rmSync(full);
      events.push({ path, action: "removed" });
    } else {
      events.push({ path, action: "kept-edited" });
    }
  }

  for (const [path, body] of desired.blocks) {
    const full = join(root, path);
    const record = knownBlocks.get(path);
    const exists = existsSync(full);
    if (!exists && record && !force) {
      events.push({ path, action: "kept-deleted" });
      blocks.push({ ...record, deleted: true });
      continue;
    }
    const before = exists ? read(full) : undefined;
    const after = writeBlock(before, body);
    if (before === after) {
      events.push({ path, action: "unchanged" });
    } else {
      write(full, after);
      events.push({ path, action: before === undefined ? "written" : "updated" });
    }
    blocks.push({ path, sha256: sha256(readBlock(after) ?? "") });
  }

  const manifest: Manifest = {
    schemaVersion: 1,
    kitVersion: version,
    tools: tools.map((t) => t.id),
    files,
    blocks,
  };
  const manifestText = serializeManifest(manifest);
  const manifestPath = join(root, MANIFEST_PATH);
  if (!existsSync(manifestPath) || read(manifestPath) !== manifestText) write(manifestPath, manifestText);
  return events;
}

export function toolsFrom(ids: string[]): Tool[] {
  return ids.map((id) => findTool(id)).filter((t): t is Tool => t !== undefined);
}

function read(path: string): string {
  return readFileSync(path, "utf8").replace(/\r\n/g, "\n");
}

function write(path: string, content: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, "utf8");
}
