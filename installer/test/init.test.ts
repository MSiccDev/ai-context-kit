import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { END, START } from "../src/markers.js";
import { findTool } from "../src/registry.js";
const dirOf = (id: string) => findTool(id)!.skillsDir;
import { cli, exists, listFiles, read, tempRepo, touch } from "./helpers.js";

const KIT_SKILLS = join(__dirname, "..", "..", "skills");
const skillNames = readdirSync(KIT_SKILLS).filter((n) => n.startsWith("ack-")).sort();
const USER_INVOKED = skillNames.filter((n) =>
  /invocation: "user"/.test(readFileSync(join(KIT_SKILLS, n, "SKILL.md"), "utf8")),
);
const VERSION = JSON.parse(readFileSync(join(__dirname, "..", "package.json"), "utf8")).version;

function skillFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of skillNames) {
    const root = join(KIT_SKILLS, name);
    const walk = (d: string, rel: string) => {
      for (const e of readdirSync(d, { withFileTypes: true })) {
        if (e.isDirectory()) walk(join(d, e.name), `${rel}${e.name}/`);
        else if (e.name !== "SKILL.validation.md") out.push(`${dir}/${name}/${rel}${e.name}`);
      }
    };
    walk(root, "");
  }
  return out;
}

const sidecars = (dir: string) => USER_INVOKED.map((n) => `${dir}/${n}/agents/openai.yaml`);
const NOTICES = ["ai-context-kit-LICENSE", "ai-context-kit-THIRD_PARTY_NOTICES.md"];
const notices = (dir: string) => NOTICES.map((n) => `${dir}/${n}`);
const BASE = [".ai-context-kit/manifest.json", "AGENTS.md"];

describe("init", () => {
  it.each([
    ["claude", [...BASE, "CLAUDE.md", ...skillFiles(dirOf("claude")), ...notices(dirOf("claude"))]],
    ["codex", [...BASE, ...skillFiles(dirOf("codex")), ...sidecars(dirOf("codex")), ...notices(dirOf("codex"))]],
    ["github-copilot", [...BASE, ...skillFiles(dirOf("github-copilot")), ...notices(dirOf("github-copilot"))]],
    ["agents", [...BASE, ...skillFiles(dirOf("codex")), ...notices(dirOf("codex"))]],
    [
      "all",
      [
        ...BASE,
        "CLAUDE.md",
        ...skillFiles(dirOf("claude")),
        ...skillFiles(dirOf("codex")),
        ...sidecars(dirOf("codex")),
        ...skillFiles(dirOf("github-copilot")),
        ...notices(dirOf("claude")),
        ...notices(dirOf("codex")),
        ...notices(dirOf("github-copilot")),
      ],
    ],
  ])("writes exactly the expected files for --tools %s", async (tools, expected) => {
    const repo = tempRepo();
    const r = await cli(repo, "init", "--tools", tools, "--yes");
    expect(r.code).toBe(0);
    expect(listFiles(repo)).toEqual([...new Set(expected)].sort());
  });

  it("copies the kit's LICENSE and THIRD_PARTY_NOTICES.md once into each skills folder (ADR-014)", async () => {
    const repo = tempRepo();
    expect((await cli(repo, "init", "--tools", "all", "--yes")).code).toBe(0);
    const ROOT = join(__dirname, "..", "..");
    const lf = (t: string) => t.replace(/\r\n/g, "\n");
    const manifest = JSON.parse(read(repo, ".ai-context-kit/manifest.json"));
    for (const dir of new Set(["claude", "codex", "github-copilot"].map(dirOf))) {
      expect(read(repo, `${dir}/ai-context-kit-LICENSE`)).toBe(lf(readFileSync(join(ROOT, "LICENSE"), "utf8")));
      expect(read(repo, `${dir}/ai-context-kit-THIRD_PARTY_NOTICES.md`)).toBe(
        lf(readFileSync(join(ROOT, "THIRD_PARTY_NOTICES.md"), "utf8")),
      );
      for (const n of NOTICES) expect(manifest.files.map((f: { path: string }) => f.path)).toContain(`${dir}/${n}`);
    }
  });

  it("copies each SKILL.md unchanged except for the generatedBy line", async () => {
    const repo = tempRepo();
    await cli(repo, "init", "--tools", "claude", "--yes");
    for (const name of skillNames) {
      const source = readFileSync(join(KIT_SKILLS, name, "SKILL.md"), "utf8");
      const installed = read(repo, `${dirOf("claude")}/${name}/SKILL.md`);
      const line = `  generatedBy: "ai-context-kit@${VERSION}"\n`;
      expect(installed).toContain(line);
      expect(installed.replace(line, "")).toBe(source.replace(/\r\n/g, "\n"));
    }
  });

  it("writes Codex sidecars that block implicit invocation", async () => {
    const repo = tempRepo();
    await cli(repo, "init", "--tools", "codex", "--yes");
    const yaml = read(repo, ".agents/skills/ack-guide/agents/openai.yaml");
    expect(yaml).toContain("interface:");
    expect(yaml).toContain('display_name: "ack-guide"');
    expect(yaml).toContain("allow_implicit_invocation: false");
    expect(exists(repo, ".agents/skills/ack-tdd/agents/openai.yaml")).toBe(false);
  });

  it("adds marker blocks without touching existing text", async () => {
    const repo = tempRepo();
    touch(repo, "AGENTS.md", "# My project\n\nKeep this.\n");
    touch(repo, "CLAUDE.md", "Claude notes.\n");
    await cli(repo, "init", "--tools", "claude", "--yes");
    const agents = read(repo, "AGENTS.md");
    expect(agents.startsWith("# My project\n\nKeep this.\n")).toBe(true);
    expect(agents).toContain(START);
    expect(agents).toContain("/ack-setup");
    const claude = read(repo, "CLAUDE.md");
    expect(claude.startsWith("Claude notes.\n")).toBe(true);
    expect(claude).toContain(`${START}\n@AGENTS.md\n${END}`);
  });

  it("records every written file and block in the manifest", async () => {
    const repo = tempRepo();
    await cli(repo, "init", "--tools", "codex", "--yes");
    const m = JSON.parse(read(repo, ".ai-context-kit/manifest.json"));
    expect(m.kitVersion).toBe(VERSION);
    expect(m.tools).toEqual(["codex"]);
    const paths = m.files.map((f: { path: string }) => f.path);
    expect(paths).toContain(".agents/skills/ack-guide/SKILL.md");
    expect(m.files.every((f: { sha256: string }) => /^[0-9a-f]{64}$/.test(f.sha256))).toBe(true);
    expect(m.blocks.map((b: { path: string }) => b.path)).toEqual(["AGENTS.md"]);
  });

  it("changes nothing on a second run", async () => {
    const repo = tempRepo();
    await cli(repo, "init", "--tools", "all", "--yes");
    const before = listFiles(repo).map((p) => [p, read(repo, p)]);
    const r = await cli(repo, "init", "--tools", "all", "--yes");
    expect(r.code).toBe(0);
    expect(listFiles(repo).map((p) => [p, read(repo, p)])).toEqual(before);
  });

  it("detects tools from the repository when --tools is omitted", async () => {
    const repo = tempRepo();
    touch(repo, ".github/copilot-instructions.md", "x");
    const r = await cli(repo, "init", "--yes");
    expect(r.code).toBe(0);
    expect(exists(repo, ".github/skills/ack-guide/SKILL.md")).toBe(true);
    expect(exists(repo, ".claude/skills")).toBe(false);
  });

  it("stops when no tool is detected and none is given", async () => {
    const repo = tempRepo();
    const r = await cli(repo, "init", "--yes");
    expect(r.code).toBe(2);
    expect(r.stderr).toContain("--tools");
    expect(listFiles(repo)).toEqual([]);
  });

  it("rejects an unknown tool id", async () => {
    const r = await cli(tempRepo(), "init", "--tools", "claude,nope");
    expect(r.code).toBe(2);
    expect(r.stderr).toContain("nope");
  });

  it("installs into a path argument", async () => {
    const repo = tempRepo();
    touch(repo, "sub/.keep");
    await cli(repo, "init", "sub", "--tools", "agents", "--yes");
    expect(exists(repo, "sub/.agents/skills/ack-guide/SKILL.md")).toBe(true);
  });
});
