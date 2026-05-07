# Changelog

All notable changes to AI Context Kit are documented here. This changelog helps you decide what to pull into your own instance when the template is updated.

## How to use this changelog

When a new version is released:
1. Check what changed in the version entry below
2. Copy the files listed under **Safe to update** from the template into your instance
3. Never overwrite files listed under **Protect** — those are your personal artifacts

---

## [Unreleased]

### Added
- `CHANGELOG.md` to track changes and simplify instance update workflow
- "See It In Action" before/after example section in README
- "Why This Over Alternatives?" comparison section in README
- Platform limitations column in the context loading table
- `## How to Invoke` section in all skill `SKILL.md` files with per-platform guidance
- Validation scope disclaimer in `AGENTS.validation.md`, `usercontexts/sample_usercontext.validation.md`, and README

### Changed
- "Determinism" principle renamed to "Reduced variance" throughout spec and README — LLMs are probabilistic; the framework targets reduced variance, not guaranteed identical outputs
- Validate skill Purpose/Constraints: "deterministic reports/checks" clarified to "structured checks based on a deterministic scoring rubric"
- Platform table: Copilot row updated to distinguish coding agent (AGENTS.md ✅) from Code Review (AGENTS.md ❌)
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

## [1.3.1] - 2026-02-20

### Changed
- Migrated project-context model fully to `AGENTS.md`; removed legacy project-context instruction files
- Spec v1.3.1: added repository-level governance alignment for AGENTS precedence, command surface, and drift-control contracts
- Command namespace pattern updated from `/tag.*` to `/namespace.*` for clarity
- `AGENTS.md` is now the sole project-level operational entrypoint
- All skills updated to reflect AGENTS-only authority model

### Safe to update from template
- `specs/context_aware_ai_session_spec.md`
- `templates/usercontext_template.instructions.md`
- `templates/AGENTS_template.md`
- `templates/skill_template/SKILL.md`
- `skills/` (all skill folders)
- `prompts/` (all prompt files)
- `README.md`

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
