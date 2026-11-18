# Skill Validation Report

**File:** skills/ack-create-skill/SKILL.md
**Skill:** ack-create-skill
**Validated:** 2026-11-18 (rollout step 5 re-run, with the writing checks)
**Validator:** `skills/ack-validate-skill`

---

## Overall Status: PASS

**Compliance Score:** 100/100 (Phase 1 20 + Phase 2 25 + Phase 3 25 + Phase 4 15 + Phase 5 15)

---

## Phase 1: Presence, Structure, And Frontmatter
**Score:** 20/20 · **Status:** PASS

### Findings:
- `SKILL.md` exists with valid YAML frontmatter.
- Required fields `name` and `description` are present; every other key is a recognized optional field.

---

## Phase 2: Field Constraints And Naming Parity
**Score:** 25/25 · **Status:** PASS

### Findings:
- `name` (16 characters) matches the folder and meets the format rules.
- `description` (100 characters): a one-line summary for the person who runs the skill (user-invoked).
- `version` is `1.1.0`; `metadata` values are strings.
- `metadata.invocation` is `"user"`, paired with `disable-model-invocation: true`.
- No user-invoked skill is started by this skill.

---

## Phase 3: Instruction Quality And Completeness
**Score:** 25/25 · **Status:** PASS

### Findings:
- All seven required body sections are present, in order; detail lives in six references.
- Every workflow step ends on a completion criterion; no no-ops or sediment found.
- Provider neutrality has one home, `references/safety.md`, which workflow step 4 applies.

---

## Phase 4: Resource References And Safety
**Score:** 15/15 · **Status:** PASS

### Findings:
- All references resolve, including the shared writing checks in `../ack-validate-skill/references/writing-for-agents.md`; no deep or circular reference chains.
- Risky operations need a confirmation gate (`references/safety.md`).

---

## Phase 5: Neutrality And Portability
**Score:** 15/15 · **Status:** PASS

### Findings:
- Provider-neutral; `disable-model-invocation` is documented as a Claude Code extension and Codex sidecars are left to the installer.

---

## Summary

### Strengths:
- The field constraints describe the description as a pointer, matching `ack-validate-skill`.
- Each workflow step names its done condition.

### Critical Issues (Must Fix):
- None.

### Warnings (Should Fix):
- None.

### Enhancements (Optional):
- Add an example skill per workflow type (generation, validation, governance, loop).

---

## Recommendations

### Immediate Actions:
1. None.

### Suggested Improvements:
1. Re-validate when `templates/skill_template/SKILL.md` changes.
