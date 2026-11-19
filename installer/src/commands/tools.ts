import type { Io } from "../io.js";
import { TOOLS } from "../registry.js";

export function tools(io: Io): number {
  const rows = TOOLS.map((t) => [t.id, `${t.skillsDir}/`, t.invoke("ack-guide"), t.name]);
  const widths = [0, 1, 2].map((i) => Math.max(...rows.map((r) => r[i].length)));
  for (const r of rows) {
    io.stdout(r.map((c, i) => (i < 3 ? c.padEnd(widths[i]) : c)).join("  "));
  }
  return 0;
}
