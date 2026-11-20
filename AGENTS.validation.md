> **Scope note:** This score reflects structural compliance with the spec format as assessed by an AI model against a structured scoring rubric intended to be applied consistently. It does not guarantee real-world session effectiveness or consistent LLM behavior across providers. Treat it as a structural checklist result, not a quality certification.

# AGENTS.md Validation Report

**File:** `AGENTS.md`  
**Mode:** root  
**Validated:** 2026-11-18 (full re-run after `openspec init`, rollout step 6); phase 3 re-checked 2026-11-19 for OpenSpec change `require-openspec-2-1`  
**Validator:** `skills/ack-validate-agents-md` 2.2.0  
**Phase 3 source:** `ack-openspec-check`: `OPENSPEC: OK` (CLI 2.1.0, `openspec update --dry-run --json` lists no changes); `openspec list --json`: `root.path` is the repository root; active change `ci-trim`

## Overall Status + Compliance Score
- **Status:** PASS
- **Compliance Score:** 99/100 (Phase 1 15 + Phase 2 25 + Phase 3 10 + Phase 4 20 + Phase 5 14 + Phase 6 15)

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
- The stated active change is `ci-trim`, and `openspec list --json` lists it as the only active change.
- The OpenSpec CLI is 2.1.0, and the generated OpenSpec files match it.
- The minimum version is `2.1.0`, and all four No Change, No Code rules are stated.
- `openspec/config.yaml` `context` points to `AGENTS.md` first and adds only pointers (spec, ADR index, skill template) and the `skip_specs` convention.
- The Invoking OpenSpec table has rows for Claude Code and Codex, the two tools `openspec init` configured, and names the OpenSpec 2.x skills.

## Phase 4: Project Context
- **Score:** 20/20
- **Status:** PASS
- All twelve Repository Project Context subsections are present with substantive content.
- Four roles, each with all four role-table columns.

## Phase 5: Clarity And Conciseness
- **Score:** 14/15
- **Status:** PASS
- Guidance is actionable and testable, with no conflicting rules and no copied specification text.
- Every rule has one home: Documentation Standards points to Formatting And Path Stability Rules for headings and paths, and no line describes a past version.
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
- None.

### Enhancements (Optional)
- Tighten descriptive lines in `Repository Project Context`.

## Recommendations (Immediate + Suggested + Migration Path)
### Immediate
1. None blocking.

### Suggested
1. Tighten descriptive lines in `Repository Project Context` through an OpenSpec change.

### Migration Path
1. None.

## Example Fixes for recurring failures
- Duplicated rule: keep it in one section and point to it from the other, or delete the copy.
- Stated root does not match: state the `openspec/` folder under `root.path`, written relative to the repository.
