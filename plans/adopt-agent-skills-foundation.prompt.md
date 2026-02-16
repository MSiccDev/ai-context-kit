---
description: "Step-by-step (committable) plan to adopt Agent Skills foundation in AI Context Kit while preserving repository governance and neutrality."
status: executed
executed_at: 2026-02-16
execution_ref: codex/adopt-agent-skills-foundation
---

# Task: Adopt Agent Skills foundation (phase 1 only)

You are Codex in VS Code working in the `ai-context-kit` repository.

## Goal
Establish a complete, provider-neutral **Agent Skills foundation** in this repository so skill authoring and validation are standardized before any extraction work begins.

## Scope
### In scope
- Add formal skills foundation artifacts (template + create/validate prompts + docs updates).
- Define canonical paths and schema constraints for `SKILL.md`.
- Add governance updates so drift-control includes skills artifacts.

### Out of scope
- Extracting skills from existing prompts/instructions.
- Implementing runtime execution of skills or tool runners.
- Shipping provider-specific integrations.

## Constraints
- Keep provider-neutral language across all touched files.
- Preserve existing repository structure and naming conventions.
- Keep all plans in `plans/`.
- Use relative repo paths for cross-references.
- Keep current source-of-truth precedence model intact unless explicitly updated in docs.

## Decisions already locked for this plan
- Foundation-only plan (extraction deferred).
- Canonical skills paths:
  - `templates/skill_template/`
  - `skills/`
- `allowed-tools` support policy:
  - Parsed/documented as optional/experimental.
  - Disabled by default.
- No sample skill implementation in this phase.
- Existing checklist content is merged into this formal plan; no parallel planning source should remain after this plan is applied.

## Execution style
- Work in small, reviewable, shippable commits.
- Validate references and policy alignment after each commit.
- Avoid unrelated file changes.

## Definition of done
This phase is complete when all are true:
- A canonical skill template exists at `templates/skill_template/SKILL.md` with required and optional frontmatter guidance.
- A skill creation prompt exists at `prompts/create-skill.prompt.md`.
- A skill validation prompt exists at `prompts/validate-skill.prompt.md` with deterministic report structure.
- `README.md` documents Agent Skills workflow and canonical paths.
- `README.md` includes a direct reference to Agent Skills docs home: `https://agentskills.io/home`.
- `AGENTS.md` includes skills artifacts in repository map and drift-control coverage.
- `skills/` path exists and is documented for future skill instances.
- `allowed-tools` is documented as optional/experimental and default-off.
- No provider-specific lock-in language is introduced.
- A follow-up extraction plan is created and linked, but not executed in this phase.

## Commit plan

### Step 0 (pre-commit) — Create dedicated implementation branch
From the current base branch, create a dedicated branch for executing this foundation plan.

Requirements:
- Base branch must be the currently checked-out branch at execution time.
- New branch name must use the `codex/` prefix.
- Recommended branch name: `codex/adopt-agent-skills-foundation`.

Validation:
- `git branch --show-current` returns the new `codex/...` branch before Commit 1 begins.

---

### Commit 1 — Plan formalization and source consolidation
Add:
- `plans/adopt-agent-skills-foundation.prompt.md` (this plan, `status: open`)

Remove:
- `AGENTSKILLS_ADOPTION_CHECKLIST.md` (content is now represented in this formal plan)

Validation:
- `./plans/plan-status.sh` lists this plan under `OPEN`.

---

### Commit 2 — Add skill template foundation
Add:
- `templates/skill_template/SKILL.md`
- `skills/README.md`

`SKILL.md` contract must include:
- Required frontmatter: `name`, `description`
- Optional frontmatter: `license`, `compatibility`, `metadata`, `allowed-tools`
- Constraints:
  - `name`: 1-64 chars, lowercase alphanumeric + hyphen, no leading/trailing hyphen, no consecutive hyphens, equals parent directory name
  - `description`: 1-1024 chars, explicit on capability and use-cases
  - `compatibility`: optional, 1-500 chars
  - `metadata`: optional map of string keys to string values
  - `allowed-tools`: optional/experimental, default-off policy
- Progressive disclosure guidance:
  - Keep core instructions concise in `SKILL.md`
  - Move large detail to `references/`
  - Load scripts/assets only when needed

Validation:
- Paths and references resolve.
- Content stays provider-neutral and repository-aligned.

---

### Commit 3 — Add skill generation prompt
Add:
- `prompts/create-skill.prompt.md`

Prompt requirements:
- Structured discovery phases (intent, activation criteria, constraints, dependencies, failure modes).
- Generation rules aligned to the `SKILL.md` contract.
- Output format that returns a complete skill artifact.
- Neutral wording and path references.

Validation:
- Prompt can generate a spec-conformant `SKILL.md`.
- No vendor-specific assumptions.

---

### Commit 4 — Add skill validation prompt
Add:
- `prompts/validate-skill.prompt.md`

Prompt requirements:
- Deterministic multi-phase validation workflow.
- Scoring model (/100) with PASS/WARN/FAIL thresholds.
- Persistent validation report format (`*.validation.md`) and overwrite behavior.
- Required checks:
  - `SKILL.md` presence
  - required frontmatter fields
  - `name` constraints + directory parity
  - `description` quality/completeness
  - optional field type/length checks
  - shallow relative reference hygiene
  - `allowed-tools` treated as optional/experimental and default-off

Validation:
- Prompt includes actionable issue reporting and minimal example fixes.

---

### Commit 5 — Update repository docs and governance
Update:
- `README.md`
- `AGENTS.md`

Required documentation changes:
- Add Agent Skills section to README with:
  - purpose
  - canonical paths
  - create/validate workflow
  - a direct link to Agent Skills docs home (`https://agentskills.io/home`)
  - neutrality and safety expectations
- Update AGENTS repository map to include skills artifacts.
- Extend AGENTS drift-control rule to include:
  - skill template
  - skill create/validate prompts
  - skill sample/docs path policies

Validation:
- All new links and paths resolve.
- Existing precedence model remains clear.

---

### Commit 6 — Close foundation and queue extraction
Add:
- `plans/extract-agent-skills-from-existing-artifacts.prompt.md` with `status: open`

Purpose of next plan:
- Extract candidate skills from:
  - `prompts/`
  - `projects/`
  - `usercontexts/`
- Classify and prioritize extraction targets.
- Define migration and validation workflow for extracted skills.

Then:
- Mark this foundation plan as executed:
  - `status: executed`
  - `executed_at: YYYY-MM-DD`
  - `execution_ref: <branch|commit|PR|tag>`

Validation:
- `./plans/plan-status.sh` shows foundation as `EXECUTED` and extraction as `OPEN`.

## Sanity checks after each commit
- No provider-specific lock-in wording.
- No canonical path breakage.
- All internal references are relative and valid.
- External documentation links resolve and are correct.
- No edits outside scope.
- New/updated artifacts follow existing markdown style conventions.

## Explicitly deferred work
- Skill extraction and migration from existing repository content is intentionally deferred to the follow-up extraction plan.
