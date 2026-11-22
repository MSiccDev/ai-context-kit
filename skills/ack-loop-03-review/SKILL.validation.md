# Skill Validation Report

**File:** skills/ack-loop-03-review/SKILL.md
**Skill:** ack-loop-03-review
**Validated:** 2026-11-22 (re-run for OpenSpec change `hotfix-2-0-1`, version 1.0.1)
**Validator:** `skills/ack-validate-skill`

---

## Overall Status: PASS

**Compliance Score:** 99/100 (Phase 1 20 + Phase 2 25 + Phase 3 25 + Phase 4 15 + Phase 5 14)

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
- Description as pointer: a one-line summary for the person who runs the skill (user-invoked).

---

## Phase 3: Instruction Quality And Completeness
**Score:** 25/25 · **Status:** PASS

### Findings:
- All seven required body sections are present, in order, and name the step's place in the loop.
- The full procedure lives in `references/procedure.md`, moved unchanged from the former loop prompt (progressive disclosure).
- `metadata.invocation` is `"user"`, with `disable-model-invocation: true` to match, so Claude Code never loads the skill on its own.
- Writing checks: every workflow step ends on a completion criterion; no no-ops, sediment or duplicated rules found.
- New in 1.0.1: the Spec axis's `skip_specs` check no longer reports a behavior change as a finding when the project's AGENTS.md sets `skip_specs: true` for every change; it checks the behavior against the normative spec that AGENTS.md names (found in review of the 2.0.0 release).

---

## Phase 4: Resource References And Safety
**Score:** 15/15 · **Status:** PASS

### Findings:
- Every reference resolves; no deep or circular reference chains.
- Makes no code changes.

---

## Phase 5: Neutrality And Portability
**Score:** 14/15 · **Status:** PASS

### Findings:
- Wording is provider-neutral.
- Uses `openspec validate --strict`; runs the two axes in parallel sub-agents where available and sequentially otherwise. One point deducted for the hard CLI dependency.

---

## Summary

### Strengths:
- Keeps Spec and Standards findings separate, with an unambiguous status line.

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
1. Re-validate after spec section 11 changes.
