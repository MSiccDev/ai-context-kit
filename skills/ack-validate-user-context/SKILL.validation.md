# Skill Validation Report

**File:** skills/ack-validate-user-context/SKILL.md
**Skill:** ack-validate-user-context
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
- `name` (25 characters) matches the folder and meets the format rules.
- `description` (115 characters): a one-line summary for the person who runs the skill (user-invoked).
- `version` is `1.1.0`; `metadata` values are strings.
- `metadata.invocation` is `"user"`, paired with `disable-model-invocation: true`.
- No user-invoked skill is started by this skill.

---

## Phase 3: Instruction Quality And Completeness
**Score:** 23/25 · **Status:** PASS

### Findings:
- All seven required body sections are present, in order; phases, scoring and report contract live in references.
- Every workflow step ends on a completion criterion (reworked in this re-run); the no-op constraint "Keep recommendations implementation-ready and non-ambiguous" was removed.
- Warning (2 points): `references/scoring.md` gives points per phase but no rule for how much each failed check costs, so two runs can score the same file differently.

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
- Checks the `spec_version` stamp against `2.0.0-beta.1`.

### Critical Issues (Must Fix):
- None.

### Warnings (Should Fix):
- No fixed cost per failed check (Phase 3).

### Enhancements (Optional):
- Require the phase scores to add up to the total, as the other two validators do.

---

## Recommendations

### Immediate Actions:
1. Add critical findings and a 1 to 3 point cost per warning to `references/scoring.md`, matching `ack-validate-skill`.

### Suggested Improvements:
1. Re-validate when `templates/usercontext_template.instructions.md` changes.
