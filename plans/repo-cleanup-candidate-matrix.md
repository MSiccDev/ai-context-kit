# Repo Cleanup Candidate Matrix

## Purpose
Track post-migration cleanup candidates and approved actions so deletions/retentions are explicit and reviewable.

## Action Keys
- `delete`: remove file/artifact as no longer needed.
- `retain`: keep file/artifact in place.
- `archive`: move to archival location under `plans/` while preserving traceability.

## Candidate Table
| path | artifact_type | owner_area | current_role | duplication_or_staleness_reason | approved_action | replacement_or_retention_note |
| --- | --- | --- | --- | --- | --- | --- |
| `plans/skill-first-migration-matrix.md` | migration tracking | `plans` | Temporary migration execution matrix | Migration completed; matrix now adds noise and stale-maintenance risk | `delete` | Summarize final outcome in `plans/repo-cleanup-report.md` |
| `plans/skill-first-parity-report.md` | parity evidence | `plans` | Temporary dual-path parity artifact | Migration completed; parity snapshot no longer needed for daily operations | `delete` | Summarize parity conclusion in `plans/repo-cleanup-report.md` |
| `plans/skill-first-quality-gate-map.md` | quality gate inventory | `plans` | Temporary prompt-to-skill gate migration ledger | Migration completed; ongoing maintenance of 1:1 map is redundant | `delete` | Preserve key gate outcomes in `plans/repo-cleanup-report.md` |
| `plans/skill-extraction-matrix.md` | extraction tracking | `plans` | Temporary extraction-progress tracker | Extraction completed and superseded by canonical `skills/` inventory | `delete` | Keep canonical inventory in `skills/README.md`; summarize removal in cleanup report |
| `plans/adopt-agent-skills-foundation.prompt.md` | executed plan | `plans` | Execution history | Not temporary; lifecycle record | `retain` | Required by plan lifecycle policy |
| `plans/adopt-agents-md-standard-codex.prompt.md` | executed plan | `plans` | Execution history | Not temporary; lifecycle record | `retain` | Required by plan lifecycle policy |
| `plans/extract-agent-skills-from-existing-artifacts.prompt.md` | executed plan | `plans` | Execution history | Not temporary; lifecycle record | `retain` | Required by plan lifecycle policy |
| `plans/adopt-skill-first-workflow-authority.prompt.md` | executed plan | `plans` | Execution history | Not temporary; lifecycle record | `retain` | Required by plan lifecycle policy |
| `plans/README.md` | governance doc | `plans` | Plan lifecycle policy | Canonical policy file; not redundant | `retain` | Required by `AGENTS.md` plan policy |
| `plans/plan-status.sh` | utility script | `plans` | Open/executed plan status checker | Canonical utility; no duplicate | `retain` | Keep as required lifecycle tool |
| `prompts/create-*.prompt.md` | compatibility wrapper set | `prompts` | User-facing compatibility entrypoints | Not stale; wrappers intentionally retained | `retain` | Skill-first model requires wrappers remain thin but available |
| `prompts/validate-*.prompt.md` | compatibility wrapper set | `prompts` | User-facing compatibility entrypoints | Not stale; wrappers intentionally retained | `retain` | Skill-first model requires wrappers remain thin but available |
| `skills/create-usercontext-instructions/references/source-mapping.md` | traceability map | `skills` | Temporary migration provenance map | Migration is complete; file is non-operational noise | `delete` | Remove `Source traceability` reference from parent `SKILL.md` |
| `skills/create-project-instructions/references/source-mapping.md` | traceability map | `skills` | Temporary migration provenance map | Migration is complete; file is non-operational noise | `delete` | Remove `Source traceability` reference from parent `SKILL.md` |
| `skills/create-agents-md/references/source-mapping.md` | traceability map | `skills` | Temporary migration provenance map | Migration is complete; file is non-operational noise | `delete` | Remove `Source traceability` reference from parent `SKILL.md` |
| `skills/create-skill/references/source-mapping.md` | traceability map | `skills` | Temporary migration provenance map | Migration is complete; file is non-operational noise | `delete` | Remove `Source traceability` reference from parent `SKILL.md` |
| `skills/validate-usercontext-instructions/references/source-mapping.md` | traceability map | `skills` | Temporary migration provenance map | Migration is complete; file is non-operational noise | `delete` | Remove `Source traceability` reference from parent `SKILL.md` |
| `skills/validate-project-instructions/references/source-mapping.md` | traceability map | `skills` | Temporary migration provenance map | Migration is complete; file is non-operational noise | `delete` | Remove `Source traceability` reference from parent `SKILL.md` |
| `skills/validate-agents-md/references/source-mapping.md` | traceability map | `skills` | Temporary migration provenance map | Migration is complete; file is non-operational noise | `delete` | Remove `Source traceability` reference from parent `SKILL.md` |
| `skills/validate-skill/references/source-mapping.md` | traceability map | `skills` | Temporary migration provenance map | Migration is complete; file is non-operational noise | `delete` | Remove `Source traceability` reference from parent `SKILL.md` |
| `skills/plan-lifecycle-management/references/source-mapping.md` | traceability map | `skills` | Temporary migration provenance map | Migration is complete; file is non-operational noise | `delete` | Remove `Source traceability` reference from parent `SKILL.md` |
| `skills/repository-drift-control/references/source-mapping.md` | traceability map | `skills` | Temporary migration provenance map | Migration is complete; file is non-operational noise | `delete` | Remove `Source traceability` reference from parent `SKILL.md` |

## Commit 1 Validation Checklist
- [x] Candidate rows include explicit rationale.
- [x] Every candidate row has an `approved_action`.
- [x] No canonical artifact is marked `delete` without replacement rationale.
- [x] Cleanup actions preserve plan lifecycle records.
