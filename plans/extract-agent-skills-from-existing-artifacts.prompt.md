---
description: "Step-by-step (committable) plan to extract reusable skills from existing prompts and instruction artifacts after foundation adoption."
status: executed
executed_at: 2026-02-16
execution_ref: codex/extract-agent-skills-from-existing-artifacts
---

# Task: Extract agent skills from existing artifacts

You are Codex in VS Code working in the `ai-context-kit` repository.

## Goal
Systematically extract reusable skills from existing repository artifacts and migrate them into `skills/` as validated, maintainable, provider-neutral skill folders.

## Scope
### In scope
- Analyze current artifacts in:
  - `prompts/`
  - `projects/`
  - `usercontexts/`
- Identify repeated workflows and convert them into candidate skills.
- Create skill folders with `SKILL.md` files aligned to `templates/skill_template/SKILL.md`.
- Validate extracted skills with `prompts/validate-skill.prompt.md`.
- Add extraction inventory and mapping docs under `plans/`.
- Update repository docs to reference extracted skills.

### Out of scope
- Changing normative session-model behavior in `specs/`.
- Introducing provider-specific runtime behaviors.
- Deleting existing prompt/instruction source artifacts.
- Replacing existing create/validate prompts with skills in this phase.

## Constraints
- Preserve source meaning while improving reusability.
- Keep skill scopes narrow and composable.
- Use provider-neutral language.
- Use relative skill-local references only.
- Keep extraction incremental and reviewable.
- Keep plan files in `plans/` and skill instances in `skills/`.

## Decisions locked for this extraction phase
- Existing source prompts/instructions remain authoritative and are not removed.
- Each extracted skill must include:
  - `SKILL.md`
  - `references/source-mapping.md` (traceability back to source files/sections)
- Validation artifacts are stored next to each extracted skill as:
  - `SKILL.validation.md`
- `allowed-tools` remains optional/experimental and default-off.
- Extraction branch naming must use `codex/` prefix.

## Extraction inputs (authoritative source set)
- Create workflows:
  - `prompts/create-usercontext-instructions.prompt.md`
  - `prompts/create-project-instructions.prompt.md`
  - `prompts/create-agents-md.prompt.md`
- Validate workflows:
  - `prompts/validate-usercontext-instructions.prompt.md`
  - `prompts/validate-project-instructions.prompt.md`
  - `prompts/validate-agents-md.prompt.md`
- Governance and operational context:
  - `AGENTS.md`
  - `README.md`
  - `projects/ai_context_kit_project.instructions.md`
  - `usercontexts/sample_usercontext.instructions.md`

## Planned extracted skills
### Priority A (high-value core workflows)
- `skills/create-usercontext-instructions/`
- `skills/create-project-instructions/`
- `skills/create-agents-md/`
- `skills/validate-usercontext-instructions/`
- `skills/validate-project-instructions/`
- `skills/validate-agents-md/`

### Priority B (governance/operational support)
- `skills/plan-lifecycle-management/`
- `skills/repository-drift-control/`

## Commit plan

### Step 0 (pre-commit) — Create dedicated implementation branch
From the currently checked-out branch, create a dedicated extraction branch.

Requirements:
- Base branch is the currently checked-out branch at execution time.
- New branch name uses `codex/` prefix.
- Recommended name: `codex/extract-agent-skills-from-existing-artifacts`.

Validation:
- `git branch --show-current` returns the new `codex/...` branch before Commit 1.

---

### Commit 1 — Inventory and extraction matrix
Add:
- `plans/skill-extraction-matrix.md`

Matrix requirements:
- One row per candidate skill.
- Columns:
  - candidate skill path
  - source file(s)
  - source section(s)
  - capability summary
  - priority (`A`/`B`)
  - extraction status (`planned`)
  - validation status (`pending`)
- Include explicit mapping for all Priority A and Priority B skills listed above.

Validation:
- Matrix covers all extraction inputs.
- Paths and names match `skills/<name>/`.

---

### Commit 2 — Extract create-workflow skills (Priority A / part 1)
Add:
- `skills/create-usercontext-instructions/SKILL.md`
- `skills/create-usercontext-instructions/references/source-mapping.md`
- `skills/create-project-instructions/SKILL.md`
- `skills/create-project-instructions/references/source-mapping.md`
- `skills/create-agents-md/SKILL.md`
- `skills/create-agents-md/references/source-mapping.md`

Content requirements per skill:
- Scope narrowed to one workflow.
- Required inputs, workflow, outputs, and safety notes included.
- Traceability references to source prompt sections.
- `name` in frontmatter equals folder name.

Validation:
- Structure and naming parity checks pass.
- No provider-specific lock-in wording.

---

### Commit 3 — Extract validation-workflow skills (Priority A / part 2)
Add:
- `skills/validate-usercontext-instructions/SKILL.md`
- `skills/validate-usercontext-instructions/references/source-mapping.md`
- `skills/validate-project-instructions/SKILL.md`
- `skills/validate-project-instructions/references/source-mapping.md`
- `skills/validate-agents-md/SKILL.md`
- `skills/validate-agents-md/references/source-mapping.md`

Content requirements:
- Preserve scoring/report patterns from source validators.
- Keep report-writing guidance deterministic.
- Include failure classification guidance (critical/warning/enhancement).

Validation:
- Directory and frontmatter parity checks pass for all three skills.
- Source mapping documents cover all core phases of each validator.

---

### Commit 4 — Extract governance skills (Priority B)
Add:
- `skills/plan-lifecycle-management/SKILL.md`
- `skills/plan-lifecycle-management/references/source-mapping.md`
- `skills/repository-drift-control/SKILL.md`
- `skills/repository-drift-control/references/source-mapping.md`

Source anchors:
- `plans/README.md`
- `plans/plan-status.sh`
- `AGENTS.md`
- `README.md` governance/path sections

Validation:
- Governance skills are narrowly scoped and non-overlapping.
- Drift-control skill clearly lists affected artifact sets.

---

### Commit 5 — Skill validation reports and fixes
For every extracted skill:
- Create/update `skills/<name>/SKILL.validation.md` using `prompts/validate-skill.prompt.md`.
- Fix all critical issues until each skill reaches PASS.
- Reduce warnings where practical without broad rewrites.

Validation:
- Every extracted skill has a validation report.
- Each report status is PASS or PASS WITH WARNINGS.
- No extracted skill remains in FAIL state.

---

### Commit 6 — Documentation and index alignment
Update:
- `skills/README.md`
- `README.md`
- `AGENTS.md`
- `plans/skill-extraction-matrix.md`

Required updates:
- Add extracted skill index in `skills/README.md`.
- Add extraction outcome summary in `README.md` Agent Skills section.
- Add key references in `AGENTS.md` for extracted skills where appropriate.
- Update matrix statuses from `planned` to `extracted`/`validated`.

Validation:
- All links resolve.
- Canonical path and neutrality policies remain intact.

---

### Commit 7 — Finalize extraction phase
Finalize plan lifecycle metadata in this file:
- `status: executed`
- `executed_at: YYYY-MM-DD`
- `execution_ref: <branch|commit|PR|tag>`

Validation:
- `./plans/plan-status.sh` shows this extraction plan under `EXECUTED`.
- No leftover `planned` entries remain in extraction matrix.

## Definition of done
- All Priority A and Priority B skills listed in this plan are extracted.
- Every extracted skill includes:
  - `SKILL.md`
  - `references/source-mapping.md`
  - `SKILL.validation.md`
- Extracted skills are provider-neutral and aligned with canonical template/prompt rules.
- `plans/skill-extraction-matrix.md` reflects final extraction/validation status.
- Documentation references are updated and accurate.
- Extraction plan is marked executed with traceable execution reference.

## Sanity checks after each commit
- No provider-specific lock-in wording introduced.
- Skill folder name and frontmatter `name` remain identical.
- All skill-local references are relative and resolvable.
- Existing source prompts/instructions are preserved (no deletions in this phase).
- Changes remain scoped to extraction goals; no unrelated edits.
