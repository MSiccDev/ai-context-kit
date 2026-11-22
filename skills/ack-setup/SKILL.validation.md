# Skill Validation Report

**File:** skills/ack-setup/SKILL.md
**Skill:** ack-setup
**Validated:** 2026-11-21 (first run, OpenSpec change `installer-setup`)
**Validator:** `skills/ack-validate-skill`

---

## Overall Status: PASS

**Compliance Score:** 99/100 (Phase 1 20 + Phase 2 25 + Phase 3 24 + Phase 4 15 + Phase 5 15)

---

## Phase 1: Presence, Structure, And Frontmatter
**Score:** 20/20 · **Status:** PASS

### Findings:
- `SKILL.md` exists with valid YAML frontmatter; required and optional fields are recognized.

---

## Phase 2: Field Constraints And Naming Parity
**Score:** 25/25 · **Status:** PASS

### Findings:
- `name` matches the folder and meets the format rules; `version` is `1.0.0`.
- Description as pointer: a one-line summary for the person who runs the skill (user-invoked).
- `metadata.invocation` is `"user"`, paired with `disable-model-invocation: true`.
- The workflow starts only the model-invoked `ack-openspec-check`; every user-invoked skill is named for the user to run.
- Attribution: `metadata.credits` names mattpocock/skills `setup-matt-pocock-skills`, the body names the origin once, and `THIRD_PARTY_NOTICES.md` lists the skill.

---

## Phase 3: Instruction Quality And Completeness
**Score:** 24/25 · **Status:** PASS

### Findings:
- All seven required body sections are present, in order; the per-area sources, findings and recommendations live in `references/areas.md`.
- Scope boundaries are explicit: installing the kit belongs to `install.md`, writing `AGENTS.md` to `ack-create-agents-md`.
- Writing checks: every workflow step ends on a completion criterion; no no-ops, sediment or duplicated rules found. The read-only rule has one home in Constraints And Safety; the Output Expectations line is its acceptance check.
- Minor: `references/areas.md` names `ack-openspec-check`'s six statuses; renaming a status there would leave this table stale. One point deducted.

---

## Phase 4: Resource References And Safety
**Score:** 15/15 · **Status:** PASS

### Findings:
- `references/areas.md` resolves; no deep or circular reference chains.
- The skill writes no files and runs only read-only commands (`git remote -v`, `ai-context-kit doctor`, `openspec list --json`); installs and upgrades are recommendations for the user.
- The user context file stays outside the repository.

---

## Phase 5: Neutrality And Portability
**Score:** 15/15 · **Status:** PASS

### Findings:
- Provider-neutral: tool names appear only as examples of invocation spelling, which comes from the manifest's `tools`. Makes no claims about where any tool loads user-level instructions.

---

## Summary

### Strengths:
- One entry point after the installer, ordered so that OpenSpec is set up before `AGENTS.md` describes it.
- Writes nothing, so every artifact keeps one writer.

### Critical Issues (Must Fix):
- None.

### Warnings (Should Fix):
- None.

### Enhancements (Optional):
- If `ack-openspec-check` renames a status, update the OpenSpec table in `references/areas.md`.

---

## Recommendations

### Immediate Actions:
1. None.

### Suggested Improvements:
1. Re-validate when `ack-openspec-check`'s statuses or the installer's commands change.
