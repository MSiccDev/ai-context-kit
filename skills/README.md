# Skills Directory

This directory is the canonical location for repository skill instances.

## Authority Model
- `skills/` is the canonical source for operational create/validate/governance workflow logic.
- `prompts/` remains available as compatibility wrappers and should defer detailed workflow logic to skills.
- Keep wrappers concise; do not reintroduce full checklists/rubrics already defined in skills.

## Scope
- Store concrete skill folders here, each containing a `SKILL.md` file.
- Keep references local to each skill using relative paths.

## Extracted Skills
- `create-usercontext-instructions`
- `create-project-instructions`
- `create-agents-md`
- `create-skill`
- `validate-usercontext-instructions`
- `validate-project-instructions`
- `validate-agents-md`
- `validate-skill`
- `plan-lifecycle-management`
- `repository-drift-control`

Each extracted skill includes:
- `SKILL.md`
- `SKILL.validation.md`
- `references/` resources as needed by the workflow

## Naming Rules
- Skill directory names must match the `name` field in each `SKILL.md`.
- Use lowercase alphanumeric plus hyphen naming only.

## Validation
- Validate skills using the canonical skill validation workflow.
- Keep validation status current whenever source prompts or governance rules change.
