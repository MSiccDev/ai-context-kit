# Project Context To AGENTS Matrix

## Purpose
Track migration of project-context authority from `projects/*.instructions.md` to root `AGENTS.md`.

## Status Keys
- `planned`: not yet migrated
- `migrated`: updated to AGENTS-first target
- `verified`: migrated and reference-check validated

## Matrix
| path | current_reference | target_reference | migration_action | status |
| --- | --- | --- | --- | --- |
| `AGENTS.md` | Defaults and samples anchored to `projects/ai_context_kit_project.instructions.md` | Inline repo defaults in `AGENTS.md`; remove `projects/*` as canonical sample source | `rewrite` | `planned` |
| `README.md` | Repo structure, quickstart, and linking guidance centered on `projects/*.instructions.md` | AGENTS-first repo/project guidance and examples | `rewrite` | `planned` |
| `templates/AGENTS_template.md` | Repository map and sample references include `projects/` | AGENTS-first project-context template without `projects/` dependency | `rewrite` | `planned` |
| `templates/project_template.instructions.md` | Canonical template for project-level `*.instructions.md` | Remove as obsolete for AGENTS-only model | `remove` | `planned` |
| `skills/create-project-instructions/SKILL.md` | Example/reference path points to `projects/ai_context_kit_project.instructions.md` | Generate/update `AGENTS.md` as project-level output | `rewrite` | `planned` |
| `skills/create-project-instructions/references/output-format.md` | Output path contract uses `projects/{project_name}_project.instructions.md` | Output path contract targets `AGENTS.md` | `rewrite` | `planned` |
| `skills/create-project-instructions/references/source-mapping.md` | Source anchors include `projects/ai_context_kit_project.instructions.md` | Re-anchor to AGENTS-first artifacts or remove if obsolete | `rewrite` | `planned` |
| `skills/validate-project-instructions/SKILL.md` | Example target/report point to `projects/*` | Validate AGENTS-based project context artifact | `rewrite` | `planned` |
| `skills/validate-project-instructions/references/source-mapping.md` | Source anchors include `projects/*.instructions.md` and validation report | Re-anchor to AGENTS-first artifacts or remove if obsolete | `rewrite` | `planned` |
| `specs/context_aware_ai_session_spec.md` | Canonical paths list includes `projects/` | AGENTS-first canonical path posture for this repo (without forcing provider lock-in) | `rewrite` | `planned` |
| `plans/adopt-agents-md-standard-codex.prompt.md` | Historical plan content references `projects/` | Keep historical record unchanged | `retain` | `planned` |
| `plans/adopt-skill-first-workflow-authority.prompt.md` | Historical plan content references `projects/` fixtures | Keep historical record unchanged | `retain` | `planned` |
| `plans/extract-agent-skills-from-existing-artifacts.prompt.md` | Historical plan content references `projects/` | Keep historical record unchanged | `retain` | `planned` |
| `projects/ai_context_kit_project.instructions.md` | Active project-context sample file | Decommission in AGENTS-only model | `remove` | `planned` |
| `projects/ai_context_kit_project.validation.md` | Validation artifact for obsolete project sample | Decommission with sample removal | `remove` | `planned` |

## Commit 1 Validation Checklist
- [x] Every active `projects/` dependency in docs/skills/spec is mapped.
- [x] Historical executed-plan references are explicitly classified as `retain`.
- [x] Candidate removals are separated from rewrites and gated for later commit.
