# Source Mapping: plan-lifecycle-management

## Source Files
- `plans/README.md`
- `plans/plan-status.sh`
- `AGENTS.md`

## Section Mapping
| Skill section | Source anchor |
| --- | --- |
| Purpose | `plans/README.md` -> `# Plans Directory Policy` |
| When To Use | `plans/README.md` -> `## Scope`; `AGENTS.md` -> `## Plan Lifecycle Policy` |
| Required Inputs | `plans/README.md` -> `## Plan File Format` |
| Workflow | `plans/plan-status.sh` flow and frontmatter parsing behavior |
| Output Expectations | `plans/README.md` -> open/executed reporting and metadata requirements |
| Constraints And Safety | `AGENTS.md` -> plan lifecycle and path policy |

## Notes
- Lifecycle checks must keep `plans/` as the only plan storage location.
