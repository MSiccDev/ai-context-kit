# Skills Directory

This directory is the canonical location for repository skill instances.

## Authority Model
- `skills/` is the canonical source for operational create/validate/governance workflow logic.
- Skills are the only workflow entrypoint; there are no separate prompt files (ADR-010).

## Scope
- Store concrete skill folders here, each containing a `SKILL.md` file.
- Each skill folder should also include `SKILL.validation.md`.
- Keep references local to each skill using relative paths.
- Use an optional `references/` folder only when a workflow needs local source material.

## Current Skill Inventory
### Create Workflows
- `ack-create-user-context` (`references/`)
- `ack-create-agents-md` (`references/`; root and nested modes)
- `ack-create-skill` (`references/`)

### Validate Workflows
- `ack-validate-user-context` (`references/`)
- `ack-validate-agents-md` (`references/`; root and nested modes)
- `ack-validate-skill` (`references/`)

### Checkpoint Workflows
- `ack-create-checkpoint` (`references/`)
- `ack-restore-checkpoint` (`references/`)

### Governance Workflows
- `ack-drift-control` (no `references/` directory)

### Session And Navigation Workflows
- `ack-session` (`references/commands.md`)
- `ack-guide` (`references/routes.md`, `references/phase-boundaries.md`)

### Loop Workflows (invoke in order; 04 is optional)
- `ack-loop-01-readiness` (`references/procedure.md`)
- `ack-loop-02-implement` (`references/procedure.md`)
- `ack-loop-03-review` (`references/procedure.md`)
- `ack-loop-04-learnings` (`references/procedure.md`)
- `ack-loop-05-commit` (`references/procedure.md`)

All current skills include:
- `SKILL.md`
- `SKILL.validation.md`

## Naming Rules
- Skill directory names must match the `name` field in each `SKILL.md`.
- Use lowercase alphanumeric plus hyphen naming only.

## Validation
- Validate skills using the canonical skill validation workflow.
- Keep validation status current whenever a skill's workflow or the governance rules change.
