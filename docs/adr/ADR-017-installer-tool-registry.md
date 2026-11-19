# ADR-017: Installer tool registry and layout for 2.0

- Status: Accepted
- Date: 2026-11-19
- Source: OpenSpec change `installer-spike`; plan Part 3, rollout step 1; builds on [ADR-013](ADR-013-installer-package-and-binary.md) and [ADR-015](ADR-015-release-split.md)

## Context

[ADR-015](ADR-015-release-split.md) puts the installer MVP and `ack-setup` in 2.0, and the maintainer decided on 2026-11-19 to build them before the 2.0.0 release. Plan Part 3 asks for a spike first, to verify where each tool reads skills and instructions; its tool table left several entries "to verify". Since the plan was written, Claude Code has started reading `AGENTS.md` directly, and OpenSpec 2.1 has started linking tool skill folders to `.agents/skills/` with symlinks.

## Decision

### Tool registry for 2.0

Tool ids match OpenSpec's registry, so `--tools` passes straight through to `openspec init`.

| Tool | id | Skills folder | Instruction file | Invoke | Source |
| --- | --- | --- | --- | --- | --- |
| Claude Code | `claude` | `.claude/skills/` | `CLAUDE.md` importing `@AGENTS.md` | `/ack-guide` | Claude Code docs (`code.claude.com/docs/en/memory`, `/en/skills`); OpenSpec 2.1.0 registry |
| Codex | `codex` | `.agents/skills/` | `AGENTS.md` | `$ack-guide` | OpenSpec 2.1.0 registry; confirmed by the maintainer |
| GitHub Copilot | `github-copilot` | `.github/skills/` | `AGENTS.md` | `/ack-guide` | OpenSpec 2.1.0 registry (skills folder); instruction file confirmed by the maintainer |
| Any other tool | `agents` | `.agents/skills/` | `AGENTS.md` | `/ack-guide` | OpenSpec 2.1.0 registry |

Claude Code facts behind the `claude` row: it reads `AGENTS.md` directly from v2.1.277 when no `CLAUDE.md` or `CLAUDE.local.md` is present, a `CLAUDE.md` that imports `@AGENTS.md` works in every version and never loads it twice, and nothing under `.agents/` is read.

### Installer layout and scope

- **2.0 scope:** plan Part 3 rollout steps 1 (spike), 2 (MVP: `init`, `update`, `doctor`, manifest, marker blocks), 3 (OpenSpec orchestration), 4 (`ack-setup` and `install.md`) and 6 (publish). Step 5 (Cursor, Gemini CLI, Mistral Vibe, `remove`, `--dry-run`) waits for 2.1, as ADR-015 already lists those tools as 2.1 candidates.
- **Code home:** `installer/` in this repository. The package bundles `skills/` at build time, so the parity test runs locally and kit and installer versions stay in step.
- **Stack:** TypeScript, compiled to ESM for Node 20.19 or later; tests with Vitest.
- **Copies, not symlinks:** the installer writes real files into each tool's skills folder. It touches only `ack-*` folders its manifest owns, so it coexists with OpenSpec's linked `openspec-*` folders.
- **`CLAUDE.md`:** written with an `@AGENTS.md` import inside `<!-- AI-CONTEXT-KIT:START -->` and `<!-- AI-CONTEXT-KIT:END -->` when absent; added as a marker block to an existing `CLAUDE.md`, never replacing user text.

## Consequences

- The MVP implements this table as its registry data file; later tools are added rows.
- Two facts rest on the maintainer's confirmation because the vendor docs were unreachable during the spike; `doctor` can re-check them.
- Before the publish step, the maintainer registers the `@msiccdev` npm scope (ADR-013).
