// Drift tests: every kit fact the installer depends on has one home outside the code.
// Each test reads that home and fails when the installer's constant disagrees with it.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
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
