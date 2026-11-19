import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cli, read } from "./helpers.js";

const sha = (s: string) => createHash("sha256").update(s).digest("hex");

/** A sandbox with the repository and an "outside" area next to it. */
function sandbox() {
  const base = mkdtempSync(join(tmpdir(), "ack-sec-"));
  const repo = join(base, "repo");
  const outside = join(base, "outside");
  mkdirSync(repo);
  mkdirSync(outside);
  return { base, repo, outside };
}

/** Creates a link, or returns false where the OS does not allow it (Windows file links without privileges). */
function link(target: string, path: string, type: "file" | "junction"): boolean {
  try {
    symlinkSync(target, path, type);
    return true;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "EPERM") return false;
    throw e;
  }
}

function addManifestFile(repo: string, path: string, hash: string) {
  const p = join(repo, ".ai-context-kit/manifest.json");
  const m = JSON.parse(read(repo, ".ai-context-kit/manifest.json"));
  m.files.push({ path, sha256: hash });
  writeFileSync(p, JSON.stringify(m));
}

describe("paths stay inside the repository", () => {
  it.each(["../victim.txt", "/etc/victim.txt", "C:/victim.txt", "a\\..\\..\\victim.txt", "skills/./x", ""])(
    "update refuses a manifest path %j and touches nothing outside",
    async (bad) => {
      const { repo, base } = sandbox();
      const victim = join(base, "victim.txt");
      writeFileSync(victim, "secret\n");
      await cli(repo, "init", "--tools", "agents", "--yes");
      addManifestFile(repo, bad, sha("secret\n"));
      const r = await cli(repo, "update");
      expect(r.code).toBe(1);
      expect(r.stderr).toContain("manifest");
      expect(readFileSync(victim, "utf8")).toBe("secret\n");
    },
  );

  it("init refuses a manifest with an unsafe path", async () => {
    const { repo } = sandbox();
    await cli(repo, "init", "--tools", "agents", "--yes");
    addManifestFile(repo, "../x", "0".repeat(64));
    const r = await cli(repo, "init", "--tools", "agents", "--yes");
    expect(r.code).toBe(1);
  });

  it("doctor reports an unsafe manifest path without reading it", async () => {
    const { repo } = sandbox();
    await cli(repo, "init", "--tools", "agents", "--yes");
    addManifestFile(repo, "../probe.txt", "0".repeat(64));
    const r = await cli(repo, "doctor", "--json");
    expect(r.code).toBe(1);
    const report = JSON.parse(r.stdout);
    expect(report.problems).toContainEqual(expect.objectContaining({ check: "manifest" }));
    expect(JSON.stringify(report.problems)).not.toContain('"missing"');
  });
});

describe("symbolic links are never followed", () => {
  it("does not write through a symlinked AGENTS.md", async (ctx) => {
    const { repo, outside } = sandbox();
    const target = join(outside, "AGENTS.md");
    writeFileSync(target, "outside\n");
    if (!link(target, join(repo, "AGENTS.md"), "file")) ctx.skip();
    const r = await cli(repo, "init", "--tools", "agents", "--yes");
    expect(r.code).toBe(1);
    expect(r.stdout + r.stderr).toContain("AGENTS.md");
    expect(readFileSync(target, "utf8")).toBe("outside\n");
  });

  it("does not write into a symlinked skills folder", async () => {
    const { repo, outside } = sandbox();
    mkdirSync(join(repo, ".agents"));
    link(outside, join(repo, ".agents/skills"), "junction");
    const r = await cli(repo, "init", "--tools", "agents", "--yes");
    expect(r.code).toBe(1);
    expect(existsSync(join(outside, "ack-guide"))).toBe(false);
  });

  it("does not write the manifest through a symlinked .ai-context-kit folder", async () => {
    const { repo, outside } = sandbox();
    link(outside, join(repo, ".ai-context-kit"), "junction");
    const r = await cli(repo, "init", "--tools", "agents", "--yes");
    expect(r.code).toBe(1);
    expect(existsSync(join(outside, "manifest.json"))).toBe(false);
  });

  it("does not delete through a symlinked folder during update", async () => {
    const { repo, outside } = sandbox();
    await cli(repo, "init", "--tools", "agents", "--yes");
    mkdirSync(join(outside, "ack-old"));
    writeFileSync(join(outside, "ack-old/SKILL.md"), "old\n");
    link(join(outside, "ack-old"), join(repo, ".agents/skills/ack-old"), "junction");
    addManifestFile(repo, ".agents/skills/ack-old/SKILL.md", sha("old\n"));
    const r = await cli(repo, "update");
    expect(r.code).toBe(1);
    expect(readFileSync(join(outside, "ack-old/SKILL.md"), "utf8")).toBe("old\n");
  });

  it("doctor reports a symlinked managed path", async () => {
    const { repo, outside } = sandbox();
    await cli(repo, "init", "--tools", "agents", "--yes");
    const { rmSync } = await import("node:fs");
    rmSync(join(repo, ".agents/skills/ack-guide"), { recursive: true });
    mkdirSync(join(outside, "ack-guide"));
    link(join(outside, "ack-guide"), join(repo, ".agents/skills/ack-guide"), "junction");
    const r = await cli(repo, "doctor", "--json");
    expect(r.code).toBe(1);
    expect(JSON.parse(r.stdout).problems).toContainEqual(expect.objectContaining({ check: "symlink" }));
  });
});
