# Skill Validation Report

**File:** skills/ack-validate-agents-md/SKILL.md
**Skill:** ack-validate-agents-md
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
- `name` (22 characters) matches the folder and meets the format rules.
- `description` (221 characters) states what the skill validates and when to use it.
- `version` is `2.0.0`; `metadata` values are strings.

---

## Phase 3: Instruction Quality And Completeness
**Score:** 24/25 · **Status:** PASS

### Findings:
- Six phases with separate root and nested checks, a point model per mode, explicit critical findings, and the sum rule.
- The report contract lists every section, including how phase 3 ran.
- Minor: within-phase deductions are "in proportion to the weight" of each failed check, so two runs can differ by a point or two inside a phase. Critical findings and phase totals remain deterministic.

---

## Phase 4: Resource References And Safety
**Score:** 15/15 · **Status:** PASS

### Findings:
- All three references and both repository links resolve; no deep or circular reference chains.
- The skill never rewrites the target and runs only the read-only `openspec list --json`.

---

## Phase 5: Neutrality And Portability
**Score:** 14/15 · **Status:** PASS

### Findings:
- Wording is provider-neutral.
- Phase 3 uses the OpenSpec CLI, with a documented fallback to reading `openspec/`, which the report must state. One point is deducted because the fallback is less precise than the CLI.

---

## Summary

### Strengths:
- One rubric for root and nested files, replacing two rubrics that could disagree about the same file.
- Checks the `Spec-Driven Change Workflow` section, which neither predecessor did.
- Requires phase scores to add up to the reported total.

### Critical Issues (Must Fix):
- None.

### Warnings (Should Fix):
- None.

### Enhancements (Optional):
- Give fixed point values to each check within a phase, to remove the remaining scoring variance.

---

## Recommendations

### Immediate Actions:
1. None.

### Suggested Improvements:
1. Re-validate after `templates/AGENTS_template.md` or spec section 11 changes.
