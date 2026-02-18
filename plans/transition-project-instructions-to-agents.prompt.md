---
description: "Step-by-step (committable) plan to transition project-context authority from project instruction files to root AGENTS.md."
status: open
---

# Task: Transition Project Context Into AGENTS.md (Platform-Agnostic)

You are Codex in VS Code working in the `ai-context-kit` repository.

## Goal
Make root `AGENTS.md` the canonical project-context authority for this repository, while keeping the repository platform-agnostic and avoiding abrupt breaking changes.
Also make AGENTS-first the default generation outcome for other projects using this repo’s skills/templates.

## Scope
### In scope
- Migrate project defaults/context currently anchored in `projects/ai_context_kit_project.instructions.md` into root `AGENTS.md`.
- Update docs/skills/templates so references match the AGENTS-centric model.
- Update generation guidance so project bootstrapping produces `AGENTS.md` as the canonical project artifact.
- Decommission obsolete project sample files only after references are fully migrated.
- Remove project-level `*.instructions.md` guidance from active repository workflows.

### Out of scope
- Full redesign of the session spec model.
- Removing user-context artifacts (`usercontexts/`) in this phase.
- Breaking compatibility wrappers in `prompts/`.

## Constraints
- Keep language provider-neutral and runtime-portable.
- Keep cross-file references deterministic and auditable.
- Keep plans in `plans/` and lifecycle metadata compliant.
- No file deletion before reference integrity checks pass.

## Target State
- Root `AGENTS.md` is the only canonical project-context source for this repo.
- `projects/` is either removed or explicitly marked legacy/non-canonical.
- README, skills, templates, and plans reflect AGENTS-first project context for this repo.
- Skills/templates intended for new projects default to `AGENTS.md` outputs for project-level instructions.
- Platform-agnostic guidance remains explicit (AGENTS-first, optional layering where supported).

## Quality Gates (blocking)
### Gate 1: Authority clarity
- No touched file may imply `projects/*.instructions.md` is authoritative for this repo after migration.
- `AGENTS.md` must explicitly contain the project defaults previously referenced from `projects/`.

### Gate 2: Reference integrity
- No broken links or stale paths to removed/deprecated project files in active docs and skills.
- Validate with repository-wide `rg` checks before deletions.

### Gate 3: Platform-agnostic posture
- Documentation must preserve provider-neutral language and runtime portability.
- Platform guidance must be AGENTS-first without reintroducing project-level `*.instructions.md` flows.

### Gate 4: Output destination policy
- No touched generation workflow may default project output to `*_project.instructions.md`.
- Canonical project output path must be `AGENTS.md` (or nested `AGENTS.md` where scoped).

### Gate 5: Plan lifecycle compliance
- Plan remains in `plans/` with valid frontmatter.
- Final execution updates `status`, `executed_at`, and `execution_ref`.

## Commit Plan

### Step 0 (pre-commit) - Create dedicated implementation branch
Create branch from current base.

Requirements:
- Branch name must use `codex/` prefix.
- Recommended name: `codex/transition-project-context-to-agents`.

Validation:
- `git branch --show-current` returns the new `codex/...` branch before Commit 1.

Human review gate (required):
- Reviewer: `@msicc`
- Confirm branch name and scope before starting Commit 1.

---

### Commit 1 - Transition inventory and dependency matrix
Add:
- `plans/project-context-to-agents-matrix.md`

Matrix columns:
- `path`
- `current_reference`
- `target_reference`
- `migration_action` (`rewrite`, `retain`, `remove`, `legacy-note`)
- `status` (`planned`, `migrated`, `verified`)

Validation:
- Every `projects/` reference in active docs/skills is mapped.
- No unmapped active dependency remains.

Human review gate (required):
- Reviewer: `@msicc`
- Approve `plans/project-context-to-agents-matrix.md` before Commit 2.

---

### Commit 2 - Move project defaults/context into AGENTS.md
Update:
- `AGENTS.md`

Required updates:
- Inline all project default context needed for this repo (no dependency on `projects/ai_context_kit_project.instructions.md`).
- Keep session-state defaults and command policies explicit.
- Preserve concise operational style (no spec duplication).

Validation:
- `AGENTS.md` remains the primary operational entrypoint.
- Default-state section is self-contained.

Human review gate (required):
- Reviewer: `@msicc`
- Approve `AGENTS.md` project-context migration before Commit 3.

---

### Commit 3 - Align docs, skills, and templates to AGENTS-first model
Update:
- `README.md`
- `templates/AGENTS_template.md`
- `templates/project_template.instructions.md` (remove or archive as obsolete)
- `skills/create-project-instructions/SKILL.md`
- `skills/validate-project-instructions/SKILL.md`
- any touched skill references that still use `projects/ai_context_kit_project.instructions.md` as canonical example

Required updates:
- Remove authoritative claims tied to `projects/` for this repo.
- Repoint examples/default anchors to `AGENTS.md` where repository-specific context is required.
- Ensure project-generation workflows default to creating/updating `AGENTS.md`.
- Remove active project-level `*.instructions.md` generation/validation guidance.
- Keep platform-agnostic language explicit.

Validation:
- No active guidance conflicts with AGENTS-first project authority.

Human review gate (required):
- Reviewer: `@msicc`
- Approve doc/skill/template alignment before Commit 4.

---

### Commit 4 - Decommission obsolete project sample artifacts
Candidate removals (if Gate 2 passes):
- `projects/ai_context_kit_project.instructions.md`
- `projects/ai_context_kit_project.validation.md`

Also update:
- any remaining references in plans/docs/skills.

Validation:
- `rg` finds no active references to removed files outside historical executed-plan context.
- If historical plans mention removed files, keep them as historical records only.

Human review gate (required):
- Reviewer: `@msicc`
- Approve deletion set and reference scan results before Commit 5.

---

### Commit 5 - Verification report and closure
Add/update:
- `plans/project-context-to-agents-report.md`
- this plan frontmatter (`status: executed`, `executed_at`, `execution_ref`)

Report must include:
- migrated references list
- removed/retained files and rationale
- reference-integrity check summary
- residual follow-ups (if any)

Validation:
- `./plans/plan-status.sh` shows this plan under `EXECUTED`.

Human review gate (required):
- Reviewer: `@msicc`
- Approve final report and closure metadata before push/PR.

## Definition Of Done
- Root `AGENTS.md` is self-sufficient for project context in this repo.
- Active docs/skills no longer require `projects/*.instructions.md` as canonical source.
- Project-generation guidance defaults to `AGENTS.md` as the project-level artifact.
- Platform-agnostic guidance remains clear and usable across providers.

## Sanity Checks After Each Commit
- No provider lock-in wording introduced.
- No broken links in touched files.
- No hidden scope expansion beyond project-context migration.
