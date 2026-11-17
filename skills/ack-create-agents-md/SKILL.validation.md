# Skill Validation Report

**File:** skills/ack-create-agents-md/SKILL.md
**Skill:** ack-create-agents-md
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
- `name` (20 characters) matches the folder and meets the format rules.
- `description` (213 characters) states what the skill does and when to use it.
- `version` is `2.0.0`; `metadata` values are strings.

---

## Phase 3: Instruction Quality And Completeness
**Score:** 24/25 · **Status:** PASS

### Findings:
- Purpose, mode selection, inputs, workflow, outputs, resources and constraints are explicit.
- Root and nested modes have separate schemas and checklists; scope boundaries name the sibling skills to use instead.
- Detail lives in references (progressive disclosure).
- Minor: the question style is described inline in `references/discovery-phases.md`; once `ack-interview` exists, discovery should call it instead (ADR-012).

---

## Phase 4: Resource References And Safety
**Score:** 15/15 · **Status:** PASS

### Findings:
- All seven references and both repository links resolve; no deep or circular reference chains.
- Risky operations are gated: no `openspec init` and no overwrite of an existing `AGENTS.md` without explicit approval.

---

## Phase 5: Neutrality And Portability
**Score:** 14/15 · **Status:** PASS

### Findings:
- Wording is provider-neutral.
- Discovery phase 6 uses the OpenSpec CLI (hence `Bash` in `allowed-tools`). The spec requires OpenSpec, and the skill falls back to reading `openspec/` when the CLI is unavailable, so this is not runtime lock-in. One point is deducted because the fallback is less precise than the CLI.

---

## Summary

### Strengths:
- One skill for both halves of `AGENTS.md`, aligned to the template section by section.
- Writes the `Spec-Driven Change Workflow` section, which neither predecessor did.
- Defines nested files for the first time.

### Critical Issues (Must Fix):
- None.

### Warnings (Should Fix):
- None.

### Enhancements (Optional):
- Replace the inline question style with a call to `ack-interview` once it exists.

---

## Recommendations

### Immediate Actions:
1. None.

### Suggested Improvements:
1. Re-validate after `templates/AGENTS_template.md` or spec section 11 changes.
