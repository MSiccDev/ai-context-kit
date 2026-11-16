# ADR-009: Merge the AGENTS.md creators and validators

- Status: Accepted
- Date: 2026-09-27
- Source: [2.0 adoption plan, Side findings and Decisions](../plans/2.0-adoption-plan.md#side-findings-in-the-kit)

## Context

`create-agents-md` writes the entry-point half of `AGENTS.md`, and `create-project-instructions` writes the project-context half. Each has its own validator. The template and the kit's own `AGENTS.md` combine both halves, and the skills overlap on session state and the command namespace, so the same rules live in two places.

## Decision

- Merge `create-agents-md` and `create-project-instructions` into **`ack-create-agents-md`**, with **root** and **nested** modes.
- Merge `validate-agents-md` and `validate-project-instructions` into **`ack-validate-agents-md`**, with one combined scoring rubric.

## Consequences

- One skill per artifact. Session-state and command-namespace rules are maintained once.
- Discovery in `ack-create-agents-md` detects `openspec/` and writes the new spec-driven change workflow section.
- `ack-validate-agents-md` gains a critical check that the OpenSpec section exists and matches `openspec/config.yaml`.
- `prompts/skills/create-project-instructions.prompt.md` and `validate-project-instructions.prompt.md` are removed along with the other wrappers ([ADR-010](ADR-010-loop-prompts-become-skills.md)).
- Existing validation reports are re-run against the combined rubric.
