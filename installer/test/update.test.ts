import { rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cli, exists, listFiles, read, tempRepo, touch } from "./helpers.js";

const SKILL = ".agents/skills/ack-guide/SKILL.md";

async function installed(tools = "codex") {
  const repo = tempRepo();
  const r = await cli(repo, "init", "--tools", tools, "--yes");
  expect(r.code).toBe(0);
  return repo;
}

describe("update", () => {
  it("refreshes an unedited file that the kit changed", async () => {
    const repo = await installed();
    const manifest = JSON.parse(read(repo, ".ai-context-kit/manifest.json"));
    // Simulate an older kit version on disk: change the file and its recorded hash together.
    const old = read(repo, SKILL).replace("# ", "# Old ");
    writeFileSync(join(repo, SKILL), old);
    const { createHash } = await import("node:crypto");
    manifest.files.find((f: { path: string }) => f.path === SKILL).sha256 = createHash("sha256").update(old).digest("hex");
    writeFileSync(join(repo, ".ai-context-kit/manifest.json"), JSON.stringify(manifest));
    const r = await cli(repo, "update");
    expect(r.code).toBe(0);
    expect(read(repo, SKILL)).not.toContain("# Old ");
    expect(exists(repo, SKILL + ".ai-context-kit-new")).toBe(false);
  });

  it("keeps an edited file and writes the new version beside it", async () => {
    const repo = await installed();
    const edited = read(repo, SKILL) + "\nMy local note.\n";
    writeFileSync(join(repo, SKILL), edited);
    const r = await cli(repo, "update");
    expect(r.code).toBe(0);
    expect(read(repo, SKILL)).toBe(edited);
    expect(exists(repo, SKILL + ".ai-context-kit-new")).toBe(true);
    expect(r.stdout).toContain(SKILL + ".ai-context-kit-new");
  });

  it("overwrites an edited file with --force", async () => {
    const repo = await installed();
    const original = read(repo, SKILL);
    writeFileSync(join(repo, SKILL), original + "\nlocal\n");
    await cli(repo, "update", "--force");
    expect(read(repo, SKILL)).toBe(original);
  });

  it("leaves a deleted file deleted", async () => {
    const repo = await installed();
    rmSync(join(repo, ".agents/skills/ack-tdd"), { recursive: true });
    const r = await cli(repo, "update");
    expect(r.code).toBe(0);
    expect(exists(repo, ".agents/skills/ack-tdd/SKILL.md")).toBe(false);
    await cli(repo, "update");
    expect(exists(repo, ".agents/skills/ack-tdd/SKILL.md")).toBe(false);
  });

  it("restores a deleted file with --force", async () => {
    const repo = await installed();
    rmSync(join(repo, ".agents/skills/ack-tdd"), { recursive: true });
    await cli(repo, "update");
    await cli(repo, "update", "--force");
    expect(exists(repo, ".agents/skills/ack-tdd/SKILL.md")).toBe(true);
  });

  it("refreshes marker blocks and never touches text outside them", async () => {
    const repo = await installed("claude");
    const agents = read(repo, "AGENTS.md").replace("## AI Context Kit", "## Changed inside");
    writeFileSync(join(repo, "AGENTS.md"), `Before.\n\n${agents}After.\n`);
    await cli(repo, "update");
    const after = read(repo, "AGENTS.md");
    expect(after.startsWith("Before.\n\n")).toBe(true);
    expect(after.endsWith("After.\n")).toBe(true);
    expect(after).toContain("## AI Context Kit");
    expect(after).not.toContain("## Changed inside");
  });

  it("removes an unedited file the kit no longer ships, and keeps an edited one", async () => {
    const repo = await installed();
    const manifest = JSON.parse(read(repo, ".ai-context-kit/manifest.json"));
    touch(repo, ".agents/skills/ack-old/SKILL.md", "old\n");
    touch(repo, ".agents/skills/ack-gone/SKILL.md", "gone\n");
    const { createHash } = await import("node:crypto");
    const h = (s: string) => createHash("sha256").update(s).digest("hex");
    manifest.files.push({ path: ".agents/skills/ack-old/SKILL.md", sha256: h("old\n") });
    manifest.files.push({ path: ".agents/skills/ack-gone/SKILL.md", sha256: h("something else\n") });
    writeFileSync(join(repo, ".ai-context-kit/manifest.json"), JSON.stringify(manifest));
    await cli(repo, "update");
    expect(exists(repo, ".agents/skills/ack-old/SKILL.md")).toBe(false);
    expect(read(repo, ".agents/skills/ack-gone/SKILL.md")).toBe("gone\n");
  });

  it("changes nothing when everything is current", async () => {
    const repo = await installed("all");
    const before = listFiles(repo).map((p) => [p, read(repo, p)]);
    const r = await cli(repo, "update");
    expect(r.code).toBe(0);
    expect(listFiles(repo).map((p) => [p, read(repo, p)])).toEqual(before);
  });

  it("refuses to run without a manifest", async () => {
    const r = await cli(tempRepo(), "update");
    expect(r.code).toBe(2);
    expect(r.stderr).toContain("init");
  });
});
