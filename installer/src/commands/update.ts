import { UsageError, type Io } from "../io.js";
import { readManifest } from "../manifest.js";
import { sync, toolsFrom } from "../sync.js";
import { report, targetRoot } from "./init.js";

export function update(io: Io, positionals: string[], values: Record<string, unknown>): number {
  const root = targetRoot(io, positionals);
  const manifest = readManifest(root);
  if (!manifest) throw new UsageError(`No .ai-context-kit/manifest.json in ${root}. Run "ai-context-kit init" first.`);
  const events = sync({ root, tools: toolsFrom(manifest.tools), force: values.force === true });
  report(io, events);
  return 0;
}
