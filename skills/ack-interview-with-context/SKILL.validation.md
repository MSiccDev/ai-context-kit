# Skill Validation Report

**File:** skills/ack-interview-with-context/SKILL.md
**Skill:** ack-interview-with-context
**Validated:** 2026-11-18 (rollout step 5 re-run, with the writing checks)
**Validator:** `skills/ack-validate-skill`

---

## Overall Status: PASS

**Compliance Score:** 99/100 (Phase 1 20 + Phase 2 25 + Phase 3 25 + Phase 4 14 + Phase 5 15)

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
- `metadata.invocation` is `"user"`, paired with `disable-model-invocation: true`.
- No user-invoked skill is started by this skill.
- Description as pointer: a one-line summary for the person who runs the skill (user-invoked).

---

## Phase 3: Instruction Quality And Completeness
**Score:** 25/25 · **Status:** PASS

### Findings:
- All seven required body sections are present, in order; detail lives in `references/`.
- The glossary location (arc42 section 12 or `CONTEXT.md`), entry shape, when to challenge a term and the three-part ADR test are explicit.
- Writing checks: every workflow step ends on a completion criterion; no no-ops, sediment or duplicated rules found.

---

## Phase 4: Resource References And Safety
**Score:** 14/15 · **Status:** PASS

### Findings:
- References resolve. One point deducted: the skill reads `../ack-interview/references/method.md`, so it depends on `ack-interview` being installed alongside it. Every glossary or ADR write needs approval first.

---

## Phase 5: Neutrality And Portability
**Score:** 15/15 · **Status:** PASS

### Findings:
- Provider-neutral; uses the project's arc42 section 12 skill only where one is available.
- Attribution: `metadata.credits` names mattpocock/skills, the body names the origin, and `THIRD_PARTY_NOTICES.md` lists the skill.

---

## Summary

### Strengths:
- Settles decisions and language together, and keeps ADRs to decisions that pass the three-part test.

### Critical Issues (Must Fix):
- None.

### Warnings (Should Fix):
- None.

### Enhancements (Optional):
- Copy the method into this skill's own references if it must ever be installed without `ack-interview`.

---

## Recommendations

### Immediate Actions:
1. None.

### Suggested Improvements:
1. Re-validate after the skill's references or ADR-006, ADR-007 or ADR-012 change.
