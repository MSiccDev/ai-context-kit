# Source Mapping: create-skill

## Canonical Sources
- `skills/create-skill/SKILL.md`
- `skills/create-skill/references/discovery-phases.md`
- `skills/create-skill/references/field-constraints.md`
- `skills/create-skill/references/output-schema.md`
- `skills/create-skill/references/output-format.md`
- `skills/create-skill/references/quality-checklist.md`
- `skills/create-skill/references/safety.md`
- `templates/skill_template/SKILL.md`

## Historical Prompt Source (Pre-Wrapper)
- `prompts/create-skill.prompt.md` at commit `94573d3` (before thin-wrapper conversion in `e85315b`).

## Section Mapping
| Skill section | Canonical source |
| --- | --- |
| Purpose | `skills/create-skill/SKILL.md` -> `## Purpose` |
| When To Use | `skills/create-skill/SKILL.md` -> `## When To Use` |
| Required Inputs | `skills/create-skill/SKILL.md` -> `## Required Inputs` |
| Workflow | `skills/create-skill/SKILL.md` -> `## Workflow`; phase detail in `skills/create-skill/references/discovery-phases.md` |
| Output Expectations | `skills/create-skill/SKILL.md` -> `## Output Expectations`; contract detail in `skills/create-skill/references/output-format.md` |
| Constraints And Safety | `skills/create-skill/SKILL.md` -> `## Constraints And Safety`; detailed rules in `skills/create-skill/references/safety.md` and `skills/create-skill/references/quality-checklist.md` |

## Notes
- Field constraints align with `templates/skill_template/SKILL.md` frontmatter rules and are enforced in `skills/create-skill/references/field-constraints.md`.
