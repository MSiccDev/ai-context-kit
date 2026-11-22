// Tool registry for 2.0 (ADR-017). Ids match OpenSpec's, so --tools can pass
// straight through to `openspec init`.

export interface Tool {
  id: string;
  name: string;
  /** Folder the tool reads skills from, relative to the repository root. */
  skillsDir: string;
  /** Paths whose presence means the tool is used in this repository. */
  detectionPaths: string[];
  /** Whether the tool reads `agents/openai.yaml` sidecars (Codex). */
  codexSidecar: boolean;
  /** Whether the tool needs a CLAUDE.md that imports AGENTS.md. */
  claudeBridge: boolean;
  /** How a user starts a skill in this tool, shown with ack-guide. */
  invoke: (skill: string) => string;
}

export const TOOLS: Tool[] = [
  {
    id: "claude",
    name: "Claude Code",
    skillsDir: ".claude/skills",
    detectionPaths: [".claude", "CLAUDE.md"],
    codexSidecar: false,
    claudeBridge: true,
    invoke: (s) => `/${s}`,
  },
  {
    id: "codex",
    name: "Codex",
    skillsDir: ".agents/skills",
    detectionPaths: [".agents/skills", ".codex/skills", ".codex"],
    codexSidecar: true,
    claudeBridge: false,
    invoke: (s) => `$${s}`,
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    skillsDir: ".github/skills",
    detectionPaths: [
      ".github/copilot-instructions.md",
      ".github/instructions",
      ".github/prompts",
      ".github/agents",
      ".github/skills",
    ],
    codexSidecar: false,
    claudeBridge: false,
    invoke: (s) => `/${s}`,
  },
  {
    id: "agents",
    name: "Any other tool (shared .agents/skills)",
    skillsDir: ".agents/skills",
    detectionPaths: [".agents/skills"],
    codexSidecar: false,
    claudeBridge: false,
    invoke: (s) => `/${s}`,
  },
];

export function findTool(id: string): Tool | undefined {
  return TOOLS.find((t) => t.id === id);
}
