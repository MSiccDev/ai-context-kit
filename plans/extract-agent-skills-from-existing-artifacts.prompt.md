---
description: "Step-by-step (committable) plan to extract reusable skills from existing prompts and instruction artifacts after foundation adoption."
status: open
---

# Task: Extract agent skills from existing artifacts

You are Codex in VS Code working in the `ai-context-kit` repository.

## Goal
Systematically extract reusable skill definitions from existing repository artifacts and migrate them into `skills/` as validated, maintainable skill folders.

## Scope
### In scope
- Analyze current artifacts in:
  - `prompts/`
  - `projects/`
  - `usercontexts/`
- Identify repeated workflows and convert them into candidate skills.
- Create skill folders with `SKILL.md` files aligned to `templates/skill_template/SKILL.md`.
- Validate extracted skills with `prompts/validate-skill.prompt.md`.

### Out of scope
- Changing normative session-model behavior in `specs/`.
- Introducing provider-specific runtime behaviors.

## Constraints
- Preserve source meaning while improving reusability.
- Keep skill scopes narrow and composable.
- Use provider-neutral language.
- Use relative skill-local references only.
- Keep extraction incremental and reviewable.

## Candidate extraction inputs
- Create workflows:
  - `prompts/create-usercontext-instructions.prompt.md`
  - `prompts/create-project-instructions.prompt.md`
  - `prompts/create-agents-md.prompt.md`
- Validate workflows:
  - `prompts/validate-usercontext-instructions.prompt.md`
  - `prompts/validate-project-instructions.prompt.md`
  - `prompts/validate-agents-md.prompt.md`
- Operational examples:
  - `projects/ai_context_kit_project.instructions.md`
  - `usercontexts/sample_usercontext.instructions.md`

## Commit plan

### Commit 1 — Inventory and classification
- Build a skill-candidate matrix mapping artifacts to reusable capabilities.
- Group by intent:
  - generation
  - validation
  - governance/drift-control
- Define extraction priority order.

### Commit 2 — Extract first skill set
- Implement highest-value skill(s) from the matrix.
- Keep each extracted skill focused on one clear capability.

### Commit 3 — Extract remaining priority skills
- Continue extraction in small units.
- Ensure naming parity (`skills/<name>/SKILL.md`).

### Commit 4 — Validate and tighten
- Validate each extracted skill with `prompts/validate-skill.prompt.md`.
- Fix failures/warnings.
- Remove duplicated guidance where extraction replaced it.

### Commit 5 — Documentation alignment
- Update `README.md` and `AGENTS.md` references to include extracted skills.
- Ensure drift-control notes cover newly added skill artifacts.

### Commit 6 — Finalize extraction phase
- Confirm all extracted skills pass validation.
- Mark this plan executed with:
  - `status: executed`
  - `executed_at: YYYY-MM-DD`
  - `execution_ref: <branch|commit|PR|tag>`

## Definition of done
- A prioritized subset of repository workflows has been converted into validated skills.
- Extracted skills are provider-neutral and aligned with canonical template/prompt rules.
- Documentation references are updated and accurate.
- Extraction plan is marked executed with traceable execution reference.
