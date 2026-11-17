# Restore Rules: ack-restore-checkpoint

Source: spec section 4.4.3.

## Rules

1. Checkpoint state is applied only when the artifact is explicitly provided at session start.
2. If checkpoint state conflicts with active instruction files, surface each conflict explicitly and ask the user which source to apply.
3. Instruction files are the default if the user does not respond to a conflict prompt.
4. The user must confirm the full restored state before the assistant proceeds.

## Validation Checks

Before restoring, confirm the artifact:
- Contains `checkpoint: true` in frontmatter (spec section 4.4.2 required field; reject if absent).
- Contains all other required schema fields (see `skills/ack-create-checkpoint/references/checkpoint-schema.md`).

Flag any missing fields and ask the user to supply values or confirm the instruction file default before proceeding.

## Conflict Resolution Example

Checkpoint says:
- `role: Developer`

Active AGENTS.md says:
- Default role: Architect

Surface it as:

> **Conflict — role:**
> Checkpoint: `Developer`
> AGENTS.md default: `Architect`
> Which should apply? (If you don't answer, I will apply the AGENTS.md default.)

If no response: apply `Architect` from AGENTS.md.

## Missing Field Example

If `output_style` is absent from the checkpoint:

> The checkpoint is missing `output_style`. Please specify a value, or I will apply the AGENTS.md default.

## Confirmation Summary

After resolving all conflicts, present the full restored state before proceeding:

> **Restored session state:**
> - Project: my-app (from checkpoint)
> - Role: Architect (from AGENTS.md — conflict resolved)
> - Phase: Implementation (from checkpoint)
> - Output style: concise (from checkpoint)
> - Tone: technical (from checkpoint)
> - Interaction mode: pair (from checkpoint)
> - Open tasks: [list]
> - Key decisions: [list]
> - Active files: [list]
>
> Confirm to proceed?
