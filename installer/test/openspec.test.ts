import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cliWith, exists, fakeOpenSpec, OPENSPEC_DEFAULT_CONFIG, read, tempRepo, touch } from "./helpers.js";

const init = (cwd: string, fake = fakeOpenSpec(), extra: string[] = [], o: { answers?: string[]; interactive?: boolean; nodeVersion?: string } = {}) =>
  cliWith({ cwd, openspec: fake, ...o }, "init", "--tools", "claude,codex", ...extra);

const argsOf = (calls: { args: string[] }[]) => calls.map((c) => c.args.join(" "));

describe("init: OpenSpec CLI", () => {
  it("stops with install steps when OpenSpec is missing, after installing the skills", async () => {
    const repo = tempRepo();
    const r = await init(repo, fakeOpenSpec({ version: null }), ["--yes"]);
    expect(r.code).toBe(1);
    expect(r.stdout + r.stderr).toContain("npm install -g @fission-ai/openspec@latest");
    expect(exists(repo, ".claude/skills/ack-guide/SKILL.md")).toBe(true);
    expect(argsOf(r.calls)).toEqual(["--version"]);
  });

  it("stops with upgrade steps when OpenSpec is older than 2.1.0", async () => {
    const r = await init(tempRepo(), fakeOpenSpec({ version: "1.13.2" }), ["--yes"]);
    expect(r.code).toBe(1);
    expect(r.stdout + r.stderr).toContain("2.1.0");
    expect(argsOf(r.calls)).toEqual(["--version"]);
  });

  it("continues with a note for a newer major version", async () => {
    const r = await init(tempRepo(), fakeOpenSpec({ version: "3.0.0" }), ["--yes"]);
    expect(r.code).toBe(0);
    expect(r.stdout).toContain("3.0.0");
  });

  it("stops before OpenSpec on a Node version older than 22.12", async () => {
    const r = await init(tempRepo(), fakeOpenSpec(), ["--yes"], { nodeVersion: "v20.19.0" });
    expect(r.code).toBe(1);
    expect(r.stdout + r.stderr).toContain("22.12");
    expect(r.calls).toEqual([]);
  });
});

describe("init: telemetry", () => {
  it("defaults to off without asking in a non-interactive run", async () => {
    const repo = tempRepo();
    const r = await init(repo, fakeOpenSpec(), ["--yes"]);
    expect(r.questions).toEqual([]);
    expect(argsOf(r.calls)).toContain("config set telemetry.enabled false");
    expect(JSON.parse(read(repo, ".ai-context-kit/manifest.json")).openspec.telemetry).toBe("off");
  });

  it("asks in an interactive run, and says the setting is machine-wide", async () => {
    const r = await init(tempRepo(), fakeOpenSpec(), [], { interactive: true, answers: ["n"] });
    expect(r.questions).toHaveLength(1);
    expect(r.questions[0]).toMatch(/machine/i);
    expect(argsOf(r.calls)).toContain("config set telemetry.enabled false");
  });

  it("leaves telemetry on when the user says yes", async () => {
    const repo = tempRepo();
    const r = await init(repo, fakeOpenSpec(), [], { interactive: true, answers: ["y"] });
    expect(argsOf(r.calls)).not.toContain("config set telemetry.enabled false");
    expect(JSON.parse(read(repo, ".ai-context-kit/manifest.json")).openspec.telemetry).toBe("on");
  });

  it("takes --openspec-telemetry on|off", async () => {
    const on = await init(tempRepo(), fakeOpenSpec(), ["--yes", "--openspec-telemetry", "on"]);
    expect(argsOf(on.calls)).not.toContain("config set telemetry.enabled false");
    const off = await init(tempRepo(), fakeOpenSpec(), ["--openspec-telemetry", "off"], { interactive: true });
    expect(off.questions).toEqual([]);
    expect(argsOf(off.calls)).toContain("config set telemetry.enabled false");
  });

  it("rejects another --openspec-telemetry value", async () => {
    const r = await init(tempRepo(), fakeOpenSpec(), ["--openspec-telemetry", "maybe"]);
    expect(r.code).toBe(2);
  });

  it("runs every OpenSpec call with OPENSPEC_TELEMETRY=0 until the answer is on", async () => {
    const r = await init(tempRepo(), fakeOpenSpec(), [], { interactive: true, answers: ["y"] });
    const askedAt = r.calls.findIndex((c) => c.args[0] === "init");
    expect(r.calls.slice(0, 1).every((c) => c.telemetryEnv === "0")).toBe(true);
    expect(askedAt).toBeGreaterThan(0);
    const off = await init(tempRepo(), fakeOpenSpec(), ["--yes"]);
    expect(off.calls.every((c) => c.telemetryEnv === "0")).toBe(true);
  });

  it("does not ask again on a second init", async () => {
    const repo = tempRepo();
    await init(repo, fakeOpenSpec(), [], { interactive: true, answers: ["n"] });
    const again = await init(repo, fakeOpenSpec(), [], { interactive: true, answers: ["n"] });
    expect(again.questions).toEqual([]);
  });
});

describe("init: OpenSpec root", () => {
  it("runs openspec init with the same tool ids when there is no root", async () => {
    const repo = tempRepo();
    const r = await init(repo, fakeOpenSpec(), ["--yes"]);
    expect(r.code).toBe(0);
    expect(argsOf(r.calls)).toContain("init --tools claude,codex --scope project --no-animation .");
    expect(JSON.parse(read(repo, ".ai-context-kit/manifest.json")).openspec.version).toBe("2.1.0");
  });

  it("only checks an existing root and never runs openspec update", async () => {
    const repo = tempRepo();
    touch(repo, "openspec/config.yaml", OPENSPEC_DEFAULT_CONFIG);
    const r = await init(repo, fakeOpenSpec({ stale: 3 }), ["--yes"]);
    expect(r.code).toBe(0);
    const calls = argsOf(r.calls);
    expect(calls).toContain("update --dry-run --json");
    expect(calls.filter((c) => c.startsWith("init"))).toEqual([]);
    expect(calls.filter((c) => c === "update" || c.startsWith("update ") && !c.includes("--dry-run"))).toEqual([]);
    expect(r.stdout).toContain("openspec update");
  });
});

describe("init: openspec/config.yaml", () => {
  it("adds the managed context and rules block to OpenSpec's default file", async () => {
    const repo = tempRepo();
    await init(repo, fakeOpenSpec(), ["--yes"]);
    const yaml = read(repo, "openspec/config.yaml");
    expect(yaml.startsWith(OPENSPEC_DEFAULT_CONFIG)).toBe(true);
    expect(yaml).toMatch(/# ai-context-kit:start\ncontext: \|\n[\s\S]*AGENTS\.md[\s\S]*\nrules:\n[\s\S]*# ai-context-kit:end\n$/);
    const m = JSON.parse(read(repo, ".ai-context-kit/manifest.json"));
    expect(m.blocks.map((b: { path: string }) => b.path)).toContain("openspec/config.yaml");
  });

  it.each(["context: |\n  Mine.\n", "rules:\n  tasks:\n    - Mine\n"])("leaves a config.yaml with its own key untouched (%j)", async (own) => {
    const repo = tempRepo();
    const text = `schema: spec-driven\n${own}`;
    touch(repo, "openspec/config.yaml", text);
    const r = await init(repo, fakeOpenSpec(), ["--yes"]);
    expect(read(repo, "openspec/config.yaml")).toBe(text);
    expect(r.stdout).toContain("openspec/config.yaml");
  });

  it.each([
    ['double-quoted key', '"context": |\n  Mine.\n'],
    ["single-quoted key", "'rules':\n  tasks:\n    - Mine\n"],
    ["explicit key", "? context\n: Mine.\n"],
    ["flow mapping", "{schema: spec-driven, context: Mine}\n"],
    ["document marker", "---\nschema: spec-driven\n"],
    ["anchor", "base: &base\n  x: 1\n"],
    ["merge key", "<<: *base\n"],
  ])("leaves config.yaml with a %s untouched through init and update", async (_name, body) => {
    const repo = tempRepo();
    const text = body.startsWith("{") || body.startsWith("---") ? body : `schema: spec-driven\n${body}`;
    touch(repo, "openspec/config.yaml", text);
    const r = await init(repo, fakeOpenSpec(), ["--yes"]);
    expect(read(repo, "openspec/config.yaml")).toBe(text);
    expect(r.stdout).toContain("openspec/config.yaml");
    await cliWith({ cwd: repo, openspec: fakeOpenSpec() }, "update");
    expect(read(repo, "openspec/config.yaml")).toBe(text);
  });

  it("refreshes only the block on update", async () => {
    const repo = tempRepo();
    await init(repo, fakeOpenSpec(), ["--yes"]);
    const yaml = read(repo, "openspec/config.yaml").replace("AGENTS.md", "CHANGED.md");
    writeFileSync(join(repo, "openspec/config.yaml"), yaml + "# my note\n");
    await cliWith({ cwd: repo, openspec: fakeOpenSpec() }, "update");
    const after = read(repo, "openspec/config.yaml");
    expect(after).toContain("AGENTS.md");
    expect(after).not.toContain("CHANGED.md");
    expect(after.endsWith("# my note\n")).toBe(true);
  });
});

describe("doctor: OpenSpec", () => {
  const doctor = async (repo: string, fake = fakeOpenSpec()) => {
    const r = await cliWith({ cwd: repo, openspec: fake }, "doctor", "--json");
    return { code: r.code, report: JSON.parse(r.stdout) };
  };
  const checks = (list: { check: string }[]) => list.map((p) => p.check);

  async function installed() {
    const repo = tempRepo();
    await init(repo, fakeOpenSpec(), ["--yes"]);
    return repo;
  }

  it("passes on a fresh install", async () => {
    const { code, report } = await doctor(await installed());
    expect(code).toBe(0);
    expect(report.problems).toEqual([]);
  });

  it.each([[null], ["1.13.2"]])("reports OpenSpec %s as a problem", async (version) => {
    const { code, report } = await doctor(await installed(), fakeOpenSpec({ version }));
    expect(code).toBe(1);
    expect(checks(report.problems)).toContain("openspec");
  });

  it("reports a missing OpenSpec root", async () => {
    const repo = await installed();
    const { rmSync } = await import("node:fs");
    rmSync(join(repo, "openspec"), { recursive: true });
    const { code, report } = await doctor(repo);
    expect(code).toBe(1);
    expect(checks(report.problems)).toContain("openspec-root");
  });

  it("warns about stale OpenSpec files", async () => {
    const { report } = await doctor(await installed(), fakeOpenSpec({ stale: 2 }));
    expect(checks(report.warnings)).toContain("openspec-files");
  });
});
