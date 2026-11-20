import { describe, expect, it } from "vitest";
import { TOOLS } from "../src/registry.js";
import { cli, tempRepo } from "./helpers.js";

describe("tools", () => {
  it("lists the four 2.0 tools with skills folder and invocation", async () => {
    const r = await cli(tempRepo(), "tools");
    expect(r.code).toBe(0);
    for (const line of TOOLS.map((t) => `${t.id}  ${t.skillsDir}/  ${t.invoke("ack-guide")}`)) {
      expect(r.stdout.replace(/ +/g, " ")).toContain(line.replace(/ +/g, " "));
    }
  });

  it("rejects an unknown command with exit code 2", async () => {
    const r = await cli(tempRepo(), "frobnicate");
    expect(r.code).toBe(2);
    expect(r.stderr).toContain("Unknown command");
  });

  it("prints help with --help", async () => {
    const r = await cli(tempRepo(), "--help");
    expect(r.code).toBe(0);
    expect(r.stdout).toContain("ai-context-kit init");
  });
});
