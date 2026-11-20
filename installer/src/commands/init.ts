import { existsSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { UsageError, type Io } from "../io.js";
import { ManifestError, readManifest } from "../manifest.js";
import { TOOLS, findTool, type Tool } from "../registry.js";
import { UnsafePathError } from "../paths.js";
import { cliGuidance, OpenSpec, type Telemetry } from "../openspec.js";
import { compareVersions, MIN_NODE } from "../version.js";
import { configManaged, OPENSPEC_CONFIG, sync, toolsFrom, type Event } from "../sync.js";

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

export async function init(io: Io, positionals: string[], values: Record<string, unknown>): Promise<number> {
  const root = targetRoot(io, positionals);
  const telemetryFlag = values["openspec-telemetry"];
  if (telemetryFlag !== undefined && telemetryFlag !== "on" && telemetryFlag !== "off") {
    throw new UsageError('--openspec-telemetry must be "on" or "off".');
  }
  let requested: Tool[];
  if (typeof values.tools === "string") requested = parseTools(values.tools);
  else {
    requested = detect(root);
    if (requested.length === 0) {
      throw new UsageError('No supported tool detected. Pass --tools, for example "--tools claude,codex", or "--tools all".');
    }
  }
  const manifest = loadManifest(io, root);
  if (manifest === null) return 1;
  const previous = toolsFrom(manifest?.tools ?? []);
  const tools = TOOLS.filter((t) => previous.includes(t) || requested.includes(t));
  const events = sync({ root, tools });
  report(io, events);
  io.stdout(`Installed for: ${tools.map((t) => t.id).join(", ") || "no tools"}.`);
  if (events.some((e) => e.action === "refused")) return 1;
  return setUpOpenSpec(io, root, tools.map((t) => t.id), {
    telemetryFlag: telemetryFlag as Telemetry | undefined,
    previous: manifest?.openspec,
    yes: values.yes === true,
  });
}

/** Plan Part 3, OpenSpec steps 1 to 6. Returns the exit code. */
async function setUpOpenSpec(
  io: Io,
  root: string,
  toolIds: string[],
  opts: { telemetryFlag?: Telemetry; previous?: { version?: string; telemetry?: Telemetry }; yes: boolean },
): Promise<number> {
  // 1. Node.
  const node = io.nodeVersion ?? process.version;
  if (compareVersions(node, MIN_NODE) < 0) {
    io.stderr(`Node ${node} is older than ${MIN_NODE} (ADR-018). Upgrade Node.js, then run "ai-context-kit init" again to set up OpenSpec.`);
    return 1;
  }

  // 2. OpenSpec CLI.
  const openspec = new OpenSpec(io, root);
  const status = openspec.status();
  if (status.state === "missing" || status.state === "old") {
    for (const line of cliGuidance(status)) io.stderr(line);
    return 1;
  }
  if (status.state === "newer") io.stdout(`OpenSpec ${status.version} is newer than the kit's tested ${"2.1.0"}; continuing.`);

  // 3. Telemetry, asked once.
  let telemetry = opts.telemetryFlag ?? opts.previous?.telemetry;
  if (!telemetry) {
    if (io.interactive && !opts.yes && io.ask) {
      const answer = await io.ask(
        "OpenSpec sends anonymous usage statistics by default. Keep them on? This is a machine-wide OpenSpec setting. [y/N] ",
      );
      telemetry = /^y(es)?$/i.test(answer.trim()) ? "on" : "off";
    } else {
      telemetry = "off";
      io.stdout('OpenSpec telemetry: off (default for non-interactive runs; pass "--openspec-telemetry on" to keep it).');
    }
  }
  if (telemetry === "off" && opts.previous?.telemetry !== "off") {
    const r = openspec.telemetryOff();
    io.stdout(r.status === 0 ? "OpenSpec telemetry turned off (machine-wide: openspec config set telemetry.enabled false)." : "Could not turn OpenSpec telemetry off; run: openspec config set telemetry.enabled false");
  }
  openspec.telemetry = telemetry;

  // 4. Root: init when missing, check only when present.
  if (!openspec.hasRoot()) {
    const r = openspec.init(toolIds);
    for (const line of (r.stdout + r.stderr).split("\n").filter((l) => l.trim())) io.stdout(`  ${line}`);
    if (r.status !== 0 || !openspec.hasRoot()) {
      io.stderr('"openspec init" did not create an OpenSpec root; see its output above.');
      return 1;
    }
  } else {
    const stale = openspec.staleFiles();
    if (stale === undefined) io.stdout('Could not check the OpenSpec files; run "openspec update --dry-run" to see whether they are current.');
    else if (stale > 0) {
      io.stdout(`OpenSpec's generated files are older than the CLI (${stale} would change). Review and run:`);
      io.stdout("  openspec update --dry-run");
      io.stdout("  openspec update");
    }
  }

  // 5. config.yaml, 6. record: a second pass adds the managed block and the OpenSpec facts.
  const state = configManaged(root);
  if (state === "user-owned") io.stdout(`${OPENSPEC_CONFIG} already sets context or rules; left unchanged. Point its context to AGENTS.md (spec section 11.4).`);
  if (state === "unsupported") {
    io.stdout(`${OPENSPEC_CONFIG} uses YAML the installer does not edit safely (flow style, document markers, anchors, tags or explicit keys); left unchanged. Add context and rules by hand, pointing to AGENTS.md (spec section 11.4).`);
  }
  const tools = toolsFrom(toolIds);
  const events = sync({ root, tools, openspec: { version: status.version, telemetry } });
  const config = events.find((e) => e.path === OPENSPEC_CONFIG);
  if (config && config.action !== "unchanged") io.stdout(`${OPENSPEC_CONFIG}: kit context and rules ${config.action}.`);
  if (events.some((e) => e.action === "refused")) {
    report(io, events);
    return 1;
  }
  io.stdout(`OpenSpec ${status.version} is set up.`);
  return 0;
}

/** Reads the manifest, or reports an unsafe one and returns null. */
export function loadManifest(io: Io, root: string): ReturnType<typeof readManifest> | null {
  try {
    return readManifest(root);
  } catch (e) {
    if (e instanceof ManifestError) {
      io.stderr(`Refusing to run: ${e.message} Fix or remove the manifest; nothing was changed.`);
      return null;
    }
    if (!(e instanceof UnsafePathError)) throw e;
    io.stderr(`Refusing to run: the manifest is unsafe. ${e.message} Check .ai-context-kit/manifest.json.`);
    return null;
  }
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
    if (e.action === "refused") io.stderr(`Refused: ${e.reason}`);
    if (e.action === "kept-deleted") io.stdout(`Deleted locally, left deleted: ${e.path}`);
    if (e.action === "kept-edited") io.stdout(`No longer part of the kit but edited locally, kept: ${e.path}`);
  }
}
