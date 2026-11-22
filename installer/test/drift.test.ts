// Drift tests: every kit fact the installer depends on has one home outside the code.
// Each test reads that home and fails when the installer's constant disagrees with it.
import { lstatSync, readdirSync, readFileSync, readlinkSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { codexSidecar, loadSkills, NOTICE_FILES } from "../src/bundle.js";
import { END, START, YAML } from "../src/markers.js";
import { INSTALL_COMMAND, MIN_OPENSPEC } from "../src/openspec.js";
import { TOOLS } from "../src/registry.js";
import { MIN_NODE } from "../src/version.js";

const REPO = join(__dirname, "..", "..");
const src = (path: string) => readFileSync(join(REPO, path), "utf8").replace(/\r\n/g, "\n");
const one = (text: string, re: RegExp, where: string) => {
  const m = re.exec(text);
  if (!m) throw new Error(`${where}: pattern ${re} not found; re-check this fact against the installer`);
  return m[1];
};

describe("OpenSpec minimum (ADR-016)", () => {
  it.each([
    ["spec section 11.6", "specs/context_aware_ai_session_spec.md", /minimum supported OpenSpec version is \*\*([\d.]+)\*\*/],
    ["ADR-016", "docs/adr/ADR-016-minimum-openspec-2-1.md", /minimum supported OpenSpec version is \*\*([\d.]+)\*\*/],
    ["ack-openspec-check", "skills/ack-openspec-check/references/upgrade.md", /Minimum: \*\*([\d.]+)\*\*/],
    ["AGENTS template", "templates/AGENTS_template.md", /Minimum OpenSpec version: `([\d.]+)`/],
  ])("matches %s", (_name, path, re) => {
    expect(MIN_OPENSPEC).toBe(one(src(path), re, path));
  });
});

describe("OpenSpec install command and telemetry opt-out", () => {
  it("matches the command block in ack-openspec-check", () => {
    const path = "skills/ack-openspec-check/references/upgrade.md";
    expect(INSTALL_COMMAND).toBe(one(src(path), /```bash\n(npm install -g [^\n]+)\n```/, path));
  });

  it("uses the opt-outs spec section 11.8 names", () => {
    const spec = src("specs/context_aware_ai_session_spec.md");
    const section = one(spec, /### 11\.8 Telemetry\n([\s\S]*?)(?:\n### |\n## |$)/, "spec 11.8");
    const code = readFileSync(join(__dirname, "..", "src", "openspec.ts"), "utf8");
    for (const optOut of ["openspec config set telemetry.enabled false", "OPENSPEC_TELEMETRY=0"]) {
      expect(section).toContain(optOut);
    }
    expect(code).toContain('["config", "set", "telemetry.enabled", "false"]');
    expect(code).toContain('OPENSPEC_TELEMETRY = "0"');
  });

  it.each([
    ["README", "README.md"],
    ["AGENTS template", "templates/AGENTS_template.md"],
    ["ack-openspec-check", "skills/ack-openspec-check/references/upgrade.md"],
    ["installer README", "installer/README.md"],
  ])("%s names both telemetry opt-outs (spec 11.8)", (_name, path) => {
    const text = src(path);
    expect(text).toContain("openspec config set telemetry.enabled false");
    expect(text).toContain("OPENSPEC_TELEMETRY=0");
  });
});

describe("Node minimum (ADR-018)", () => {
  const major = (v: string) => v.split(".").slice(0, 2).join(".");
  it("matches ADR-018", () => {
    const path = "docs/adr/ADR-018-installer-node-22.md";
    expect(major(MIN_NODE)).toBe(one(src(path), /requires \*\*Node ([\d.]+) or later\*\*/, path));
  });
  it("matches package.json engines", () => {
    expect(JSON.parse(src("installer/package.json")).engines.node).toBe(`>=${MIN_NODE}`);
  });
  it("matches the installer README", () => {
    const path = "installer/README.md";
    expect(major(MIN_NODE)).toBe(one(src(path), /Requires Node\.js ([\d.]+) or later/, path));
  });
});

describe("tool registry (ADR-017)", () => {
  const table = src("docs/adr/ADR-017-installer-tool-registry.md")
    .split("\n")
    .filter((l) => /^\| [^|-]/.test(l) && l.includes("`"))
    .map((l) => l.split("|").map((c) => c.trim().replace(/^`|`$/g, "")));
  // Columns: "", Tool, id, Skills folder, Instruction file, Invoke, Source, ""

  it("has exactly the registry's tools, in order", () => {
    expect(table.map((r) => r[2])).toEqual(TOOLS.map((t) => t.id));
  });

  it.each(TOOLS.map((t) => [t.id, t] as const))("matches ADR-017 for %s", (id, tool) => {
    const row = table.find((r) => r[2] === id)!;
    expect(`${tool.skillsDir}/`).toBe(row[3]);
    expect(tool.invoke("ack-guide")).toBe(row[5]);
    expect(tool.claudeBridge).toBe(row[4].includes("CLAUDE.md"));
  });
});

describe("marker strings (ADR-013)", () => {
  it("match ADR-013", () => {
    const adr = src("docs/adr/ADR-013-installer-package-and-binary.md");
    expect(adr).toContain(`**\`${START}\`**`);
    expect(adr).toContain(`**\`${END}\`**`);
  });
  it("YAML markers match the installer-openspec design", () => {
    const design = src("openspec/changes/archive/2026-11-20-installer-openspec/design.md");
    expect(design).toContain(`\`${YAML.start}\``);
    expect(design).toContain(`\`${YAML.end}\``);
  });
});

describe("install.md, the agent front door (ADR-013)", () => {
  const md = src("install.md");
  const pkg = JSON.parse(src("installer/package.json"));

  it("names the Node and OpenSpec minimums", () => {
    expect(MIN_NODE.split(".").slice(0, 2).join(".")).toBe(one(md, /requires Node ([\d.]+) or later/, "install.md"));
    expect(MIN_OPENSPEC).toBe(one(md, /requires OpenSpec ([\d.]+) or later/, "install.md"));
  });

  it("shows the installer's OpenSpec install command", () => {
    expect(one(md, /```bash\n\s*(npm install -g [^\n]+)\n/, "install.md")).toBe(INSTALL_COMMAND);
  });

  it("runs the package's init with the CLI's flags", () => {
    const cli = readFileSync(join(__dirname, "..", "src", "cli.ts"), "utf8");
    const command = one(md, /```bash\n(npx [^\n]+)\n```/, "install.md");
    expect(command).toBe(`npx ${pkg.name}@latest init --tools <ids> --openspec-telemetry <on|off> --yes`);
    for (const flag of ["tools", "openspec-telemetry", "yes"]) expect(cli).toContain(`--${flag}`);
    expect(Object.keys(pkg.bin)).toEqual(["ai-context-kit"]);
    expect(md).toContain("`ai-context-kit init`");
  });

  it("lists every registry tool with its id and how it starts ack-setup", () => {
    const rows = md
      .split("\n")
      .filter((l) => /^\| [^|-]/.test(l) && l.includes("ack-setup`"))
      .map((l) => l.split("|").map((c) => c.trim().replace(/^`|`$/g, "")));
    expect(rows.map((r) => [r[2], r[3]])).toEqual(TOOLS.map((t) => [t.id, t.invoke("ack-setup")]));
    expect(rows.map((r) => r[1].replace(/`/g, ""))).toEqual(TOOLS.map((t) => t.name));
  });
});

describe("ack-setup, named by init and install.md", () => {
  it("is bundled as a user-invoked skill with a Codex sidecar that blocks implicit invocation", () => {
    const skill = loadSkills().find((s) => s.name === "ack-setup");
    expect(skill?.invocation).toBe("user");
    expect(codexSidecar(skill!)).toContain("allow_implicit_invocation: false");
  });
});

describe("npm publishing (installer-release)", () => {
  const pkg = JSON.parse(src("installer/package.json"));
  const workflow = src(".github/workflows/release.yml");
  const job = (name: string) => one(workflow, new RegExp(`\\n  ${name}:\\n([\\s\\S]*?)(?=\\n  [a-z]+:\\n|$)`), `release.yml job ${name}`);
  const atLeast = (v: string, min: string) => {
    const [a, b] = [v, min].map((x) => x.split(".").map(Number));
    for (let i = 0; i < 3; i++) if ((a[i] ?? 0) !== (b[i] ?? 0)) return (a[i] ?? 0) > (b[i] ?? 0);
    return true;
  };

  it("repository.url matches the plugin manifests' repository", () => {
    const repo = JSON.parse(src(".claude-plugin/plugin.json")).repository as string;
    expect(pkg.repository.url).toBe(`git+${repo}.git`);
    expect(JSON.parse(src(".codex-plugin/plugin.json")).repository).toBe(repo);
    expect(pkg.repository.directory).toBe("installer");
  });

  it("runs Node and npm versions that trusted publishing supports", () => {
    for (const v of workflow.matchAll(/node-version: "([\d.]+)"/g)) expect(atLeast(v[1], "22.14")).toBe(true);
    expect(atLeast(one(workflow, /NPM_VERSION: "([\d.]+)"/, "release.yml"), "11.15.0")).toBe(true);
  });

  it("grants id-token: write only to the publish job, in environment npm, on main", () => {
    const publish = job("publish");
    expect(workflow.split("id-token: write").length - 1).toBe(1);
    expect(publish).toContain("id-token: write");
    expect(publish).toContain("environment: npm");
    expect(publish).toContain("github.ref == 'refs/heads/main'");
    expect(publish).toContain("github.event_name != 'pull_request'");
    expect(job("verify")).not.toContain("id-token");
  });

  it("publishes from installer/ and builds before packing", () => {
    for (const name of ["verify", "publish"]) expect(job(name)).toContain("working-directory: installer");
    expect(job("publish")).toMatch(/npm stage publish --access public --tag/);
    expect(job("verify")).toMatch(/npm stage publish --dry-run/);
    // The trusted publisher allows staging only; a plain publish would be refused.
    expect(workflow).not.toMatch(/run: npm publish/);
    expect(pkg.scripts.prepack).toBe("npm run build");
  });
});

describe("repo-local Codex skill discovery", () => {
  // Git checks a symbolic link out as a small text file holding its target when
  // symlinks are off (the default on Windows), so accept either form.
  const target = (path: string) =>
    lstatSync(path).isSymbolicLink() ? readlinkSync(path) : readFileSync(path, "utf8").trim();

  it("links every skills/ack-* folder from .agents/skills", () => {
    const skills = readdirSync(join(REPO, "skills")).filter((n) => n.startsWith("ack-")).sort();
    const links = readdirSync(join(REPO, ".agents", "skills")).filter((n) => n.startsWith("ack-")).sort();
    expect(links).toEqual(skills);
    for (const name of skills) {
      expect(target(join(REPO, ".agents", "skills", name)).replace(/\\/g, "/")).toBe(`../../skills/${name}`);
    }
  });
});

describe("notices next to installed skills (ADR-014)", () => {
  it("ADR-014 names the files the installer writes, and their bundled sources exist", () => {
    const adr = readdirSync(join(REPO, "docs", "adr")).find((n) => n.startsWith("ADR-014"))!;
    const text = src(`docs/adr/${adr}`);
    for (const [installed, bundled] of NOTICE_FILES) {
      expect(text).toContain(`\`${installed}\``);
      expect(() => src(bundled)).not.toThrow();
    }
  });
});
