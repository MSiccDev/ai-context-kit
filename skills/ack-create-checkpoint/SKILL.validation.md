# Skill Validation Report

**File:** skills/ack-create-checkpoint/SKILL.md
**Skill:** ack-create-checkpoint
**Validated:** 2026-11-18 (rollout step 5 re-run, with the writing checks)
**Validator:** `skills/ack-validate-skill`

---

## Overall Status: PASS

**Compliance Score:** 98/100 (Phase 1 20 + Phase 2 25 + Phase 3 23 + Phase 4 15 + Phase 5 15)

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
- `name` (21 characters) matches the folder and meets the format rules.
- `description` (204 characters): says what the skill does, then lists its triggers for the model (model-invoked).
- `version` is `1.0.0`; `metadata` values are strings.
- `metadata.invocation` is `"model"`, and `disable-model-invocation` is absent.
- No user-invoked skill is started by this skill.

---

## Phase 3: Instruction Quality And Completeness
**Score:** 23/25 · **Status:** PASS

### Findings:
- All seven required body sections are present, in order; the schema lives in `references/checkpoint-schema.md`.
- Every workflow step ends on a completion criterion; no no-ops or sediment found.
- Warning (2 points): the approval rule appears in five places in the body (When To Use, workflow steps 6 and 7, Output Expectations, Constraints And Safety). Keep it in step 7 and in Constraints And Safety.

---

## Phase 4: Resource References And Safety
**Score:** 15/15 · **Status:** PASS

### Findings:
- The one reference resolves; no deep or circular reference chains.
- Writes only after explicit approval, and never includes credentials or private client content.

---

## Phase 5: Neutrality And Portability
**Score:** 15/15 · **Status:** PASS

### Findings:
- Provider-neutral; follows spec section 4.4.

---

## Summary

### Strengths:
- A strict approval gate before any write.
- Field definitions live in one reference.

### Critical Issues (Must Fix):
- None.

### Warnings (Should Fix):
- The approval rule is repeated in five places (Phase 3).

### Enhancements (Optional):
- The description ends on a prohibition ("Do not use mid-session or without user approval"); a pointer works better with the positive trigger only.
- Suggest adding the checkpoint path to `.gitignore` when the file holds private context.

---

## Recommendations

### Immediate Actions:
1. Remove the approval rule from When To Use, step 6 and Output Expectations; keep step 7 and Constraints And Safety.

### Suggested Improvements:
1. Re-validate after spec section 4.4.2 schema changes.
