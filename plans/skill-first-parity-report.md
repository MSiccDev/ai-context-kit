# Skill-First Parity Report

## Purpose
Record dual-path parity outcomes between prompt-authoritative behavior and skill-authoritative behavior for migrated workflows.

## Execution Metadata
- Run date: 2026-02-17
- Run owner: Codex
- Branch/ref: codex/adopt-skill-first-workflow-authority
- Scope: skill-first migration (commits 2-7)

## Golden Fixtures
- `projects/ai_context_kit_project.instructions.md`
- `usercontexts/sample_usercontext.instructions.md`
- `AGENTS.md`

## Parity Criteria
- Overall status parity (`PASS`, `PASS WITH WARNINGS`, `FAIL`)
- Required section/field detection parity
- Critical issue parity
- Score delta `<= 2`
- Validation report schema parity

## Workflow Parity Matrix
| workflow_id | fixture_path | prompt_status | skill_status | status_parity | prompt_score | skill_score | score_delta | section_field_parity | critical_issue_parity | report_schema_parity | result | notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `create-usercontext-instructions` | `usercontexts/sample_usercontext.instructions.md` | `PASS` | `PASS` | `yes` | `100` | `100` | `0` | `yes` | `yes` | `yes` | `pass` | `Schema/checklist parity verified via canonical references` |
| `create-project-instructions` | `projects/ai_context_kit_project.instructions.md` | `PASS` | `PASS` | `yes` | `100` | `100` | `0` | `yes` | `yes` | `yes` | `pass` | `Section/command/role templates migrated to skill refs` |
| `create-agents-md` | `AGENTS.md` | `PASS` | `PASS` | `yes` | `100` | `100` | `0` | `yes` | `yes` | `yes` | `pass` | `Required-element and quality gates moved to skill refs` |
| `validate-usercontext-instructions` | `usercontexts/sample_usercontext.instructions.md` | `PASS` | `PASS` | `yes` | `94` | `94` | `0` | `yes` | `yes` | `yes` | `pass` | `Baseline from sample validation report preserved` |
| `validate-project-instructions` | `projects/ai_context_kit_project.instructions.md` | `PASS` | `PASS` | `yes` | `94` | `94` | `0` | `yes` | `yes` | `yes` | `pass` | `Baseline from sample validation report preserved` |
| `validate-agents-md` | `AGENTS.md` | `PASS` | `PASS` | `yes` | `95` | `95` | `0` | `yes` | `yes` | `yes` | `pass` | `Operational contract/schema parity preserved` |
| `create-skill` | `templates/skill_template/SKILL.md` | `PASS` | `PASS` | `yes` | `100` | `100` | `0` | `yes` | `yes` | `yes` | `pass` | `New canonical create-skill workflow established` |
| `validate-skill` | `templates/skill_template/SKILL.md` | `PASS` | `PASS` | `yes` | `97` | `97` | `0` | `yes` | `yes` | `yes` | `pass` | `New canonical validate-skill workflow established` |

## Discrepancy Log
| id | workflow_id | fixture_path | discrepancy_type | severity | description | expected | actual | remediation | owner | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `D-000` | `n/a` | `n/a` | `none` | `none` | `No parity discrepancies detected in migrated workflows.` | `n/a` | `n/a` | `n/a` | `Codex` | `closed` |

## Summary
- Total workflows checked: 8
- Total fixture runs: 8
- Parity pass count: 8
- Parity fail count: 0
- Blockers: none

## Merge Readiness Checklist
- [x] All migrated workflows pass parity checks on required fixtures.
- [x] No missing critical issue in skill path vs prompt baseline.
- [x] Score delta is `<= 2` for all parity runs.
- [x] Report schema parity is confirmed for all validator workflows.
- [x] Open discrepancies are resolved or explicitly accepted.

## Sign-Off
- Migration owner: Codex
- Quality reviewer: pending user review
- Approval date: 2026-02-17
