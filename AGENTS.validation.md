> **Scope note:** This score reflects structural compliance with the spec format as assessed by an AI model against a structured scoring rubric intended to be applied consistently. It does not guarantee real-world session effectiveness or consistent LLM behavior across providers. Treat it as a structural checklist result, not a quality certification.

# AGENTS.md Validation Report

**File:** `AGENTS.md`  
**Mode:** root  
**Validated:** 2026-11-18 (full re-run after `openspec init`, rollout step 6; replaces the 2026-11-17 report)  
**Validator:** `skills/ack-validate-agents-md` 2.1.1  
**Phase 3 source:** `openspec list --json` (OpenSpec 2.1.0): `root.path` is the repository root; active changes `user-context-score-sum` and `openspec-root-check`

## Overall Status + Compliance Score
- **Status:** PASS
- **Compliance Score:** 96/100 (Phase 1 15 + Phase 2 25 + Phase 3 10 + Phase 4 20 + Phase 5 11 + Phase 6 15)

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
- Session Commands names `ack-session` with all seven commands and says how Claude Code and Codex start it.
- Scope And Precedence For AGENTS.md Files states all four rules.
- The drift-control rule lists the dependent artifacts.

## Phase 3: Spec-Driven Workflow
- **Score:** 10/10
- **Status:** PASS
- The section is present.
- The stated root, `openspec/`, is the `openspec/` folder under `root.path`.
- The stated active change, `user-context-score-sum`, is in the list of active changes. Two changes are active, so naming either one is valid.
- The minimum version is `1.13.2`, and all four No Change, No Code rules are stated.
- `openspec/config.yaml` `context` points to `AGENTS.md` first and adds only pointers (spec, ADR index, skill template) and the `skip_specs` convention.
- The Invoking OpenSpec table has rows for Claude Code and Codex, the two tools `openspec init` configured.

## Phase 4: Project Context
- **Score:** 20/20
- **Status:** PASS
- All twelve Repository Project Context subsections are present with substantive content.
- Four roles, each with all four role-table columns.

## Phase 5: Clarity And Conciseness
- **Score:** 11/15
- **Status:** PASS WITH WARNINGS
- Guidance is actionable and testable, with no conflicting rules and no copied specification text.
- Warning (2 points): two rules have two homes. "No decorative emojis or icons in headings" and "Use relative repository paths" appear in both Documentation Standards and Formatting And Path Stability Rules.
- Warning (1 point): sediment. "The former `/ack.*` commands are retired (ADR-011)" in Session Commands describes a past version; the changelog already records it.
- Minor (1 point): `Repository Project Context` could be tighter; some lines describe rather than instruct (for example Future Roadmap).

## Phase 6: Portability, Links And Alignment
- **Score:** 15/15
- **Status:** PASS
- Provider-neutral wording, with no mandatory single-runtime assumptions. The tool names in the Invoking OpenSpec table are the tools this repository configured.
- All 23 relative links and all 24 backticked repository paths resolve.
- Key paths include `docs/adr/` and `openspec/`.

## Summary (Strengths/Critical/Warnings/Enhancements)
### Strengths
- The spec-driven section states the real OpenSpec state and how each configured tool invokes it.
- Complete operational contract and project context, in template order.
- High link and path integrity.

### Critical Issues (Must Fix)
- None. The earlier critical finding (no OpenSpec root) is resolved by `openspec init`.

### Warnings (Should Fix)
- Two rules are stated in two sections (Phase 5).
- One sediment line about retired commands (Phase 5).

### Enhancements (Optional)
- Tighten descriptive lines in `Repository Project Context`.

## Recommendations (Immediate + Suggested + Migration Path)
### Immediate
1. None blocking.

### Suggested
1. Keep the heading and path rules only in Formatting And Path Stability Rules, and drop them from Documentation Standards.
2. Remove the sentence about retired `/ack.*` commands.
3. Make both edits through an OpenSpec change, as this repository now requires.

### Migration Path
1. When both active changes are archived, set `Active change` to `none`.

## Example Fixes for recurring failures
- Duplicated rule: keep it in one section and point to it from the other, or delete the copy.
- Stated root does not match: state the `openspec/` folder under `root.path`, written relative to the repository.
