import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { run } from "../src/cli.js";
import { defaultExec } from "../src/openspec.js";
import { exists, read, tempRepo } from "./helpers.js";

// Runs the real OpenSpec CLI (dev dependency @fission-ai/openspec 2.1.0) end to end.
// OpenSpec's global config goes to a temporary XDG_CONFIG_HOME, so the developer's own settings are untouched.
// HOME and USERPROFILE are temporary too, so nothing can reach a real home folder.
const KEYS = ["PATH", "XDG_CONFIG_HOME", "HOME", "USERPROFILE", "APPDATA"] as const;
const saved = Object.fromEntries(KEYS.map((k) => [k, process.env[k]]));
let home = "";

beforeEach(() => {
  home = mkdtempSync(join(tmpdir(), "ack-home-"));
  process.env.PATH = [join(__dirname, "..", "node_modules", ".bin"), process.env.PATH].join(delimiter);
  process.env.XDG_CONFIG_HOME = join(home, ".config");
  process.env.HOME = home;
  process.env.USERPROFILE = home;
  process.env.APPDATA = join(home, "AppData");
});
afterEach(() => {
  for (const k of KEYS) {
    if (saved[k] === undefined) delete process.env[k];
    else process.env[k] = saved[k];
  }
});

describe("end to end with the real OpenSpec CLI", () => {
  it("init sets up the skills and OpenSpec in one run", async () => {
    const repo = tempRepo();
    const out: string[] = [];
    const code = await run(["init", "--tools", "claude,codex", "--openspec-telemetry", "off", "--yes"], {
      cwd: repo,
      interactive: false,
      stdout: (s) => out.push(s),
      stderr: (s) => out.push(s),
    });
    expect(code, out.join("\n")).toBe(0);

    const list = defaultExec("openspec", ["list", "--json"], { cwd: repo, env: { OPENSPEC_TELEMETRY: "0" } });
    expect(JSON.parse(list.stdout).root).not.toBeNull();
    expect(exists(repo, ".agents/skills/openspec-propose/SKILL.md")).toBe(true);
    expect(exists(repo, ".claude/skills/ack-guide/SKILL.md")).toBe(true);

    const yaml = read(repo, "openspec/config.yaml");
    expect(yaml).toContain("schema: spec-driven");
    expect(yaml).toMatch(/# ai-context-kit:start\ncontext: \|[\s\S]*AGENTS\.md[\s\S]*# ai-context-kit:end/);

    const manifest = JSON.parse(read(repo, ".ai-context-kit/manifest.json"));
    expect(manifest.openspec).toEqual({ version: "2.1.0", telemetry: "off" });

    const config = JSON.parse(read(process.env.XDG_CONFIG_HOME!, "openspec/config.json"));
    expect(config.telemetry.enabled).toBe(false);
    // Project scope: OpenSpec's skills are in the repository, not in the home folder.
    expect(exists(home, ".agents/skills/openspec-propose")).toBe(false);

    const doctorOut: string[] = [];
    const doctor = await run(["doctor", "--json"], { cwd: repo, stdout: (s) => doctorOut.push(s), stderr: () => {} });
    expect(JSON.parse(doctorOut.join("\n")).problems).toEqual([]);
    expect(doctor).toBe(0);
  }, 60000);
});
