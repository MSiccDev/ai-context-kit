import { existsSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { UsageError, type Io } from "../io.js";
import { readManifest } from "../manifest.js";
import { TOOLS, findTool, type Tool } from "../registry.js";
import { sync, toolsFrom, type Event } from "../sync.js";

export function targetRoot(io: Io, positionals: string[]): string {
  const root = resolve(io.cwd, positionals[0] ?? ".");
  if (!existsSync(root) || !statSync(root).isDirectory()) throw new UsageError(`Not a directory: ${root}`);
  return root;
}

function parseTools(spec: string): Tool[] {
  if (spec === "all") return [...TOOLS];
  if (spec === "none") return [];
  const ids = spec.split(",").map((s) => s.trim()).filter(Boolean);
  const unknown = ids.filter((id) => !findTool(id));
  if (unknown.length) throw new UsageError(`Unknown tool id: ${unknown.join(", ")}. Run "ai-context-kit tools" for the list.`);
  return ids.map((id) => findTool(id)!);
}

function detect(root: string): Tool[] {
  return TOOLS.filter((t) => t.detectionPaths.some((p) => existsSync(join(root, p))));
}

export function init(io: Io, positionals: string[], values: Record<string, unknown>): number {
  const root = targetRoot(io, positionals);
  let requested: Tool[];
  if (typeof values.tools === "string") requested = parseTools(values.tools);
  else {
    requested = detect(root);
    if (requested.length === 0) {
      throw new UsageError('No supported tool detected. Pass --tools, for example "--tools claude,codex", or "--tools all".');
    }
  }
  const previous = toolsFrom(readManifest(root)?.tools ?? []);
  const tools = TOOLS.filter((t) => previous.includes(t) || requested.includes(t));
  report(io, sync({ root, tools }));
  io.stdout(`Installed for: ${tools.map((t) => t.id).join(", ") || "no tools"}.`);
  return 0;
}

export function report(io: Io, events: Event[]): void {
  const counts = new Map<string, number>();
  for (const e of events) counts.set(e.action, (counts.get(e.action) ?? 0) + 1);
  io.stdout([...counts].map(([a, n]) => `${a}: ${n}`).join(", "));
  for (const e of events) {
    if (e.action === "conflict") io.stdout(`Edited locally, new version written beside it: ${e.path}.ai-context-kit-new`);
    if (e.action === "conflict-copy-kept") {
      io.stdout(`Edited locally, and its conflict copy was edited too; both kept: ${e.path}.ai-context-kit-new`);
    }
    if (e.action === "kept-deleted") io.stdout(`Deleted locally, left deleted: ${e.path}`);
    if (e.action === "kept-edited") io.stdout(`No longer part of the kit but edited locally, kept: ${e.path}`);
  }
}
