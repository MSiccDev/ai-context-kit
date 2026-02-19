---
description: "Step-by-step (committable) plan to clean temporary migration artifacts and reduce post-migration duplication."
status: executed
executed_at: 2026-02-18
execution_ref: codex/repo-cleanup-post-skill-migration
---

# Task: Repository Cleanup After Skill-First Migration

You are Codex in VS Code working in the `ai-context-kit` repository.

## Goal
Clean up temporary or transitional artifacts created during the skill-first migration while preserving authoritative behavior, traceability, and documentation integrity.

## Scope
### In scope
- Identify temporary files/notes that were useful during migration but are no longer needed post-merge.
- Remove or archive redundant migration artifacts that duplicate canonical skill behavior.
- Fix stale wording that still implies prompt-authoritative behavior.
- Ensure references and cross-links remain valid after cleanup.

### Out of scope
- Rewriting canonical workflow logic in `skills/*/SKILL.md` (unless cleanup reveals blocking inconsistencies).
- Spec redesign beyond minor consistency updates.
- Removing compatibility wrappers in `prompts/` (wrappers remain supported).

## Constraints
- Keep language provider-neutral and runtime-portable.
- Preserve canonical paths and naming conventions.
- Keep plans in `plans/`.
- Use relative repository paths for references.
- Keep executed plan history unless explicitly approved for deletion.

## Cleanup Principles
1. Canonical-first: retain canonical sources (`specs/`, `templates/`, `skills/`) over transitional reports.
2. Traceability-preserving: if deleting a transitional artifact, preserve essential decision history in a stable location.
3. Minimal-risk sequencing: update references before removing files they point to.
4. Reviewability: keep cleanup commits small and thematic.

## Quality Gate Contract (blocking)
### Gate 1: Deletion justification coverage
- Every removed file must be listed in a cleanup matrix with:
  - `path`
  - `category` (`temporary`, `redundant`, `superseded`, `obsolete`)
  - `replacement_or_reason`
  - `approved_action` (`delete`, `retain`, `archive`)
- No file is deleted without explicit rationale.

### Gate 2: Reference integrity
- No broken references after cleanup:
  - markdown links
  - path references in plans/docs
  - source-mapping references
- Use repository-wide `rg` checks for removed/renamed paths.

### Gate 3: Authority consistency
- No remaining wording that contradicts the skill-first model:
  - prompts as compatibility wrappers
  - skills as canonical operational logic
- No stale version drift between README/templates/spec for affected sections.

### Gate 4: Plan lifecycle compliance
- All new cleanup planning artifacts are in `plans/`.
- Final state is reflected by `./plans/plan-status.sh`.

## Commit Plan

### Step 0 (pre-commit) - Create dedicated cleanup branch
Create a dedicated branch from the current base branch.

Requirements:
- Branch name must use `codex/` prefix.
- Recommended name: `codex/repo-cleanup-post-skill-migration`.

Validation:
- `git branch --show-current` returns the new `codex/...` branch before Commit 1.

---

### Commit 1 - Cleanup inventory and decision matrix
Add:
- temporary cleanup candidate matrix used during execution (removed after completion)

Matrix requirements:
- One row per candidate cleanup item.
- Columns:
  - `path`
  - `artifact_type`
  - `owner_area` (`specs`, `templates`, `skills`, `prompts`, `plans`, `samples`)
  - `current_role`
  - `duplication_or_staleness_reason`
  - `approved_action`
  - `replacement_or_retention_note`

Validation:
- All candidate deletions have explicit rationale.
- No canonical artifact is marked delete without replacement rationale.

---

### Commit 2 - Low-risk doc consistency cleanup
Update:
- stale notes in migration matrices/reports that contradict the merged skill-first state
- wording inconsistencies that imply prompt-authoritative logic
- version wording drift in touched files (if present)

Validation:
- Wording is internally consistent with skill-first authority model.
- No behavioral workflow changes introduced.

---

### Commit 3 - Remove approved temporary/redundant artifacts
Remove only items marked `approved_action: delete` in matrix.

Also update:
- references in `README.md`, `AGENTS.md`, `plans/*.md`, and `skills/*/references/*.md` affected by removals.

Validation:
- Repository-wide search finds no references to deleted paths.
- `plans/` policy remains satisfied.

---

### Commit 4 - Verification pass and cleanup report
Add/update:
- `plans/repo-cleanup-report.md`

Report requirements:
- List of deleted files with rationale.
- List of retained artifacts with justification.
- Reference-integrity checks performed.
- Residual cleanup candidates deferred (if any).

Validation:
- `./plans/plan-status.sh` runs cleanly.
- No unknown plan status for touched plan files.

---

### Commit 5 - Close cleanup plan
Update this plan frontmatter:
- `status: executed`
- `executed_at: YYYY-MM-DD`
- `execution_ref: <branch|commit|PR|tag>`

Validation:
- This plan appears under `EXECUTED` in `./plans/plan-status.sh`.

## Definition Of Done
- Temporary/redundant migration artifacts are either removed or explicitly retained with rationale.
- No stale wording remains that contradicts the skill-first authority model.
- No broken cross-references exist after cleanup.
- Cleanup decisions are documented and reviewable.

## Sanity Checks After Each Commit
- No provider-specific lock-in wording.
- No canonical path instability.
- No unintended workflow behavior changes.
- No unrelated files modified.

## Success Metrics
- Reduced documentation noise in `plans/` and related migration tracking files.
- Zero contradictory authority statements across touched files.
- Zero broken references to removed artifacts.
