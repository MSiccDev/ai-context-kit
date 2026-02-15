# AI Context Kit Agent Guide

## Purpose
AI Context Kit is a cross-provider instruction-layer repository for context-aware AI collaboration.

This repository distinguishes:
- **Instructions**: persistent context files (`*.instructions.md`) that define who the user is, what the project is, and how collaboration should run.
- **Prompts/queries**: day-to-day requests made inside that instructed environment.

## Source Of Truth And Precedence
Use this order when files differ:
1. **Specification (authoritative):** `specs/context_aware_ai_session_spec.md`
2. **Templates (canonical structures):** `templates/*.instructions.md`
3. **Prompts (operational workflows):** `prompts/*.prompt.md`
4. **Samples (illustrative examples):** `projects/*.instructions.md`, `usercontexts/*.instructions.md`, and related `*.validation.md`

## Repository Map
| Path | Purpose |
| --- | --- |
| `specs/` | Normative session-model specification and terminology |
| `templates/` | Canonical instruction templates aligned to the spec |
| `prompts/` | Create/validate prompt workflows for instruction files |
| `projects/` | Project-level instruction examples and validation reports |
| `usercontexts/` | User-context instruction examples and validation reports |
| `plans/` | Planning prompts used to execute repository refactors |

## Plan Lifecycle Policy
- Plans must live in `plans/` only.
- Each `plans/*.prompt.md` file must declare frontmatter `status: open` or `status: executed`.
- When a plan is executed, record:
  - `executed_at` (`YYYY-MM-DD`)
  - `execution_ref` (branch, commit, PR, or tag)
- Use `./plans/plan-status.sh` to detect open vs executed plans.

## Scope And Precedence For AGENTS.md Files
- An `AGENTS.md` file applies to the directory it is in and all subdirectories.
- If multiple `AGENTS.md` files apply, the closest (deepest) one wins for files in its subtree.
- Keep root `AGENTS.md` global and nested `AGENTS.md` files folder-specific.
- If instructions conflict or remain unclear after precedence, ask before proceeding.

## Session-State Contract
### Session State Summary
Active session state includes:
- Project
- Role/Mode
- Phase
- Output Style
- Tone
- Interaction Mode

### Persistence And Transitions
- Session state persists across turns until explicitly changed or reset.
- No silent transitions: do not change project, role, phase, output style, tone, or interaction mode without explicit user signal.
- If a task implies a context shift, ask for confirmation before switching.

### Ambiguity Rule
- If assumptions, state, or intent are ambiguous, ask clarifying questions before acting.

### Default State For This Repo
Defaults align with `projects/ai_context_kit_project.instructions.md`.

| Element | Default Value |
| --- | --- |
| Project | `AI Context Kit` |
| Role | `Architect` |
| Phase | `Planning` |
| Output Style | `structured` |
| Tone | `direct` |
| Interaction Mode | `advisory` |

## Command Namespace Policy
Use namespaced commands for explicit state control.

| Command | Description |
| --- | --- |
| `/ack.context` | Show active session state summary |
| `/ack.mode <role>` | Change assistant role/mode |
| `/ack.phase <phase>` | Change current work phase |
| `/ack.style <style>` | Change output style/verbosity |
| `/ack.tone <tone>` | Change communication tone |
| `/ack.interact <mode>` | Change interaction mode (`advisory`, `pair`, `driver`) |
| `/ack.reset` | Reset session state (keep user context and project context unless user says otherwise) |

Alias policy:
- Namespaced `/ack.*` commands are the default.
- Unprefixed aliases are allowed only when no command conflict exists.

## Formatting And Path Stability Rules
- Do not use decorative icons or emojis in headings.
- Keep canonical paths stable: `specs/`, `templates/`, `prompts/`, `projects/`, `usercontexts/`.
- Use relative repository paths for cross-references.
- Keep language provider-agnostic.

## Update And Drift-Control Rule
When `specs/context_aware_ai_session_spec.md` changes, audit and update all impacted artifacts:
- `templates/`
- `prompts/`
- sample files in `projects/` and `usercontexts/`
- `README.md`
- `AGENTS.md`

## Key References
- Specification: [`specs/context_aware_ai_session_spec.md`](specs/context_aware_ai_session_spec.md)
- Project operational defaults: [`projects/ai_context_kit_project.instructions.md`](projects/ai_context_kit_project.instructions.md)
- User context template: [`templates/usercontext_template.instructions.md`](templates/usercontext_template.instructions.md)
- Project template: [`templates/project_template.instructions.md`](templates/project_template.instructions.md)
- Create prompts:
  - [`prompts/create-usercontext-instructions.prompt.md`](prompts/create-usercontext-instructions.prompt.md)
  - [`prompts/create-project-instructions.prompt.md`](prompts/create-project-instructions.prompt.md)
- Validate prompts:
  - [`prompts/validate-usercontext-instructions.prompt.md`](prompts/validate-usercontext-instructions.prompt.md)
  - [`prompts/validate-project-instructions.prompt.md`](prompts/validate-project-instructions.prompt.md)
- Sample project instructions: [`projects/ai_context_kit_project.instructions.md`](projects/ai_context_kit_project.instructions.md)
- Sample user context instructions: [`usercontexts/sample_usercontext.instructions.md`](usercontexts/sample_usercontext.instructions.md)
