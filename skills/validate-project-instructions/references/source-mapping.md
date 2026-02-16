# Source Mapping: validate-project-instructions

## Source Files
- `prompts/validate-project-instructions.prompt.md`
- `projects/ai_context_kit_project.instructions.md`
- `projects/ai_context_kit_project.validation.md`

## Section Mapping
| Skill section | Source anchor |
| --- | --- |
| Purpose | `prompts/validate-project-instructions.prompt.md` -> `## Mission` |
| When To Use | `prompts/validate-project-instructions.prompt.md` -> `## Scope & Preconditions` |
| Required Inputs | `prompts/validate-project-instructions.prompt.md` -> phase checks for sections/state/roles |
| Workflow | `prompts/validate-project-instructions.prompt.md` -> `## Validation Workflow` (Phases 1-5) |
| Output Expectations | `prompts/validate-project-instructions.prompt.md` -> `## Validation Report Format`, `## Scoring System` |
| Constraints And Safety | `prompts/validate-project-instructions.prompt.md` -> `## Best Practices for Validation` |

## Notes
- Session-state and command checks are preserved from the source validator flow.
