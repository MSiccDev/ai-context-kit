> **Scope note:** This score reflects structural compliance with the spec format as assessed by an AI model against a structured scoring rubric intended to be applied consistently. It does not guarantee real-world session effectiveness or consistent LLM behavior across providers. Treat it as a structural checklist result, not a quality certification.

# AGENTS.md Validation Report

**File:** `AGENTS.md`  
**Mode:** root  
**Validated:** 2026-11-17 (full re-run; replaces the 2026-09-06 report and its 2026-11-16 delta re-check)  
**Validator:** `skills/ack-validate-agents-md`  
**Phase 3 source:** `openspec list --json` (OpenSpec 1.13.2): `root: null`, code `no_openspec_root`

## Overall Status + Compliance Score
- **Status:** FAIL (one critical finding; the score alone would be PASS WITH WARNINGS)
- **Compliance Score:** 88/100 (Phase 1 15 + Phase 2 25 + Phase 3 0 + Phase 4 20 + Phase 5 14 + Phase 6 14)

## Phase 1: Structure And Core Sections
- **Score:** 15/15
- **Status:** PASS
- All eleven template sections are present, in template order.
- `<!-- spec_version: 2.0.0-beta.1 -->` is present and current.
- Headings are scannable.

## Phase 2: Operational Contract
- **Score:** 25/25
- **Status:** PASS
- The session-state summary lists all six elements; no-silent-transitions and ambiguity rules are present.
- The Default State table has all six elements.
- The namespaced command reference has all seven `/ack.*` commands, with an alias policy.
- Scope And Precedence For AGENTS.md Files states all four rules.
- The drift-control rule lists the dependent artifacts.

## Phase 3: Spec-Driven Workflow
- **Score:** 0/10
- **Status:** FAIL (critical)
- The section is present, and its fields agree with the repository: the root is stated as "not yet initialised", the active change as `none`, the minimum version as `1.13.2`.
- **Critical:** the repository has no OpenSpec root (spec section 11.1). `openspec list --json` returns `root: null` with code `no_openspec_root`. Per decision A in `docs/plans/agents-md-skill-merge.md`, this is critical with no exception, even though `AGENTS.md` states that adoption is deferred to rollout step 6.
- Warning: the four No Change, No Code rules from the template are not stated; the section has a deferral paragraph instead.
- Enhancement: there is no Invoking OpenSpec table.

## Phase 4: Project Context
- **Score:** 20/20
- **Status:** PASS
- All twelve Repository Project Context subsections are present with substantive content.
- Four roles, each with all four role-table columns.

## Phase 5: Clarity And Conciseness
- **Score:** 14/15
- **Status:** PASS
- Guidance is actionable and testable, with no conflicting rules and no copied specification text.
- Minor: `Repository Project Context` could be tighter; some lines describe rather than instruct.

## Phase 6: Portability, Links And Alignment
- **Score:** 14/15
- **Status:** PASS
- Provider-neutral wording, with no mandatory single-runtime assumptions.
- All 18 relative links and all 32 backticked repository paths resolve.
- Minor: `Repository Context` → Key paths omits `docs/adr/`, which spec section 10.2 lists as a canonical path.

## Summary (Strengths/Critical/Warnings/Enhancements)
### Strengths
- Complete operational contract and project context, in template order.
- The spec-driven section states the repository's real OpenSpec state instead of claiming a setup that doesn't exist.
- High link and path integrity.

### Critical Issues (Must Fix)
- No OpenSpec root. Fixed by rollout step 6, which runs `openspec init` in this repository.

### Warnings (Should Fix)
- The Spec-Driven Change Workflow section lacks the four No Change, No Code rules.

### Enhancements (Optional)
- Add an Invoking OpenSpec table once `openspec init` has configured tools.
- Add `docs/adr/` to Key paths.
- Tighten descriptive lines in `Repository Project Context`.

## Recommendations (Immediate + Suggested + Migration Path)
### Immediate
1. None that can land before rollout step 6; the critical finding is resolved by `openspec init`.

### Suggested
1. Add the four No Change, No Code rules and the Invoking OpenSpec table in the same change that runs `openspec init`.
2. Add `docs/adr/` to Key paths.

### Migration Path
1. Rollout step 6: run `openspec init` here, fill the spec-driven section from `openspec list --json`, and re-run this validator. The status should then become PASS.

## Example Fixes for recurring failures
- Missing OpenSpec root: run `openspec init --tools <ids>`, then set `OpenSpec root: openspec/` in the spec-driven section.
- Missing No Change, No Code rules: copy the four rules from `templates/AGENTS_template.md` → `### No Change, No Code`.
