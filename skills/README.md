# Skills Directory

This directory is the canonical location for repository skill instances.

## Scope
- Store concrete skill folders here, each containing a `SKILL.md` file.
- Keep references local to each skill using relative paths.

## Extracted Skills
- `create-usercontext-instructions`
- `create-project-instructions`
- `create-agents-md`
- `validate-usercontext-instructions`
- `validate-project-instructions`
- `validate-agents-md`
- `plan-lifecycle-management`
- `repository-drift-control`

Each extracted skill includes:
- `SKILL.md`
- `references/source-mapping.md`
- `SKILL.validation.md`

## Naming Rules
- Skill directory names must match the `name` field in each `SKILL.md`.
- Use lowercase alphanumeric plus hyphen naming only.

## Validation
- Use `prompts/validate-skill.prompt.md` to produce/update `SKILL.validation.md`.
- Keep validation status current whenever source prompts or governance rules change.
