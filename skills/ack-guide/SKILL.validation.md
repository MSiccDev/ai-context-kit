# Skill Validation Report

**File:** skills/ack-guide/SKILL.md
**Skill:** ack-guide
**Validated:** 2026-11-19 (re-run for OpenSpec change `require-openspec-2-1`)
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
- Description as pointer: a one-line summary for the person who runs the skill (user-invoked).

---

## Phase 3: Instruction Quality And Completeness
**Score:** 24/25 · **Status:** PASS

### Findings:
- All seven required body sections are present, in order; detail lives in `references/`.
- Minor: the routes name OpenSpec's installed skills (`openspec-explore`, `openspec-propose`) as OpenSpec 2.1 creates them; a later OpenSpec release could rename them. One point deducted. The 1.x `/opsx:*` commands are no longer named.
- Writing checks: every workflow step ends on a completion criterion; no no-ops, sediment or duplicated rules found.
- Workflow step 2 starts the model-invoked `ack-openspec-check` before recommending an `openspec-*` skill, and recommends its upgrade steps first when it is not `OK`. That is the one skill it starts, which the constraints now state.

---

## Phase 4: Resource References And Safety
**Score:** 15/15 · **Status:** PASS

### Findings:
- Every reference resolves; no deep or circular reference chains.
- The skill writes no files.
- `references/routes.md` now names workflow step 3 instead of pointing to `references/phase-boundaries.md`, so no reference points to another reference.

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
- None. (The interview skills were added to the routes on 2026-11-18.)

---

## Recommendations

### Immediate Actions:
1. None.

### Suggested Improvements:
1. Re-validate after spec sections 4.5, 8 or 11 change.
