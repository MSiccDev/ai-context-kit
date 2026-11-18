# Skill Validation Report

**File:** skills/ack-validate-skill/SKILL.md
**Skill:** ack-validate-skill
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
- `name` (18 characters) matches the folder and meets the format rules.
- `description` (123 characters): a one-line summary for the person who runs the skill (user-invoked).
- `version` is `1.1.0`; `metadata` values are strings.
- `metadata.invocation` is `"user"`, paired with `disable-model-invocation: true`.
- No user-invoked skill is started by this skill.
- Attribution: `metadata.credits` names mattpocock/skills for the writing checks, the body names the origin, and `THIRD_PARTY_NOTICES.md` lists the skill.

---

## Phase 3: Instruction Quality And Completeness
**Score:** 25/25 · **Status:** PASS

### Findings:
- All seven required body sections are present, in order; phases, scoring, report contract and writing checks live in references.
- Every workflow step ends on a completion criterion; no no-ops or sediment found.
- Scoring is deterministic: critical findings are listed, a warning costs 1 to 3 points by extent, and phase scores must add up to the total.

---

## Phase 4: Resource References And Safety
**Score:** 15/15 · **Status:** PASS

### Findings:
- All four references and the template link resolve; `references/phase-checks.md` names `writing-for-agents.md`, which `SKILL.md` also links directly, so the chain stays one level deep.
- The skill writes only the report.

---

## Phase 5: Neutrality And Portability
**Score:** 15/15 · **Status:** PASS

### Findings:
- Provider-neutral.

---

## Summary

### Strengths:
- New writing checks: description as pointer, a completion criterion per step, no-ops, sediment and duplication, positive instructions.
- Fixed point costs per finding.

### Critical Issues (Must Fix):
- None.

### Warnings (Should Fix):
- None.

### Enhancements (Optional):
- Automate the mechanical checks (frontmatter keys, name parity, section order, reference resolution) as a script.

---

## Recommendations

### Immediate Actions:
1. None.

### Suggested Improvements:
1. Re-validate when the skill template or the invocation rules change.
