# Skill Validation Report

**File:** skills/ack-loop-05-commit/SKILL.md
**Skill:** ack-loop-05-commit
**Validated:** 2026-11-17
**Validator:** `skills/ack-validate-skill`

---

## Overall Status: PASS

**Compliance Score:** 98/100 (Phase 1 20 + Phase 2 25 + Phase 3 24 + Phase 4 15 + Phase 5 14)

---

## Phase 1: Presence, Structure, And Frontmatter
**Score:** 20/20 · **Status:** PASS

### Findings:
- `SKILL.md` exists with valid YAML frontmatter.
- Required fields `name` and `description` are present; optional `version`, `allowed-tools` and `metadata` are recognized.

---

## Phase 2: Field Constraints And Naming Parity
**Score:** 25/25 · **Status:** PASS

### Findings:
- `name` matches the folder and meets the format rules.
- `description` states what the step does and when to use it.
- `metadata` values are strings (`workflow_type`, `loop_step`).

---

## Phase 3: Instruction Quality And Completeness
**Score:** 24/25 · **Status:** PASS

### Findings:
- All seven required body sections are present, in order, and name the step's place in the loop.
- The full procedure lives in `references/procedure.md`, moved unchanged from the former loop prompt (progressive disclosure).
- Warning: the skill does not yet declare that only the user may invoke it, so an agent could select it on its own. The invocation-field change in rollout step 4 adds this. One point deducted.

---

## Phase 4: Resource References And Safety
**Score:** 15/15 · **Status:** PASS

### Findings:
- Every reference resolves; no deep or circular reference chains.
- No git command runs without explicit go-ahead; the archive is presented for a separate go-ahead.

---

## Phase 5: Neutrality And Portability
**Score:** 14/15 · **Status:** PASS

### Findings:
- Wording is provider-neutral.
- Uses git and `openspec archive`. One point deducted for the hard CLI dependency.

---

## Summary

### Strengths:
- Puts every commit and the archive behind an explicit go-ahead, with door type and blast radius in the summary.

### Critical Issues (Must Fix):
- None.

### Warnings (Should Fix):
- Declare user-only invocation once the invocation field exists.

### Enhancements (Optional):
- None.

---

## Recommendations

### Immediate Actions:
1. None.

### Suggested Improvements:
1. Re-validate after the invocation field is added, and after spec section 11 changes.
