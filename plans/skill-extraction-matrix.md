# Skill Extraction Matrix

## Purpose
Track extraction status, source traceability, and validation readiness for skills derived from existing repository artifacts.

## Status Keys
- `priority`: `A` (core workflows), `B` (governance support)
- `extraction_status`: `planned`, `extracted`, `validated`
- `validation_status`: `pending`, `pass`, `pass_with_warnings`, `fail`

| candidate_skill_path | source_files | source_sections | capability_summary | priority | extraction_status | validation_status |
| --- | --- | --- | --- | --- | --- | --- |
| `skills/create-usercontext-instructions/` | `prompts/create-usercontext-instructions.prompt.md` | `# Generate User Context Instructions File`; `## Workflow`; `## Generation Rules`; `## Validation Checklist`; `## Output Format` | Generate complete user-context instruction files from structured discovery. | `A` | `validated` | `pass` |
| `skills/create-project-instructions/` | `prompts/create-project-instructions.prompt.md` | `# Generate Project Instructions File`; `## Workflow`; `## Generation Rules`; `## Validation Checklist`; `## Output Format` | Generate complete project instruction files with required session-state model sections. | `A` | `validated` | `pass` |
| `skills/create-agents-md/` | `prompts/create-agents-md.prompt.md` | `# Generate AGENTS.md File`; `## Workflow`; `## Generation Rules`; `## Validation Checklist`; `## Output Format` | Generate concise, repository-specific `AGENTS.md` operational contracts. | `A` | `validated` | `pass` |
| `skills/validate-usercontext-instructions/` | `prompts/validate-usercontext-instructions.prompt.md` | `# Validate User Context Instructions File`; `## Validation Workflow`; `## Validation Report Format`; `## Scoring System` | Validate user-context instruction files and produce scored, actionable reports. | `A` | `validated` | `pass` |
| `skills/validate-project-instructions/` | `prompts/validate-project-instructions.prompt.md` | `# Validate Project Instructions File`; `## Validation Workflow`; `## Validation Report Format`; `## Scoring System` | Validate project instruction files and enforce section/state completeness. | `A` | `validated` | `pass` |
| `skills/validate-agents-md/` | `prompts/validate-agents-md.prompt.md` | `# Validate AGENTS.md File`; `## Validation Workflow`; `## Validation Report Format`; `## Scoring System` | Validate `AGENTS.md` for operational completeness, clarity, and portability. | `A` | `validated` | `pass` |
| `skills/plan-lifecycle-management/` | `plans/README.md`; `plans/plan-status.sh`; `AGENTS.md`; `plans/*.prompt.md` | `# Plans Directory Policy`; frontmatter lifecycle fields (`status`, `executed_at`, `execution_ref`); plan status detection behavior | Manage plan lifecycle metadata and open/executed tracking conventions. | `B` | `validated` | `pass` |
| `skills/repository-drift-control/` | `AGENTS.md`; `README.md`; `specs/context_aware_ai_session_spec.md` | `## Source Of Truth And Precedence`; `## Update And Drift-Control Rule`; canonical path conventions; spec alignment notes | Enforce coordinated updates when specification/templates/prompts/samples evolve. | `B` | `validated` | `pass` |

## Coverage Check
- Priority A skills: 6
- Priority B skills: 2
- Total skills tracked: 8
- Planned skills: 0
- Total validated skills: 8

## Authority Check
- Workflow authority model: `skill-first`
- Prompt role: compatibility wrappers only
