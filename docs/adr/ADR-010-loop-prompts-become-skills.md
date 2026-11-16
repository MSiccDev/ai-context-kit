# ADR-010: Loop prompts become skills, and prompt wrappers are removed

- Status: Accepted
- Date: 2026-09-27
- Source: [2.0 adoption plan, Decisions](../plans/2.0-adoption-plan.md#decisions)

## Context

The implementation loop lives in `prompts/loop/` as five numbered prompt files, and `prompts/skills/` holds thin compatibility wrappers that route to skills. Prompt files must be pasted or attached by hand, and not every tool can deliver them. Skills, by contrast, are what the installer copies into each tool's skills folder.

## Decision

- The loop prompts become **user-invoked skills**, numbered `01` to `05` in run order, the same numbers as today's prompt files:

  | Today | 2.0 skill |
  | --- | --- |
  | `prompts/loop/01-readiness-check.prompt.md` | `ack-loop-01-readiness` |
  | `prompts/loop/02-implementation.prompt.md` | `ack-loop-02-implement` |
  | `prompts/loop/03-self-review.prompt.md` | `ack-loop-03-review` |
  | `prompts/loop/04-learnings.prompt.md` | `ack-loop-04-learnings` (optional step) |
  | `prompts/loop/05-human-in-the-loop.prompt.md` | `ack-loop-05-commit` |

- The `prompts/skills/` wrappers are **removed**.

The numbers were added on 2026-11-16, before this ADR was merged. Skill pickers list skills alphabetically, so numbered names keep the loop in run order and match the numbered prompt files users already know.

## Consequences

- The installer can deliver the loop to every supported tool.
- `prompts/` shrinks or disappears in 2.0. `AGENTS.md`, `README.md` and the precedence list that ranks prompts are updated in the same release.
- The loop's OpenSpec rewiring is done once, in the skills.
- Users who paste prompts by hand need a migration note in the 2.0.0 changelog.
