# ADR-013: Installer package @msiccdev/ai-context-kit

- Status: Accepted
- Date: 2026-09-27
- Source: [2.0 adoption plan, Part 3 and Decisions](../plans/2.0-adoption-plan.md#part-3-a-per-repo-tool-independent-installer)

## Context

The kit needs a per-repo installer that serves several tools in one run, works on macOS, Linux and Windows without symlinks, sets up OpenSpec, and never overwrites a user's edits. OpenSpec already makes Node 20.19 or later a prerequisite ([ADR-001](ADR-001-openspec-is-mandatory.md)). The unscoped npm name `ai-context-kit` belongs to an unrelated tool.

## Decision

- The installer is a **Node CLI on npm**, published as **`@msiccdev/ai-context-kit`** with the bin **`ai-context-kit`**.
- It records what it wrote in **`.ai-context-kit/manifest.json`**.
- It marks kit-owned sections in `AGENTS.md` and `CLAUDE.md` with **`<!-- AI-CONTEXT-KIT:START -->`** and **`<!-- AI-CONTEXT-KIT:END -->`**.
- An agent-executable `install.md` is the front door. It runs the CLI and then the `ack-setup` skill.

## Consequences

- Docs always show the scoped name.
- Node adds no new prerequisite, because OpenSpec already requires it.
- The `@msiccdev` npm scope must be registered before the first publish.
- Updates compare file hashes against the manifest. An edited file gets a `.ai-context-kit-new` copy beside it instead of being overwritten.
- Skills ship inside the package, so an install never fetches from GitHub and is reproducible.
- The existing Claude Code and Codex plugins stay for personal, per-user installs.

## Alternatives considered

From the plan's comparison:

| Option | Verdict |
| --- | --- |
| `install.sh` plus `install.ps1` | Rejected: two implementations drift apart, YAML and JSON merging is weak, and both are hard to test |
| skills.sh only | Kept as an extra channel: it copies skills only, with no `AGENTS.md`, OpenSpec, manifest or safe update |
| Agent-driven `install.md` only | Used as the front door that runs the CLI: results vary by model |
| Existing plugins only | Kept for personal use: per user rather than per repo, and only three ecosystems |
