#!/usr/bin/env node
import { realpathSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { UsageError, type Io } from "./io.js";
import { tools } from "./commands/tools.js";
import { init } from "./commands/init.js";
import { update } from "./commands/update.js";
import { doctor } from "./commands/doctor.js";

export const HELP = `Usage:
  ai-context-kit init [path] --tools <ids|all|none> [--yes]
  ai-context-kit update [path] [--force]
  ai-context-kit doctor [path] [--json]
  ai-context-kit tools

Tool ids: claude, codex, github-copilot, agents.`;

type Command = (io: Io, args: { positionals: string[]; values: Record<string, unknown> }) => number | Promise<number>;

const COMMANDS: Record<string, Command> = {
  tools: (io) => tools(io),
  init: (io, a) => init(io, a.positionals, a.values),
  update: (io, a) => update(io, a.positionals, a.values),
  doctor: (io, a) => doctor(io, a.positionals, a.values),
};

export async function run(argv: string[], io: Partial<Io> & { cwd: string }): Promise<number> {
  const full: Io = {
    stdout: (l) => process.stdout.write(l + "\n"),
    stderr: (l) => process.stderr.write(l + "\n"),
    ...io,
  };
  try {
    const { values, positionals } = parseArgs({
      args: argv,
      allowPositionals: true,
      options: {
        tools: { type: "string" },
        yes: { type: "boolean", short: "y" },
        force: { type: "boolean" },
        json: { type: "boolean" },
        help: { type: "boolean", short: "h" },
      },
    });
    const [name, ...rest] = positionals;
    if (values.help || !name) {
      full.stdout(HELP);
      return name || values.help ? 0 : 2;
    }
    const command = COMMANDS[name];
    if (!command) throw new UsageError(`Unknown command: ${name}`);
    return await command(full, { positionals: rest, values });
  } catch (e) {
    if (e instanceof UsageError || (e as { code?: string }).code?.startsWith("ERR_PARSE_ARGS")) {
      full.stderr(`${(e as Error).message}\n\n${HELP}`);
      return 2;
    }
    throw e;
  }
}

const invokedDirectly = (() => {
  try {
    return realpathSync(process.argv[1] ?? "") === realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
})();

if (invokedDirectly) {
  run(process.argv.slice(2), { cwd: process.cwd() }).then((code) => process.exit(code));
}
