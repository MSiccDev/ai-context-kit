# AGENTS.md Template

## Purpose
`<Repository Name>` is a `<short repository description>`.

This file is the primary agent entrypoint for this repository. Keep it short and operational.  
Do not duplicate the full specification here. Embed essentials and point to deeper references.

This repository distinguishes:
- **Instructions**: persistent context/configuration files that define collaboration behavior.
- **Prompts/queries**: day-to-day task requests inside that instructed environment.

## Source Of Truth And Precedence
Use this order when files differ:
1. **Specification (authoritative):** `<path to spec>`
2. **Templates (canonical structures):** `<path(s) to templates>`
3. **Prompts (operational workflows):** `<path(s) to create/validate prompts>`
4. **Samples (illustrative examples):** `<path(s) to sample instructions and validations>`

## Repository Map
| Path | Purpose |
| --- | --- |
| `specs/` | Normative specification and terminology |
| `templates/` | Canonical templates |
| `prompts/` | Creation and validation workflows |
| `projects/` | Project-level instruction examples |
| `usercontexts/` | User-context instruction examples |
| `<additional path>` | `<purpose>` |

## Scope And Precedence For AGENTS.md Files
- An `AGENTS.md` applies to its directory and all subdirectories.
- If multiple `AGENTS.md` files apply, the closest (deepest) one wins for files in its subtree.
- Keep root `AGENTS.md` global; keep nested `AGENTS.md` files folder-specific.
- If instructions conflict or remain unclear after precedence, ask before proceeding.

## Session-State Contract
### Session State Summary
Track and expose:
- Project
- Role/Mode
- Phase
- Output Style
- Tone
- Interaction Mode

### Persistence And Transitions
- Session state persists across turns until explicitly changed or reset.
- No silent transitions: do not change state without explicit user signal.
- If a request implies a state shift, ask for confirmation before switching.

### Ambiguity Rule
- Ask clarifying questions before changing assumptions, project, role, phase, or execution style.

### Default State
| Element | Default Value |
| --- | --- |
| Project | `<project>` |
| Role | `<default role>` |
| Phase | `<default phase>` |
| Output Style | `<default style>` |
| Tone | `<default tone>` |
| Interaction Mode | `<default mode>` |

## Command Namespace Policy
Use namespaced commands as the default control surface.

Set namespace prefix: `<tag>`  
Recommended command format: `/<tag>.<command>`

| Command | Description |
| --- | --- |
| `/<tag>.context` | Show active session state |
| `/<tag>.mode <role>` | Change role/mode |
| `/<tag>.phase <phase>` | Change phase |
| `/<tag>.style <style>` | Change output style |
| `/<tag>.tone <tone>` | Change communication tone |
| `/<tag>.interact <mode>` | Change interaction mode |
| `/<tag>.reset` | Reset session state |

Alias policy:
- Namespaced commands are default.
- Unprefixed aliases are allowed only when no conflict exists.

## Standards, Tools, And Tests
- Primary standards: `<style guide / architecture / quality bar>`
- Build command: `<build command>`
- Test command: `<test command>`
- Run command: `<run command>`

## Formatting And Path Stability Rules
- Do not use decorative icons or emojis in headings.
- Keep canonical paths stable once adopted.
- Use relative repository paths for references.
- Keep language provider-agnostic.

## Update And Drift-Control Rule
When the specification changes, audit and update all impacted artifacts:
- `templates/`
- `prompts/`
- sample files (`projects/`, `usercontexts/`)
- `README.md`
- `AGENTS.md` files

## Key References
- Specification: `<relative path to spec>`
- Templates: `<relative path(s)>`
- Create prompts: `<relative path(s)>`
- Validate prompts: `<relative path(s)>`
- Samples: `<relative path(s)>`
