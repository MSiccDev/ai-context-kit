# Design

## Context

Documentation Standards (under Repository Project Context) lists four lines; two of them repeat Formatting And Path Stability Rules word for word in meaning. The template puts project-wide formatting rules in Formatting And Path Stability Rules.

## Goals / Non-Goals

**Goals:**
- Each rule in `AGENTS.md` has one home.
- No line describes a past version.

**Non-Goals:**
- Tightening the descriptive lines in Repository Project Context (a separate, optional enhancement).

## Decisions

- **Formatting And Path Stability Rules is the home.** It is the template's section for these rules, and the drift-control rule points readers there. Documentation Standards keeps "Markdown-first" and "Keep AGENTS concise", and points to the formatting section for the rest.
- **Delete the retired-commands sentence outright.** ADR-011 and `CHANGELOG.md` already record the retirement.

## Test Seams

Agreed with the user before tasks were written:
- `AGENTS.validation.md`, re-run: no phase 5 warnings.
- All relative links and backticked paths in `AGENTS.md` still resolve.
- `openspec validate agents-md-writing-cleanup --strict` passes before the change is archived.

## Risks / Trade-offs

- None; no rule is dropped, only its copy.
