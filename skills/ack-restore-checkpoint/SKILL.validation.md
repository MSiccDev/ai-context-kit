# Skill Validation Report

**File:** skills/ack-restore-checkpoint/SKILL.md
**Skill:** ack-restore-checkpoint
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
- `name` (22 characters) matches the folder and meets the format rules.
- `description` (208 characters): says what the skill does, then lists its triggers for the model (model-invoked).
- `version` is `1.0.0`; `metadata` values are strings.
- `metadata.invocation` is `"model"`, and `disable-model-invocation` is absent.
- No user-invoked skill is started by this skill.

---

## Phase 3: Instruction Quality And Completeness
**Score:** 25/25 · **Status:** PASS

### Findings:
- All seven required body sections are present, in order; the restore rules live in `references/restore-rules.md`.
- Every workflow step ends on a completion criterion; no no-ops or sediment found.
- The confirmation rule appears in workflow steps 6 and 7 and in Constraints And Safety, within the guardrail exception.

---

## Phase 4: Resource References And Safety
**Score:** 15/15 · **Status:** PASS

### Findings:
- The one reference resolves; no deep or circular reference chains.
- `allowed-tools` is `[Read]` only, and no task work starts before the user confirms the restored state.

---

## Phase 5: Neutrality And Portability
**Score:** 15/15 · **Status:** PASS

### Findings:
- Provider-neutral; follows spec section 4.4.3.

---

## Summary

### Strengths:
- Read-only tool scope.
- Instruction files win when the user does not answer a conflict.

### Critical Issues (Must Fix):
- None.

### Warnings (Should Fix):
- None.

### Enhancements (Optional):
- Offer a short summary of resolved conflicts the user can keep.

---

## Recommendations

### Immediate Actions:
1. None.

### Suggested Improvements:
1. Re-validate after spec section 4.4.3 restore rule changes.
