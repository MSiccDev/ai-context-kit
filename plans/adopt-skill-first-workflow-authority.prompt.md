---
description: "Step-by-step (committable) plan to shift workflow authority from prompts to skills and reduce duplication/redundancy."
status: executed
executed_at: 2026-02-17
execution_ref: codex/adopt-skill-first-workflow-authority
---

# Task: Adopt skill-first workflow authority (phase 3)

You are Codex in VS Code working in the `ai-context-kit` repository.

## Goal
Shift operational workflow authority from prompt-heavy instructions to reusable skills, while preserving spec alignment and compatibility entrypoints.

## Scope
### In scope
- Make skills the primary operational source for create/validate/governance workflows.
- Reduce duplicated workflow logic across `prompts/` by moving detail into `skills/` resources.
- Convert existing prompts into concise wrappers that route to the canonical skills.
- Add missing skills for skill authoring/validation workflows currently prompt-only.
- Update governance/docs so precedence and maintenance expectations match the new model.

### Out of scope
- Broad spec redesign outside the skill-first migration scope.
- Removing prompts entirely (wrappers remain for compatibility).
- Introducing provider-specific runtime assumptions.

## Constraints
- Keep language provider-neutral and runtime-portable.
- Preserve canonical paths and naming conventions.
- Keep plans in `plans/` and skill instances in `skills/`.
- Use relative repository paths for references.
- Keep changes incremental, reviewable, and traceable.

## Decisions locked for this phase
- Source precedence is updated to: spec -> templates -> skills -> prompts -> samples.
- Skills hold full operational logic; prompts become thin dispatch wrappers.
- Prompt wrappers remain supported, but should be concise and non-authoritative.
- Existing extracted skills are retained and expanded; not replaced.
- `allowed-tools` remains optional/experimental and default-off unless explicitly needed.
- Final step includes specification update and version bump to `v1.3.0`.

## Baseline (before migration)
- Prompt surface area is large (`prompts/*.prompt.md` total lines currently exceeds skill instruction lines by a wide margin).
- Existing extracted skills are concise but still reference prompts as primary workflow detail.
- Validation prompt/report scaffolding is repeated across multiple prompt files.

## Quality gate contract (blocking)
All migration steps are blocked unless these quality gates are satisfied.

### Gate 1: 1:1 quality-rule parity map
- Every enforceable quality gate currently defined in prompt workflows must be mapped to one canonical skill location (`SKILL.md` or skill-local `references/*`).
- Mapping format must be explicit and reviewable:
  - `prompt_rule_id`
  - `prompt_source_path`
  - `skill_target_path`
  - `status` (`unmapped`, `mapped`, `verified`)
- Any `unmapped` required gate blocks progression to wrapper conversion.

### Gate 2: dual-path parity validation on golden fixtures
- For each migrated workflow, run old prompt path and new skill path against the same fixture set and compare outcomes.
- Golden fixtures (minimum required):
  - `projects/ai_context_kit_project.instructions.md`
  - `usercontexts/sample_usercontext.instructions.md`
  - `AGENTS.md`
- Required parity checks:
  - Overall status parity (`PASS` / `PASS WITH WARNINGS` / `FAIL`)
  - Required section/field detection parity
  - Critical issue parity (no missing criticals in skill path)
  - Score delta threshold: absolute difference <= 2 points
- Any failed parity check blocks migration for that workflow.

### Gate 3: report schema parity
- Validation report schema produced by skills must include all required sections currently expected by prompt validators.
- Missing required report sections are blocking defects.

### Gate 4: wrapper thinness enforcement
- Prompt wrappers must remain concise and non-authoritative.
- A wrapper must not reintroduce full checklists, full scoring rubrics, or long duplicated workflow phases already canonicalized in skills.
- Any prompt that drifts back to authoritative logic fails this gate.

### Gate 5: release/merge blocker conditions
- A migration PR is not mergeable if any of the following are true:
  - required parity map entries remain `unmapped` or `unverified`
  - any migrated workflow fails dual-path parity checks
  - any touched skill validation report is `FAIL`
  - any wrapper prompt violates thinness enforcement

## Commit plan

### Step 0 (pre-commit) - Create dedicated implementation branch
Create a dedicated branch from the currently checked-out base branch.

Requirements:
- Branch name must use `codex/` prefix.
- Recommended name: `codex/adopt-skill-first-workflow-authority`.

Validation:
- `git branch --show-current` returns the new `codex/...` branch before Commit 1.

---

### Commit 1 - Plan + migration inventory
Add:
- `plans/adopt-skill-first-workflow-authority.prompt.md` (this plan, `status: open`)
- `plans/skill-first-migration-matrix.md`
- `plans/skill-first-quality-gate-map.md`

Matrix requirements:
- One row per workflow (`create-*`, `validate-*`, governance workflows, and skill workflows).
- Columns:
  - canonical skill path
  - current authoritative source
  - target authoritative source
  - prompt wrapper path
  - migration status (`planned`, `migrated`, `validated`)
  - duplication risk notes

Validation:
- Every prompt workflow maps to one canonical skill.
- No unmapped authoritative prompt remains.

Quality gate requirements:
- `plans/skill-first-quality-gate-map.md` contains a complete list of required prompt-era quality rules for all in-scope workflows.
- Initial status values are populated (`unmapped`/`mapped`) with no missing rule rows.
- Use `plans/skill-first-quality-gate-map.md` starter structure to keep rule mapping format consistent.

---

### Commit 2 - Governance precedence flip
Update:
- `AGENTS.md`
- `README.md`
- `skills/README.md`

Required updates:
- Precedence explicitly places `skills/` above `prompts/` for workflow behavior.
- README "Agent Skills" section states skill-first operating model.
- Prompt files are described as compatibility wrappers, not canonical workflow engines.
- Drift-control rule explicitly includes wrapper discipline (prompts must not reintroduce heavy workflow logic).

Validation:
- Internal links resolve.
- Guidance remains deterministic and provider-neutral.

---

### Commit 3 - Expand generation skills to become self-sufficient
Update:
- `skills/create-usercontext-instructions/SKILL.md`
- `skills/create-project-instructions/SKILL.md`
- `skills/create-agents-md/SKILL.md`
- Skill-local `references/*` for each generation skill

Required content migration:
- Discovery phase questions
- Generation rules
- Output-format constraints
- Validation checklist logic

Validation:
- Each generation skill is executable without reading prompt internals.
- Prompt references become secondary traceability only.

Quality gate requirements:
- All generation-workflow quality rules are marked `mapped` in `plans/skill-first-quality-gate-map.md`.
- No generation rule remains `unmapped`.

---

### Commit 4 - Expand validation skills and factor shared validator logic
Add/update:
- `skills/validate-usercontext-instructions/SKILL.md`
- `skills/validate-project-instructions/SKILL.md`
- `skills/validate-agents-md/SKILL.md`
- Skill-local `references/*` holding detailed phase checks, report templates, and scoring rules

Optional consolidation (preferred if duplication remains high):
- Introduce a shared validator skill or shared validator reference pattern for common report scaffolding.

Validation:
- Validation skills contain full deterministic report-generation guidance.
- Repeated boilerplate across validators is reduced and centrally maintained.

Quality gate requirements:
- Validation report schema parity is documented and verified for each validator workflow.
- Scoring and severity classification rules from prompt workflows are fully mapped and marked `mapped`.

---

### Commit 5 - Extract missing skill workflows currently prompt-only
Add:
- `skills/create-skill/SKILL.md`
- `skills/create-skill/references/source-mapping.md`
- `skills/validate-skill/SKILL.md`
- `skills/validate-skill/references/source-mapping.md`

Source inputs:
- `prompts/create-skill.prompt.md`
- `prompts/validate-skill.prompt.md`
- `templates/skill_template/SKILL.md`

Validation:
- New skill folders pass naming/frontmatter parity checks.
- Workflow authority for skill authoring/validation no longer depends on prompt internals.

---

### Commit 6 - Convert prompts into thin compatibility wrappers
Update all prompt workflows:
- `prompts/create-usercontext-instructions.prompt.md`
- `prompts/create-project-instructions.prompt.md`
- `prompts/create-agents-md.prompt.md`
- `prompts/validate-usercontext-instructions.prompt.md`
- `prompts/validate-project-instructions.prompt.md`
- `prompts/validate-agents-md.prompt.md`
- `prompts/create-skill.prompt.md`
- `prompts/validate-skill.prompt.md`

Wrapper requirements:
- Keep mission, minimal input contract, and output intent.
- Delegate detailed operational logic to canonical skill path.
- Avoid duplicating large checklists/rubrics already in skills.
- Keep wrappers concise and stable.

Validation:
- Prompt wrappers preserve user-facing compatibility.
- Canonical logic resides in skills/references, not prompts.

Quality gate requirements:
- Wrapper thinness gate passes for all prompt files.
- Any prompt retaining authoritative-quality logic must be refactored before commit completion.

---

### Commit 7 - Revalidate skills and refresh migration tracking
Update:
- `skills/*/SKILL.validation.md` for all touched/new skills
- `plans/skill-first-migration-matrix.md`
- `plans/skill-extraction-matrix.md` (if authority/status columns are impacted)
- `plans/skill-first-quality-gate-map.md`
- `plans/skill-first-parity-report.md`

Validation:
- All touched skills are PASS or PASS WITH WARNINGS.
- Migration matrix shows no remaining prompt-authoritative workflows.

Quality gate requirements:
- `plans/skill-first-parity-report.md` includes dual-path outcomes for each migrated workflow and each required fixture.
- For every migrated workflow:
  - status parity holds
  - required section/field parity holds
  - critical issue parity holds
  - score delta <= 2
- Corresponding quality-rule rows in `plans/skill-first-quality-gate-map.md` are moved to `verified`.
- Use `plans/skill-first-parity-report.md` starter structure to keep parity evidence consistent and reviewable.

---

### Commit 8 - Final step: update specification to v1.3.0 and close phase
Update:
- `specs/context_aware_ai_session_spec.md`
- `AGENTS.md`
- `README.md`
- this plan file frontmatter

Required spec updates:
- Bump spec version from `v1.2.0` to `v1.3.0`.
- Update spec metadata dates (`last_updated`) and in-document version labels.
- Add/adjust normative language to reflect skill-first workflow authority and prompt-wrapper role.
- Ensure terminology remains provider-neutral and aligned with repository governance.

Required closure updates:
- Set this plan frontmatter to:
  - `status: executed`
  - `executed_at: YYYY-MM-DD`
  - `execution_ref: <branch|commit|PR|tag>`

Validation:
- Spec and docs are aligned on `v1.3.0`.
- `./plans/plan-status.sh` lists this plan under `EXECUTED`.

## Definition of done
- Skills are the documented authoritative operational layer for workflow behavior.
- Prompts are concise wrappers and no longer the primary source of workflow detail.
- Duplicate checklists/rubrics/report templates are centralized in skills (or shared skill references).
- Skill authoring and skill validation workflows also have canonical skills.
- README + AGENTS + skills index all reflect the skill-first model consistently.
- All touched skills include updated validation reports.
- `specs/context_aware_ai_session_spec.md` is updated to `v1.3.0` with skill-first authority language.
- All required prompt-era quality rules are mapped and `verified` in `plans/skill-first-quality-gate-map.md`.
- `plans/skill-first-parity-report.md` shows dual-path parity passing for all migrated workflows.

## Sanity checks after each commit
- No provider-specific lock-in wording.
- No canonical path instability.
- Relative links remain valid.
- No unrelated files modified.
- Wrapper prompts stay concise and non-authoritative.

## Success metrics
- Prompt line count is materially reduced from baseline.
- Skill-local references increase in coverage and become the canonical place for detailed workflow logic.
- Cross-prompt duplication of validator/report scaffolding is measurably reduced.
- Quality parity metrics are stable:
  - 0 missing critical issues in skill path compared to prompt baseline
  - 0 schema regressions in validation reports
  - score delta <= 2 for all migrated workflows
