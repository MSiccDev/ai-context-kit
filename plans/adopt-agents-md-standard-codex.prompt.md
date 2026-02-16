---
description: "Step-by-step (committable) plan to adopt root AGENTS.md as the primary repo entrypoint while preserving spec v1.2 behavior."
status: executed
executed_at: 2026-02-15
execution_ref: codex/adopt-agents-md-standard
---

# Task: Adopt AGENTS.md standard (committable refactor)

You are Codex in VS Code working in the `ai-context-kit` repository.

## Goal
Adopt root `AGENTS.md` as the primary agent entrypoint for THIS repo, without losing any existing features (spec v1.2 system remains).

## Constraints
- Root `AGENTS.md` is repo-only (not a generic template).
- Do not delete/rename existing folders/files.
- Provider-agnostic (no provider-specific behavior).
- Do not copy the full spec into `AGENTS.md`; embed essentials + link to deeper refs via relative paths.
- Keep canonical paths stable (`templates/`, `prompts/`, `specs/`, `projects/`, `usercontexts/`).

## Branch strategy
Do the migration on a dedicated feature branch; merge to `main` only after the full plan is complete and reviewed.


## Execution style
Work in small, reviewable commits. After each commit:
- verify links are valid
- ensure the change is shippable by itself
- avoid touching unrelated files

## Human review gate
After completing the work for a commit:
- Stop and ask the user to review the changes.
- Do not run `git commit` (the user will commit manually).
- When the user explicitly asks for a commit message, propose one that describes **only the changes since the last commit**.

## Validation report write access (fallback policy)
If a validator prompt expects writing a `*.validation.md` file:
- if you can write files, create/overwrite it
- if you cannot (or are unsure), output the full report as a Markdown block + the intended filename/path so a human can save it


## Formatting & style consistency
Apply to all new/updated files in this plan:
- no decorative icons/emojis in headers
- consistent Markdown headings/lists/tables
- relative paths for repo references
- provider-agnostic language
- keep existing naming conventions
- new prompts match the existing `prompts/` style


## Commit plan

### Commit 0 — Full repo analysis (no changes)
Read all repo text files completely (exclude `.git/` and non-text binaries like `.DS_Store`) so you have the full big picture before editing anything.

At minimum, fully read:
- `README.md`, `LICENSE`, `.gitignore`
- `specs/*.md`
- `templates/*`
- `prompts/*`
- `projects/*`, `usercontexts/*`
- `plans/*` (planning prompts)

Confirm (write down for yourself, not committed):
- sources of truth + precedence (spec vs templates vs prompts vs samples)
- `/ack.*` commands + default session state used by this repo
- formatting + path stability rules


### Commit 1a — Add root `AGENTS.md` skeleton + repo map
Add:
- `AGENTS.md`
Include:
- what this repo is (instruction layer kit; instructions vs prompts; cross-provider)
- source-of-truth hierarchy (spec/templates/prompts/samples)
- repo map (`specs/`, `templates/`, `prompts/`, `projects/`, `usercontexts/`)
- relative links to deeper refs (spec, templates, prompts, samples)
Defer:
- `/ack.*` command details, default state, formatting/path rules

### Commit 1b — Expand `AGENTS.md` with operational contract
Update:
- `AGENTS.md`
Add:
- session-state summary + “no silent transitions”
- `/ack.context`, `/ack.mode`, `/ack.phase`, `/ack.style`, `/ack.tone`, `/ack.interact`, `/ack.reset`
- default state aligned to `projects/ai_context_kit_project.instructions.md`
- formatting/path stability rules (no decorative icons; canonical paths stable)
- contribution/update rule: spec change => update templates + prompts + samples + README + AGENTS
- acceptance: must meet **Definition of Done (Root `AGENTS.md`)**

## Definition of Done (Root `AGENTS.md`)
Root `AGENTS.md` is done when it is repo-only, scannable, and includes:
- purpose + instructions vs prompts
- truth sources + precedence (spec/templates/prompts/samples)
- repo map (`specs/`, `templates/`, `prompts/`, `projects/`, `usercontexts/`, `plans/`)
- scoping/precedence policy for nested `AGENTS.md` (subtree scope; closest wins; ask on conflict)
- session-state summary + “no silent transitions” + persistence
- ambiguity rule (ask before switching assumptions/state)
- `/ack.*` commands + short descriptions
- namespace policy (`/ack.*` + whether aliases are allowed)
- explicit default state values aligned to `projects/ai_context_kit_project.instructions.md`
- formatting/path stability rules (no decorative icons; stable canonical paths; relative links)
- drift/update rule when the spec changes
- relative links to deeper refs
Also: no full-spec duplication; provider-agnostic language.


## AGENTS.md scoping & precedence (future nested files)
Ensure root `AGENTS.md` documents this policy even if you don’t add nested files now:
- An `AGENTS.md` applies to its directory subtree.
- If multiple apply, the closest/deepest one wins for files under it.
- Avoid duplication: keep root global, nested files folder-specific.
- If instructions conflict or are unclear, ask.


### Commit 2 — Add general-purpose template
Add:
- `templates/AGENTS_template.md`
Placeholders + minimal structure (repo overview, truth sources, repo map, session state summary, command namespace, formatting rules, update rules).

### Commit 3a — Add generator prompt skeleton
Add:
- `prompts/create-agents-md.prompt.md`
Include:
- frontmatter description
- mission, scope & preconditions, inputs
- multi-phase discovery outline (project identity, repo layout, roles/phases/commands, standards, tools/tests, contribution workflow)
Defer:
- generation rules, output format, validation checklist

### Commit 3b — Complete generator prompt rules + output format + checklist
Update:
- `prompts/create-agents-md.prompt.md`
Add:
- generation rules (embed essentials, link deeper docs, keep short/scannable)
- output format (single Markdown block that is a complete `AGENTS.md`)
- validation checklist (links valid; essentials present; no overstuffing; provider-agnostic)
- example reference section: point to this repo’s `AGENTS.md` (sample) and `templates/AGENTS_template.md` (template)

### Commit 4 — Add validator prompt (recommended)
Add:
- `prompts/validate-agents-md.prompt.md`
Mirror existing validators: 5 phases, /100 scoring, report format; validate completeness, clarity/actionability, portability, scoping guidance (if used), “don’t overstuff”. Include short **Example Fixes** snippets for common failures (match existing validator style).

### Commit 5 — Update README (minimal)
Update:
- `README.md`
Add: `AGENTS.md` is primary entrypoint; spec remains authoritative; `plans/` contains planning prompts (plain Markdown usable anywhere).

### Commit 6 — Optional spec note
Optional update:
- `specs/context_aware_ai_session_spec.md`
Add a small acknowledgement: `AGENTS.md` can be a bootstrap entrypoint; spec remains normative.

## Sanity checks (after each commit)
- Drift control: if `specs/context_aware_ai_session_spec.md` changes, audit/update (as applicable) `templates/`, `prompts/`, sample files in `projects/` + `usercontexts/`, `README.md`, and `AGENTS.md`.
- relative paths valid, no circular dependencies
- provider-agnostic language only
- existing samples/validation reports untouched
