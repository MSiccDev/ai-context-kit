import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

export interface BundledSkill {
  name: string;
  /** Path inside the skill folder, with forward slashes, mapped to its text. */
  files: Map<string, string>;
  invocation: "user" | "model" | undefined;
  description: string;
}

export function packageVersion(): string {
  return JSON.parse(readFileSync(join(packageRoot, "package.json"), "utf8")).version;
}

export function loadSkills(): BundledSkill[] {
  const root = join(packageRoot, "skills");
  if (!existsSync(root)) {
    throw new Error(`Bundled skills not found at ${root}. Run "npm run bundle" first.`);
  }
  return readdirSync(root)
    .filter((n) => n.startsWith("ack-"))
    .sort()
    .map((name) => {
      const files = new Map<string, string>();
      const walk = (dir: string, rel: string) => {
        for (const e of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
          if (e.isDirectory()) walk(join(dir, e.name), `${rel}${e.name}/`);
          else if (e.name !== "SKILL.validation.md") {
            files.set(`${rel}${e.name}`, readFileSync(join(dir, e.name), "utf8").replace(/\r\n/g, "\n"));
          }
        }
      };
      walk(join(root, name), "");
      const skill = files.get("SKILL.md") ?? "";
      const invocation = /^\s+invocation:\s*"(user|model)"/m.exec(skill)?.[1] as BundledSkill["invocation"];
      const description = /^description:\s*"(.*)"\s*$/m.exec(skill)?.[1] ?? "";
      return { name, files, invocation, description };
    });
}

/**
 * A kit template bundled from templates/ (for example the openspec/config.yaml block),
 * with LF line endings and no trailing newline. The template is the only copy.
 */
export function loadTemplate(name: string): string {
  const path = join(packageRoot, "templates", name);
  if (!existsSync(path)) throw new Error(`Bundled template not found at ${path}. Run "npm run bundle" first.`);
  return readFileSync(path, "utf8").replace(/\r\n/g, "\n").trimEnd();
}

/** Adds `generatedBy` to the frontmatter's metadata block. */
export function stampProvenance(skillMd: string, version: string): string {
  const line = `  generatedBy: "ai-context-kit@${version}"\n`;
  if (/^metadata:\n/m.test(skillMd)) return skillMd.replace(/^metadata:\n/m, `metadata:\n${line}`);
  return skillMd.replace(/^---\n([\s\S]*?)\n---\n/, (_m, fm) => `---\n${fm}\nmetadata:\n${line}---\n`);
}

/** Codex sidecar: keeps a user-invoked skill out of implicit invocation. */
export function codexSidecar(skill: BundledSkill): string {
  const first = skill.description.split(/(?<=\.)\s/)[0] ?? skill.description;
  const short = first.length > 100 ? `${first.slice(0, 97)}...` : first;
  return [
    "interface:",
    `  display_name: ${JSON.stringify(skill.name)}`,
    `  short_description: ${JSON.stringify(short)}`,
    "policy:",
    "  allow_implicit_invocation: false",
    "",
  ].join("\n");
}
