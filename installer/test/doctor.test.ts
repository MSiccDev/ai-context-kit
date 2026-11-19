import { rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { run } from "../src/cli.js";
import { cli, read, tempRepo } from "./helpers.js";

async function installed(tools = "claude") {
  const repo = tempRepo();
  expect((await cli(repo, "init", "--tools", tools, "--yes")).code).toBe(0);
  return repo;
}

async function doctorJson(repo: string, nodeVersion = "v22.12.0") {
  const out: string[] = [];
  const code = await run(["doctor", "--json"], { cwd: repo, nodeVersion, stdout: (s) => out.push(s), stderr: () => {} });
  return { code, report: JSON.parse(out.join("\n")) };
}

describe("doctor", () => {
  it("passes on a fresh install", async () => {
    const { code, report } = await doctorJson(await installed());
    expect(code).toBe(0);
    expect(report.problems).toEqual([]);
    expect(report.warnings).toEqual([]);
  });

  it.each(["v20.19.0", "v22.11.0"])("reports Node %s as older than 22.12", async (v) => {
    const { code, report } = await doctorJson(await installed(), v);
    expect(code).toBe(1);
    expect(report.problems.map((p: { check: string }) => p.check)).toContain("node");
  });

  it.each(["v22.12.0", "v24.1.0"])("accepts Node %s", async (v) => {
    const { code } = await doctorJson(await installed(), v);
    expect(code).toBe(0);
  });

  it("reports a missing managed file", async () => {
    const repo = await installed();
    rmSync(join(repo, ".claude/skills/ack-guide/SKILL.md"));
    const { code, report } = await doctorJson(repo);
    expect(code).toBe(1);
    expect(report.problems).toContainEqual(expect.objectContaining({ check: "missing", path: ".claude/skills/ack-guide/SKILL.md" }));
  });

  it("warns about a locally edited file without failing", async () => {
    const repo = await installed();
    const p = ".claude/skills/ack-guide/SKILL.md";
    writeFileSync(join(repo, p), read(repo, p) + "\nlocal\n");
    const { code, report } = await doctorJson(repo);
    expect(code).toBe(0);
    expect(report.warnings).toContainEqual(expect.objectContaining({ check: "edited", path: p }));
  });

  it("reports a missing marker block", async () => {
    const repo = await installed();
    writeFileSync(join(repo, "CLAUDE.md"), "No block here.\n");
    const { code, report } = await doctorJson(repo);
    expect(code).toBe(1);
    expect(report.problems).toContainEqual(expect.objectContaining({ check: "marker-block", path: "CLAUDE.md" }));
  });

  it("reports skills installed by an older kit version", async () => {
    const repo = await installed();
    const m = JSON.parse(read(repo, ".ai-context-kit/manifest.json"));
    m.kitVersion = "1.5.3";
    writeFileSync(join(repo, ".ai-context-kit/manifest.json"), JSON.stringify(m));
    const { code, report } = await doctorJson(repo);
    expect(code).toBe(1);
    expect(report.problems).toContainEqual(expect.objectContaining({ check: "stale" }));
  });

  it("reports a repository without a manifest", async () => {
    const { code, report } = await doctorJson(tempRepo());
    expect(code).toBe(1);
    expect(report.problems).toContainEqual(expect.objectContaining({ check: "manifest" }));
  });

  it("prints a readable report without --json", async () => {
    const repo = await installed();
    rmSync(join(repo, "CLAUDE.md"));
    const r = await cli(repo, "doctor");
    expect(r.code).toBe(1);
    expect(r.stdout).toContain("CLAUDE.md");
  });
});
