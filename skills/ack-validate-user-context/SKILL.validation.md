# Skill Validation Report

**File:** skills/ack-validate-user-context/SKILL.md
**Skill:** ack-validate-user-context
**Validated:** 2026-11-18 (re-run for OpenSpec change `user-context-score-sum`)
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
- `name` (25 characters) matches the folder and meets the format rules.
- `description` (115 characters): a one-line summary for the person who runs the skill (user-invoked).
- `version` is `1.2.0`; `metadata` values are strings.
- `metadata.invocation` is `"user"`, paired with `disable-model-invocation: true`.
- No user-invoked skill is started by this skill.

---

## Phase 3: Instruction Quality And Completeness
**Score:** 25/25 · **Status:** PASS

### Findings:
- All seven required body sections are present, in order; phases, scoring and report contract live in references.
- Every workflow step ends on a completion criterion; the no-op constraint "Keep recommendations implementation-ready and non-ambiguous" was removed.
- `references/scoring.md` lists critical findings and a fixed cost per warning (2 points per missing section, otherwise 1 to 3 by extent), so a re-run gives the same score. Every phase states its score, and the phase scores must add up to the total, as in the other two validators.

---

## Phase 4: Resource References And Safety
**Score:** 15/15 · **Status:** PASS

### Findings:
- All three references resolve; no deep or circular reference chains.
- The skill writes only the report and keeps private details out of findings.

---

## Phase 5: Neutrality And Portability
**Score:** 15/15 · **Status:** PASS

### Findings:
- Provider-neutral.

---

## Summary

### Strengths:
- Checks the `spec_version` stamp against `2.0.0`.
- Deterministic scoring with listed critical findings, and a phase sum that explains the total.

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
1. Re-validate when `templates/usercontext_template.instructions.md` changes.
