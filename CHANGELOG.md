# Changelog

All notable changes to AI Context Kit are documented here. This changelog helps you decide what to pull into your own instance when the template is updated.

## How to use this changelog

When a new version is released:
1. Check what changed in the version entry below
2. Copy the files listed under **Safe to update** from the template into your instance
3. Never overwrite files listed under **Protect** — those are your personal artifacts

---

## [Unreleased]

---

## [1.4.0] - 2026-05-08

### Added
- **Spec §4.4 Cross-Session Persistence** — normative rules for checkpoint artifacts: proposal rules, required schema (project, role, phase, output_style, tone, interaction_mode, open_tasks, key_decisions, active_files, last_updated), and restore/conflict rules
- **Spec §4.5 Context Compression** — normative rules for managing context window pressure: proposal rules, required compression checkpoint contents, and reversibility requirements
- `docs/spec-rationale.md`: new "Cross-Session Persistence and Context Compression" section with example checkpoint file, conflict resolution dialog, and annotated compression proposal dialog

### Changed
- Spec version bumped from 1.3.1 → 1.4.0 across spec, templates, skills, and all stamped artifacts
- Session Persistence and Context Compression promoted from "Future Enhancements" (rationale doc) to normative spec sections

### Safe to update from template
- `specs/context_aware_ai_session_spec.md`
- `docs/spec-rationale.md`
- `templates/usercontext_template.instructions.md`
- `templates/AGENTS_template.md`
- `templates/skill_template/SKILL.md`
- `skills/` (all skill folders)
- `prompts/` (all prompt files)
- `README.md`
- `CHANGELOG.md`

### Protect (never overwrite)
- Your personal `*_usercontext.instructions.md`
- Your project `AGENTS.md`
- Any custom skills you have created under `skills/`

---

## [1.3.1] - 2026-05-07

### Added
- `CHANGELOG.md` to track changes and simplify instance update workflow
- "See It In Action" before/after example section in README
- "Why This Over Alternatives?" comparison section in README
- Platform limitations column in the context loading table
- `## How to Invoke` section in all skill `SKILL.md` files with per-platform guidance
- Validation scope disclaimer in `AGENTS.validation.md`, `usercontexts/sample_usercontext.validation.md`, and README
- `spec_version` stamping in templates and enforced in create/validate skill workflows
- `docs/spec-rationale.md` companion document (rationale, examples, scenarios)
- Realistic illustrative sample user context (Jordan Kim persona)

### Changed
- "Determinism" principle renamed to "Reduced variance" throughout spec and README
- Validate skill Purpose/Constraints clarified to "structured checks based on a deterministic scoring rubric"
- Platform table: Copilot row updated to distinguish coding agent (AGENTS.md ✅) from Code Review (AGENTS.md ❌)
- Spec trimmed to normative rules only (426 lines); rationale and examples moved to `docs/spec-rationale.md`
- References auto-loading claim scoped to repo-aware environments only

### Safe to update from template
- `specs/context_aware_ai_session_spec.md`
- `templates/usercontext_template.instructions.md`
- `templates/AGENTS_template.md`
- `templates/skill_template/SKILL.md`
- `skills/` (all skill folders)
- `prompts/` (all prompt files)
- `README.md`
- `CHANGELOG.md`

### Protect (never overwrite)
- Your personal `*_usercontext.instructions.md`
- Your project `AGENTS.md`
- Any custom skills you have created under `skills/`

---

## [1.3.0] - 2025-12-23

### Added
- Initial skill ecosystem: create and validate workflows for user context, project instructions, AGENTS.md, and skills
- Repository drift-control skill
- Canonical templates for user context, AGENTS.md, and skill artifacts
- Session specification v1.3.0

### Safe to update from template
- All files except personal artifacts listed below

### Protect (never overwrite)
- Your personal `*_usercontext.instructions.md`
- Your project `AGENTS.md`
