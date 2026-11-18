# Skill Validation Report

**File:** skills/ack-guide/SKILL.md
**Skill:** ack-guide
**Validated:** 2026-11-18
**Validator:** `skills/ack-validate-skill`

---

## Overall Status: PASS

**Compliance Score:** 99/100 (Phase 1 20 + Phase 2 25 + Phase 3 24 + Phase 4 15 + Phase 5 15)

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
- No user-invoked skill is started by this skill; it only names skills for the user to run.

---

## Phase 3: Instruction Quality And Completeness
**Score:** 24/25 · **Status:** PASS

### Findings:
- All seven required body sections are present, in order; detail lives in `references/`.
- Minor: the routes name OpenSpec's installed skills and Claude Code commands (`openspec-explore`, `openspec-propose`, `/opsx:*`) as OpenSpec 1.13.2 creates them; a later OpenSpec release could rename them. One point deducted.

---

## Phase 4: Resource References And Safety
**Score:** 15/15 · **Status:** PASS

### Findings:
- Every reference resolves; no deep or circular reference chains.
- The skill writes no files.

---

## Phase 5: Neutrality And Portability
**Score:** 15/15 · **Status:** PASS

### Findings:
- Provider-neutral; it recommends skills by name and leaves how to start them to each tool. Attribution is in place: `metadata.credits` names mattpocock/skills, the body names the origin, and `THIRD_PARTY_NOTICES.md` lists the skill.

---

## Summary

### Strengths:
- One place to find the next skill for every kit flow, with the phase-boundary order from spec section 4.5.4.

### Critical Issues (Must Fix):
- None.

### Warnings (Should Fix):
- None.

### Enhancements (Optional):
- Add the interview skills to the routes once they exist.

---

## Recommendations

### Immediate Actions:
1. None.

### Suggested Improvements:
1. Re-validate after spec sections 4.5, 8 or 11 change.
