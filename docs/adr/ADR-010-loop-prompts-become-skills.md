# ADR-010: Loop prompts become skills, and prompt wrappers are removed

- Status: Accepted
- Date: 2026-09-27
- Source: [2.0 adoption plan, Decisions](../plans/2.0-adoption-plan.md#decisions)

## Context

The implementation loop lives in `prompts/loop/` as five numbered prompt files, and `prompts/skills/` holds thin compatibility wrappers that route to skills. Prompt files must be pasted or attached by hand, and not every tool can deliver them. Skills, by contrast, are what the installer copies into each tool's skills folder.

## Decision

- The loop prompts become **user-invoked skills**: `ack-loop-readiness`, `ack-loop-implement`, `ack-loop-review`, `ack-loop-learnings`, `ack-loop-commit`.
- The `prompts/skills/` wrappers are **removed**.

## Consequences

- The installer can deliver the loop to every supported tool.
- `prompts/` shrinks or disappears in 2.0. `AGENTS.md`, `README.md` and the precedence list that ranks prompts are updated in the same release.
- The loop's OpenSpec rewiring is done once, in the skills.
- Users who paste prompts by hand need a migration note in the 2.0.0 changelog.
