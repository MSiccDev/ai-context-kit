import { mkdtempSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, sep } from "node:path";
import { MIN_OPENSPEC } from "../src/openspec.js";
import { MIN_NODE } from "../src/version.js";
import { run } from "../src/cli.js";

export function tempRepo(): string {
  return mkdtempSync(join(tmpdir(), "ack-installer-"));
}

export function touch(root: string, path: string, content = ""): void {
  const full = join(root, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content);
}

export function read(root: string, path: string): string {
  return readFileSync(join(root, path), "utf8");
}

export function exists(root: string, path: string): boolean {
  return existsSync(join(root, path));
}

export function listFiles(root: string): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else out.push(relative(root, full).split(sep).join("/"));
    }
  };
  walk(root);
  return out.sort();
}

export interface FakeCall {
  args: string[];
  telemetryEnv: string | undefined;
}

export interface FakeOpenSpec {
  /** Version printed by `openspec --version`; null means the CLI is not installed. */
  version: string | null;
  /** Report a root even when no openspec/ folder exists (the default for tests that are not about OpenSpec). */
  assumeRoot?: boolean;
  /** Number of files `openspec update --dry-run --json` would change. */
  stale?: number;
  calls: FakeCall[];
}

export const OPENSPEC_DEFAULT_CONFIG = `schema: spec-driven

# Project context (optional)
# Example:
#   context: |
#     Designs and tasks must cover Windows, macOS, and Linux

# Per-artifact rules (optional)
# Example:
#   rules:
#     proposal:
#       - Keep proposals under 500 words
`;

export function fakeOpenSpec(opts: Partial<FakeOpenSpec> = {}): FakeOpenSpec {
  return { version: MIN_OPENSPEC, calls: [], ...opts };
}

export function fakeExec(fake: FakeOpenSpec) {
  return (cmd: string, args: string[], o: { cwd: string; env: Record<string, string | undefined> }) => {
    fake.calls.push({ args, telemetryEnv: o.env.OPENSPEC_TELEMETRY });
    if (cmd !== "openspec" || fake.version === null) {
      return { status: null, stdout: "", stderr: "", error: Object.assign(new Error("spawn openspec ENOENT"), { code: "ENOENT" }) };
    }
    const ok = (stdout: string) => ({ status: 0, stdout, stderr: "" });
    const [first, second] = args;
    if (first === "--version") return ok(`${fake.version}\n`);
    if (first === "list") {
      const has = fake.assumeRoot || existsSync(join(o.cwd, "openspec"));
      return ok(JSON.stringify({ changes: [], root: has ? { path: o.cwd, source: "nearest" } : null }));
    }
    if (first === "init") {
      mkdirSync(join(o.cwd, "openspec", "specs"), { recursive: true });
      writeFileSync(join(o.cwd, "openspec", "config.yaml"), OPENSPEC_DEFAULT_CONFIG);
      return ok("OpenSpec Setup Complete\n");
    }
    if (first === "update" && second === "--dry-run") {
      const n = fake.stale ?? 0;
      return ok(JSON.stringify({ changes: Array.from({ length: n }, (_, i) => ({ path: `f${i}`, action: "update" })), notes: [], failures: [] }));
    }
    if (first === "config") return ok("Set telemetry.enabled = false\n");
    return { status: 1, stdout: "", stderr: `unexpected: ${args.join(" ")}` };
  };
}

export async function cli(cwd: string, ...argv: string[]) {
  return cliWith({ cwd }, ...argv);
}

export async function cliWith(
  opts: { cwd: string; openspec?: FakeOpenSpec; answers?: string[]; interactive?: boolean; nodeVersion?: string },
  ...argv: string[]
) {
  const out: string[] = [];
  const err: string[] = [];
  const fake = opts.openspec ?? fakeOpenSpec({ assumeRoot: true });
  const answers = [...(opts.answers ?? [])];
  const questions: string[] = [];
  const code = await run(argv, {
    cwd: opts.cwd,
    stdout: (s) => out.push(s),
    stderr: (s) => err.push(s),
    exec: fakeExec(fake),
    interactive: opts.interactive ?? false,
    ask: async (q) => {
      questions.push(q);
      return answers.shift() ?? "";
    },
    nodeVersion: opts.nodeVersion ?? `v${MIN_NODE}`,
  });
  return { code, stdout: out.join("\n"), stderr: err.join("\n"), questions, calls: fake.calls };
}
