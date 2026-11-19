import { mkdtempSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, sep } from "node:path";
import { run } from "../src/cli.js";

export function tempRepo(): string {
  return mkdtempSync(join(tmpdir(), "ack-installer-"));
}

export function touch(root: string, path: string, content = ""): void {
  const full = join(root, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content);
}

export function read(root: string, path: string): string {
  return readFileSync(join(root, path), "utf8");
}

export function exists(root: string, path: string): boolean {
  return existsSync(join(root, path));
}

export function listFiles(root: string): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else out.push(relative(root, full).split(sep).join("/"));
    }
  };
  walk(root);
  return out.sort();
}

export async function cli(cwd: string, ...argv: string[]) {
  const out: string[] = [];
  const err: string[] = [];
  const code = await run(argv, {
    cwd,
    stdout: (s) => out.push(s),
    stderr: (s) => err.push(s),
  });
  return { code, stdout: out.join("\n"), stderr: err.join("\n") };
}
