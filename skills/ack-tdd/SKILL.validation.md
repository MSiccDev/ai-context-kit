# Skill Validation Report

**File:** skills/ack-tdd/SKILL.md
**Skill:** ack-tdd
**Validated:** 2026-11-18
**Validator:** `skills/ack-validate-skill`

---

## Overall Status: PASS

**Compliance Score:** 100/100 (Phase 1 20 + Phase 2 25 + Phase 3 25 + Phase 4 15 + Phase 5 15)

---

## Phase 1: Presence, Structure, And Frontmatter
**Score:** 20/20 · **Status:** PASS

### Findings:
- `SKILL.md` exists with valid YAML frontmatter; required and optional fields are recognized.

---

## Phase 2: Field Constraints And Naming Parity
**Score:** 25/25 · **Status:** PASS

### Findings:
- `name` matches the folder and meets the format rules; `description` states what the skill does and when to use it.
- `metadata.invocation` is `"model"`, with no `disable-model-invocation`, so the assistant may start it.
- No user-invoked skill is started by this skill.

---

## Phase 3: Instruction Quality And Completeness
**Score:** 25/25 · **Status:** PASS

### Findings:
- All seven required body sections are present, in order; detail lives in `references/`.
- Seams, the red-green-refactor cycle with done conditions, vertical slices and five named anti-patterns are explicit.

---

## Phase 4: Resource References And Safety
**Score:** 15/15 · **Status:** PASS

### Findings:
- Every reference resolves. It never commits, and adds no test dependencies without an explicit decision.

---

## Phase 5: Neutrality And Portability
**Score:** 15/15 · **Status:** PASS

### Findings:
- Stack-neutral: it names no language, framework or test runner.
- Attribution: `metadata.credits` names mattpocock/skills, the body names the origin, and `THIRD_PARTY_NOTICES.md` lists the skill.

---

## Summary

### Strengths:
- No code before a failing test, and no test before the seams are agreed.

### Critical Issues (Must Fix):
- None.

### Warnings (Should Fix):
- None.

### Enhancements (Optional):
- None.

---

## Recommendations

### Immediate Actions:
1. None.

### Suggested Improvements:
1. Re-validate after the skill's references or ADR-006, ADR-007 or ADR-012 change.
