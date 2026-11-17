# Skills Directory

This directory is the canonical location for repository skill instances.

## Authority Model
- `skills/` is the canonical source for operational create/validate/governance workflow logic.
- `prompts/` remains available as compatibility wrappers and should defer detailed workflow logic to skills.
- Keep wrappers concise; do not reintroduce full checklists/rubrics already defined in skills.

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

All current skills include:
- `SKILL.md`
- `SKILL.validation.md`

## Naming Rules
- Skill directory names must match the `name` field in each `SKILL.md`.
- Use lowercase alphanumeric plus hyphen naming only.

## Validation
- Validate skills using the canonical skill validation workflow.
- Keep validation status current whenever source prompts or governance rules change.
