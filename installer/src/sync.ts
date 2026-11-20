import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { codexSidecar, loadSkills, packageVersion, stampProvenance } from "./bundle.js";
import { MANIFEST_PATH, readManifest, serializeManifest, sha256, type Manifest, type ManifestFile } from "./manifest.js";
import { outsideBlock, readBlock, styleFor, writeBlock, YAML } from "./markers.js";
import { findTool, type Tool } from "./registry.js";
import { guard, UnsafePathError } from "./paths.js";

export const NEW_SUFFIX = ".ai-context-kit-new";

export type Action =
  | "written"
  | "updated"
  | "unchanged"
  | "conflict"
  | "conflict-copy-kept"
  | "kept-deleted"
  | "removed"
  | "kept-edited"
  | "refused";

export interface Event {
  path: string;
  action: Action;
  reason?: string;
}

/** Everything the kit wants on disk for a set of tools. */
export interface Plan {
  files: Map<string, string>;
  blocks: Map<string, string>;
}

export const OPENSPEC_CONFIG = "openspec/config.yaml";

/** The kit's managed context and rules for openspec/config.yaml (pointers, not copies; spec section 11.4). */
export const OPENSPEC_CONFIG_BLOCK = [
  "context: |",
  "  Project context, roles and conventions: AGENTS.md (read it first).",
  "  Architecture decisions: docs/adr/ when present.",
  "  Glossary: arc42 section 12 when docs/arc42/ exists, otherwise CONTEXT.md when present.",
  "rules:",
  "  proposal:",
  "    - Name the ADRs the change follows or needs.",
  "  design:",
  "    - Confirm the test seams with the user before tasks are written.",
  "  tasks:",
  "    - Slice tasks vertically, so each task leaves the repository consistent.",
].join("\n");

/**
 * Whether the kit may manage openspec/config.yaml: the file exists, and `context` and `rules`
 * appear only inside the kit block (or not at all).
 */
export function configManaged(root: string): "managed" | "absent" | "user-owned" | "unsafe" {
  let full: string;
  try {
    full = guard(root, OPENSPEC_CONFIG);
  } catch {
    return "unsafe";
  }
  if (!existsSync(full)) return "absent";
  const outside = outsideBlock(readFileSync(full, "utf8"), YAML);
  return /^(context|rules)\s*:/m.test(outside) ? "user-owned" : "managed";
}

export function plan(tools: Tool[], version: string, root?: string): Plan {
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
  if (root && configManaged(root) === "managed") blocks.set(OPENSPEC_CONFIG, OPENSPEC_CONFIG_BLOCK);
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
  /** OpenSpec facts to record; kept from the previous manifest when omitted. */
  openspec?: Manifest["openspec"];
}

/** Applies the plan with the update rule and writes the manifest. */
export function sync({ root, tools, force = false, openspec }: SyncOptions): Event[] {
  const version = packageVersion();
  const previous = readManifest(root);
  const known = new Map<string, ManifestFile>((previous?.files ?? []).map((f) => [f.path, f]));
  const knownBlocks = new Map<string, ManifestFile>((previous?.blocks ?? []).map((f) => [f.path, f]));
  const desired = plan(tools, version, root);
  const events: Event[] = [];
  const files: ManifestFile[] = [];
  const blocks: ManifestFile[] = [];

  const refuse = (e: unknown, path: string, record?: ManifestFile) => {
    if (!(e instanceof UnsafePathError)) throw e;
    events.push({ path, action: "refused", reason: e.message });
    return record;
  };

  for (const [path, content] of desired.files) {
    const hash = sha256(content);
    const record = known.get(path);
    let full: string;
    try {
      full = guard(root, path);
      guard(root, path + NEW_SUFFIX);
    } catch (e) {
      const r = refuse(e, path, record);
      if (r) files.push(r);
      continue;
    }
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
      // The conflict copy is where the user merges; never overwrite an edited one.
      const copy = full + NEW_SUFFIX;
      if (existsSync(copy) && read(copy) !== content) {
        events.push({ path, action: "conflict-copy-kept" });
      } else {
        if (!existsSync(copy)) write(copy, content);
        events.push({ path, action: "conflict" });
      }
      files.push({ path, sha256: record?.sha256 ?? hash });
    }
  }

  for (const [path, record] of known) {
    if (desired.files.has(path)) continue;
    let full: string;
    try {
      full = guard(root, path);
    } catch (e) {
      refuse(e, path);
      continue;
    }
    if (!existsSync(full)) continue;
    if (sha256(read(full)) === record.sha256) {
      rmSync(full);
      events.push({ path, action: "removed" });
    } else {
      events.push({ path, action: "kept-edited" });
    }
  }

  for (const [path, body] of desired.blocks) {
    let full: string;
    try {
      full = guard(root, path);
    } catch (e) {
      const r = refuse(e, path, knownBlocks.get(path));
      if (r) blocks.push(r);
      continue;
    }
    const record = knownBlocks.get(path);
    const exists = existsSync(full);
    if (!exists && record && !force) {
      events.push({ path, action: "kept-deleted" });
      blocks.push({ ...record, deleted: true });
      continue;
    }
    // Read raw: text outside the markers keeps its bytes, including CRLF.
    const before = exists ? readFileSync(full, "utf8") : undefined;
    const style = styleFor(path);
    const after = writeBlock(before, body, style);
    if (before === after) {
      events.push({ path, action: "unchanged" });
    } else {
      write(full, after);
      events.push({ path, action: before === undefined ? "written" : "updated" });
    }
    blocks.push({ path, sha256: sha256(readBlock(after, style) ?? "") });
  }

  const manifest: Manifest = {
    schemaVersion: 1,
    kitVersion: version,
    tools: tools.map((t) => t.id),
    files,
    blocks,
    ...((openspec ?? previous?.openspec) ? { openspec: openspec ?? previous?.openspec } : {}),
  };
  const manifestText = serializeManifest(manifest);
  try {
    const manifestPath = guard(root, MANIFEST_PATH);
    if (!existsSync(manifestPath) || read(manifestPath) !== manifestText) write(manifestPath, manifestText);
  } catch (e) {
    refuse(e, MANIFEST_PATH);
  }
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
