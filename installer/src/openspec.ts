import { spawnSync } from "node:child_process";
import type { Exec, Io } from "./io.js";
import { compareVersions } from "./version.js";

/** ADR-016: the kit relies on OpenSpec 2.1.0 or later. */
export const MIN_OPENSPEC = "2.1.0";
export const INSTALL_COMMAND = "npm install -g @fission-ai/openspec@latest";

export type Telemetry = "on" | "off";
export type CliStatus = { state: "missing" } | { state: "old" | "ok" | "newer"; version: string };

export const defaultExec: Exec = (cmd, args, { cwd, env }) => {
  // Windows installs npm bins as .cmd shims, which Node only starts through a shell.
  // The arguments are fixed strings and registry tool ids, so no user text reaches the shell.
  const windows = process.platform === "win32";
  const r = spawnSync(windows ? `${cmd}.cmd` : cmd, args, {
    cwd,
    env: { ...process.env, ...env },
    encoding: "utf8",
    shell: windows,
  });
  return { status: r.status, stdout: r.stdout ?? "", stderr: r.stderr ?? "", error: r.error as ExecResult["error"] };
};
type ExecResult = ReturnType<Exec>;

/** Runs the OpenSpec CLI. Telemetry stays off (OPENSPEC_TELEMETRY=0) unless the user answered "on". */
export class OpenSpec {
  telemetry: Telemetry | undefined;

  constructor(
    private readonly io: Io,
    private readonly cwd: string,
  ) {}

  private run(args: string[]): ExecResult {
    const env: Record<string, string | undefined> = {};
    if (this.telemetry !== "on") env.OPENSPEC_TELEMETRY = "0";
    return (this.io.exec ?? defaultExec)("openspec", args, { cwd: this.cwd, env });
  }

  status(): CliStatus {
    const r = this.run(["--version"]);
    const version = /\d+\.\d+\.\d+(?:-[\w.]+)?/.exec(r.stdout)?.[0];
    if (r.error || r.status !== 0 || !version) return { state: "missing" };
    if (compareVersions(version, MIN_OPENSPEC) < 0) return { state: "old", version };
    const major = (v: string) => Number.parseInt(v, 10);
    return { state: major(version) > major(MIN_OPENSPEC) ? "newer" : "ok", version };
  }

  hasRoot(): boolean {
    const r = this.run(["list", "--json"]);
    try {
      return r.status === 0 && JSON.parse(r.stdout).root != null;
    } catch {
      return false;
    }
  }

  init(toolIds: string[]): ExecResult {
    // --scope project: OpenSpec 2.1 otherwise installs its skills machine-wide (~/.agents/skills).
    return this.run(["init", "--tools", toolIds.length ? toolIds.join(",") : "none", "--scope", "project", "--no-animation", "."]);
  }

  /** Number of generated files `openspec update` would change, or undefined when the dry run fails. */
  staleFiles(): number | undefined {
    const r = this.run(["update", "--dry-run", "--json"]);
    try {
      return r.status === 0 ? (JSON.parse(r.stdout).changes as unknown[]).length : undefined;
    } catch {
      return undefined;
    }
  }

  telemetryOff(): ExecResult {
    return this.run(["config", "set", "telemetry.enabled", "false"]);
  }
}

export function cliGuidance(status: CliStatus): string[] {
  const head =
    status.state === "missing"
      ? "OpenSpec is not installed. The kit needs OpenSpec 2.1.0 or later (ADR-016)."
      : `OpenSpec ${"version" in status ? status.version : ""} is older than ${MIN_OPENSPEC}, the kit's minimum (ADR-016).`;
  return [
    head,
    `Install or upgrade it (Node.js 22.12 or later), then run "ai-context-kit init" again:`,
    `  ${INSTALL_COMMAND}`,
    "With another package manager (pnpm, yarn, bun, Homebrew), use its equivalent; see OpenSpec's installation docs.",
  ];
}
