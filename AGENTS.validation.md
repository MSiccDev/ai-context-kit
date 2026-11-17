> **Scope note:** This score reflects structural compliance with the spec format as assessed by an AI model against a structured scoring rubric intended to be applied consistently. It does not guarantee real-world session effectiveness or consistent LLM behavior across providers. Treat it as a structural checklist result, not a quality certification.

# AGENTS.md Validation Report

**File:** `AGENTS.md`  
**Validated:** 2026-09-06; re-checked 2026-11-16 for the spec 2.0.0-beta.1 changes only (full re-run in 2.0 rollout step 5)  
**Validator:** `skills/validate-agents-md`

## Overall Status + Compliance Score
- **Status:** PASS
- **Compliance Score:** 99/100 (Phase 1 20 + Phase 2 35 + Phase 3 19 + Phase 4 15 + Phase 5 10)
- **Correction (2026-11-17):** this report previously stated 100/100, which did not match its own phase scores. The status is unchanged: 99 is in the PASS band (90-100).

## Phase 1: Core Presence & Structure
- **Score:** 20/20
- **Status:** PASS
- Target file exists and is structurally complete.
- `<!-- spec_version: 2.0.0-beta.1 -->` comment is present and current — no version warning.
- Purpose, precedence model, and repository map are explicitly defined.
- Heading structure is scannable and consistent.

## Phase 2: Operational Contract Completeness
- **Score:** 35/35
- **Status:** PASS
- Session-state summary is explicit.
- No-silent-transitions rule is present.
- Ambiguity rule is present.
- Command namespace policy and `/ack.*` command reference are complete.
- Default state values are explicitly defined.
- Formatting/path stability rules are present.
- Drift-control rule is present.
- Nested `AGENTS.md` precedence policy is present.
- Spec-driven change workflow section is present (spec section 11.1, added to the template in 2.0.0-beta.1).

## Phase 3: Clarity, Actionability & Conciseness
- **Score:** 19/20
- **Status:** PASS
- Guidance is actionable and testable.
- No conflicting policy statements detected.
- Spec duplication is controlled.
- Minor opportunity: tighten a few descriptive lines in `Repository Project Context` to keep the operational profile lean.

## Phase 4: Portability & Neutrality
- **Score:** 15/15
- **Status:** PASS
- Language remains provider-neutral.
- Guidance is runtime/tool portable.
- No mandatory single-runtime assumptions found.

## Phase 5: Link Integrity & Repository Alignment
- **Score:** 10/10
- **Status:** PASS
- Relative links in `AGENTS.md` resolve.
- Referenced paths exist.
- Canonical path guidance aligns with repository reality (AGENTS-first posture).
- New `docs/adr/` repository map entry resolves.

## Summary (Strengths/Critical/Warnings/Enhancements)
### Strengths
- Clear AGENTS-first authority model with explicit precedence.
- Strong operational contract (state, transitions, command namespace).
- High repository alignment and link integrity.

### Critical Issues (Must Fix)
- None.

### Warnings (Should Fix)
- Spec section 11.1 requires an initialised `openspec/`, which this repository does not have yet. `AGENTS.md` states this and defers adoption to 2.0 rollout step 6 (dogfood). The current `validate-agents-md` rubric does not score OpenSpec yet, so the score is unchanged; the OpenSpec check arrives with the merged `ack-validate-agents-md` (ADR-009).

### Enhancements (Optional)
- None.

## Recommendations (Immediate + Suggested)
### Immediate
1. No blocking changes required.

### Suggested
1. Keep validation re-runs coupled with future AGENTS structural edits.
2. If section growth continues, split non-operational detail into referenced docs while keeping AGENTS policy-focused.

## Example Fixes for recurring failures
- No recurring failures detected in this run.
