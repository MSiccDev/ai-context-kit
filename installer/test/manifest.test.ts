import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cli, listFiles, read, tempRepo } from "./helpers.js";

const valid = (repo: string) => JSON.parse(read(repo, ".ai-context-kit/manifest.json"));

const BROKEN: [string, (repo: string) => string][] = [
  ["invalid JSON", () => "{"],
  ["an empty object", () => "{}"],
  ["an array", () => "[]"],
  ["a wrong schemaVersion", (r) => JSON.stringify({ ...valid(r), schemaVersion: 2 })],
  ["files of the wrong type", (r) => JSON.stringify({ ...valid(r), files: "x" })],
  ["tools that are not strings", (r) => JSON.stringify({ ...valid(r), tools: [1] })],
  ["a file entry without a hash", (r) => JSON.stringify({ ...valid(r), files: [{ path: "AGENTS.md" }] })],
  ["a hash that is not hex", (r) => JSON.stringify({ ...valid(r), files: [{ path: "AGENTS.md", sha256: "zz" }] })],
];

async function brokenRepo(make: (repo: string) => string) {
  const repo = tempRepo();
  await cli(repo, "init", "--tools", "agents", "--yes");
  writeFileSync(join(repo, ".ai-context-kit/manifest.json"), make(repo));
  return repo;
}

describe("malformed manifests", () => {
  it.each(BROKEN)("doctor --json reports %s as a manifest problem", async (_name, make) => {
    const repo = await brokenRepo(make);
    const r = await cli(repo, "doctor", "--json");
    expect(r.code).toBe(1);
    const report = JSON.parse(r.stdout);
    expect(report.problems).toContainEqual(expect.objectContaining({ check: "manifest" }));
  });

  it.each(BROKEN)("update refuses %s without touching files", async (_name, make) => {
    const repo = await brokenRepo(make);
    const before = listFiles(repo).map((p) => [p, read(repo, p)]);
    const r = await cli(repo, "update");
    expect(r.code).toBe(1);
    expect(r.stderr).toContain("manifest");
    expect(r.stderr).not.toContain("unsafe");
    expect(listFiles(repo).map((p) => [p, read(repo, p)])).toEqual(before);
  });

  it.each(BROKEN)("init refuses %s", async (_name, make) => {
    const repo = await brokenRepo(make);
    const manifest = readFileSync(join(repo, ".ai-context-kit/manifest.json"), "utf8");
    const r = await cli(repo, "init", "--tools", "agents", "--yes");
    expect(r.code).toBe(1);
    expect(read(repo, ".ai-context-kit/manifest.json")).toBe(manifest);
  });

  it("doctor prints a readable manifest problem without --json", async () => {
    const repo = await brokenRepo(() => "{");
    const r = await cli(repo, "doctor");
    expect(r.code).toBe(1);
    expect(r.stdout).toContain("PROBLEM manifest");
  });
});
