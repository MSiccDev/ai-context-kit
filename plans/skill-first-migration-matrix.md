# Skill-First Migration Matrix

## Purpose
Track migration progress from prompt-authoritative workflows to skill-authoritative workflows.

## Status Keys
- `migration_status`: `planned`, `migrated`, `validated`
- `current_authority`: current canonical source of operational workflow behavior
- `target_authority`: intended canonical source after migration

## Workflow Matrix
| workflow_id | canonical_skill_path | current_authority | target_authority | prompt_wrapper_path | migration_status | duplication_risk_notes |
| --- | --- | --- | --- | --- | --- | --- |
| `create-usercontext-instructions` | `skills/create-usercontext-instructions/` | `skills/create-usercontext-instructions/` | `skills/create-usercontext-instructions/` | `prompts/create-usercontext-instructions.prompt.md` | `validated` | `Reduced: prompt now wrapper-only; canonical logic in skill references` |
| `create-project-instructions` | `skills/create-project-instructions/` | `skills/create-project-instructions/` | `skills/create-project-instructions/` | `prompts/create-project-instructions.prompt.md` | `validated` | `Reduced: prompt now wrapper-only; command/role templates moved to skill references` |
| `create-agents-md` | `skills/create-agents-md/` | `skills/create-agents-md/` | `skills/create-agents-md/` | `prompts/create-agents-md.prompt.md` | `validated` | `Reduced: prompt now wrapper-only; required-element checks moved to skill references` |
| `validate-usercontext-instructions` | `skills/validate-usercontext-instructions/` | `skills/validate-usercontext-instructions/` | `skills/validate-usercontext-instructions/` | `prompts/validate-usercontext-instructions.prompt.md` | `validated` | `Reduced: prompt rubric removed; phase/report/scoring logic in skill references` |
| `validate-project-instructions` | `skills/validate-project-instructions/` | `skills/validate-project-instructions/` | `skills/validate-project-instructions/` | `prompts/validate-project-instructions.prompt.md` | `validated` | `Reduced: prompt rubric removed; phase/report/scoring logic in skill references` |
| `validate-agents-md` | `skills/validate-agents-md/` | `skills/validate-agents-md/` | `skills/validate-agents-md/` | `prompts/validate-agents-md.prompt.md` | `validated` | `Reduced: prompt rubric removed; phase/report/scoring logic in skill references` |
| `create-skill` | `skills/create-skill/` | `skills/create-skill/` | `skills/create-skill/` | `prompts/create-skill.prompt.md` | `validated` | `Reduced: new canonical skill added; prompt now wrapper-only` |
| `validate-skill` | `skills/validate-skill/` | `skills/validate-skill/` | `skills/validate-skill/` | `prompts/validate-skill.prompt.md` | `validated` | `Reduced: new canonical skill added; prompt now wrapper-only` |
| `plan-lifecycle-management` | `skills/plan-lifecycle-management/` | `skills/plan-lifecycle-management/` | `skills/plan-lifecycle-management/` | `n/a` | `validated` | `Low: governance workflow remains skill-authoritative` |
| `repository-drift-control` | `skills/repository-drift-control/` | `skills/repository-drift-control/` | `skills/repository-drift-control/` | `n/a` | `validated` | `Low: governance workflow remains skill-authoritative` |

## Commit 1 Validation Checklist
- [x] Every prompt workflow has one canonical skill mapping.
- [x] No prompt workflow is missing `target_authority`.
- [x] Prompt wrapper path is defined for all prompt-backed workflows.
- [x] `migration_status` initialized for all rows.
