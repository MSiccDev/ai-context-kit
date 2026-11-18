# Skill Validation Report

**File:** skills/ack-create-user-context/SKILL.md
**Skill:** ack-create-user-context
**Validated:** 2026-11-18 (rollout step 5 re-run, with the writing checks)
**Validator:** `skills/ack-validate-skill`

---

## Overall Status: PASS

**Compliance Score:** 99/100 (Phase 1 20 + Phase 2 25 + Phase 3 24 + Phase 4 15 + Phase 5 15)

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
- `name` (23 characters) matches the folder and meets the format rules.
- `description` (113 characters): a one-line summary for the person who runs the skill (user-invoked).
- `version` is `1.1.0`; `metadata` values are strings.
- `metadata.invocation` is `"user"`, paired with `disable-model-invocation: true`.
- No user-invoked skill is started by this skill.

---

## Phase 3: Instruction Quality And Completeness
**Score:** 24/25 · **Status:** PASS

### Findings:
- All seven required body sections are present, in order; detail lives in five references.
- Every workflow step ends on a completion criterion (reworked in this re-run); no no-ops or sediment found.
- Warning (1 point): provider neutrality is stated in Output Expectations, Constraints And Safety and `references/output-schema.md`. Keep it in `references/output-schema.md`.

---

## Phase 4: Resource References And Safety
**Score:** 15/15 · **Status:** PASS

### Findings:
- All references and both repository links resolve; no deep or circular reference chains.
- Privacy handling is explicit: placeholders when the user asks for them.

---

## Phase 5: Neutrality And Portability
**Score:** 15/15 · **Status:** PASS

### Findings:
- Provider-neutral output.

---

## Summary

### Strengths:
- Privacy handling is explicit and checked.
- The 15 required sections match the user-context template.

### Critical Issues (Must Fix):
- None.

### Warnings (Should Fix):
- Provider neutrality has three homes (Phase 3).

### Enhancements (Optional):
- Add examples for different privacy levels.

---

## Recommendations

### Immediate Actions:
1. Drop the neutrality lines from Output Expectations and Constraints And Safety.

### Suggested Improvements:
1. Re-validate when `templates/usercontext_template.instructions.md` changes.
