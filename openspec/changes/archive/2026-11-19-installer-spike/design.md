# Design

## Context

Sources checked on 2026-11-19:
- OpenSpec 2.1.0's tool registry (`AI_TOOLS` in `dist/core/config.js` of `@fission-ai/openspec`), which the plan says the kit's registry mirrors by id.
- Claude Code's documentation (`code.claude.com/docs/en/memory`): Claude Code reads `AGENTS.md` directly from v2.1.277 when no `CLAUDE.md` or `CLAUDE.local.md` is present; a `CLAUDE.md` that imports `@AGENTS.md` works in every version and never reads it twice; nothing under `.agents/` is read as instructions.
- OpenAI, GitHub and agents.md documentation was not reachable from the session; the maintainer confirmed the Codex and Copilot facts.

## Goals / Non-Goals

**Goals:**
- One registry, with a source per fact, that the MVP implements.
- The installer decisions in one ADR, so later changes cite it.

**Non-Goals:**
- Cursor, Gemini CLI and Mistral Vibe (2.1, plan Part 3 rollout step 5).
- Any code.

## Decisions

- **ADR-017 holds the registry and the layout decisions.** Alternative: separate ADRs per decision; rejected because none of them stands alone.
- **Copies, not symlinks.** OpenSpec 2.1 links tool skill folders to `.agents/skills/`; the kit installer copies, as plan Part 3 requires for Windows. Both coexist because the installer only touches `ack-*` folders it owns.
- **`CLAUDE.md` imports `AGENTS.md`.** Written inside kit marker blocks; added to an existing `CLAUDE.md` as a block, never replacing user text.

## Test Seams

Agreed with the user before tasks were written:
- ADR-017 lists every 2.0 tool with skills folder, instruction file, invocation and a source or "confirmed by the maintainer" for each fact.
- Plan Part 3 agrees with ADR-017 (a scan finds no "to verify" left for the 2.0 tools).
- `openspec validate installer-spike --strict` passes.

## Risks / Trade-offs

- Two facts rest on the maintainer's confirmation rather than vendor docs; ADR-017 says so, and `doctor` can re-check them later.
