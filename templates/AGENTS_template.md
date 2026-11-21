<!-- spec_version: 2.0.0-beta.1 -->

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
3. **Skills (canonical operational workflows, including the implementation loop):** `<path(s) to skills>`
4. **Samples (illustrative examples):** `<path(s) to sample instructions and validations>`

## Repository Map
| Path | Purpose |
| --- | --- |
| `specs/` | Normative specification and terminology |
| `templates/` | Canonical templates |
| `skills/` | Canonical workflow skills, including the `ack-loop-*` implementation loop |
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

## Session Commands
Change session state explicitly with the user-invoked `ack-session` skill (spec section 8.2): `ack-session <command> [value]`. Plain-language requests ("switch to Reviewer") also work and follow the same confirmation rules.

| Command | Description |
| --- | --- |
| `ack-session context` | Show active session state |
| `ack-session mode <role>` | Change role/mode |
| `ack-session phase <phase>` | Change phase |
| `ack-session style <style>` | Change output style |
| `ack-session tone <tone>` | Change communication tone |
| `ack-session interact <mode>` | Change interaction mode |
| `ack-session reset` | Reset session state to the defaults above |

Invocation: `<how each tool starts a skill, e.g. /ack-session in Claude Code, $ack-session in Codex>`

## Spec-Driven Change Workflow
This repository uses OpenSpec as the contract for what gets built (spec section 11).

- OpenSpec root: `<OpenSpec folder, usually openspec/>`
- Active change: `<change id, or "none">`
- Minimum OpenSpec version: `2.1.0`

### No Change, No Code
- Start implementation only against an apply-ready change: `openspec instructions apply --change <id> --json` reports `state` as `ready`.
- If no apply-ready change exists, stop and offer to create or complete one.
- Changes with no behavior impact still get a change folder with `skip_specs: true`.
- Archive the change as the last commit on the feature branch, after review approval.

### Invoking OpenSpec
| Tool | How to invoke |
| --- | --- |
| `<tool 1>` | `<invocation spelling>` |
| `<tool 2>` | `<invocation spelling>` |

Do not edit generated `openspec-*` skills or commands; customise through `openspec/config.yaml`. OpenSpec sends anonymous usage statistics by default; to turn them off, run `openspec config set telemetry.enabled false` (machine-wide) or set `OPENSPEC_TELEMETRY=0` (spec section 11.8).

## Repository Project Context
### Overview
`<Project Name>` is a `<short project description>`.

Current status/phase: `<phase>`

### Role Definitions
| Role | When To Use | Assistant Behavior | Typical Outputs |
| --- | --- | --- | --- |
| `<Role 1>` | `<when to use>` | `<behavior>` | `<outputs>` |
| `<Role 2>` | `<when to use>` | `<behavior>` | `<outputs>` |
| `<Role 3>` | `<when to use>` | `<behavior>` | `<outputs>` |

### Tech Stack
- Languages: `<language list>`
- Frameworks/runtime: `<framework/runtime list>`
- Tooling: `<build/test/tooling>`

### Current Objectives
- `<objective 1>`
- `<objective 2>`
- `<objective 3>`

### Development Principles
- `<principle 1>`
- `<principle 2>`
- `<principle 3>`

### Repository Context
- Default branch: `<branch>`
- Key paths:
  - `<path 1>`
  - `<path 2>`
  - `<path 3>`

### Working Together
- `<collaboration rule 1>`
- `<collaboration rule 2>`

### Key Components
- `<component 1>`: `<purpose>`
- `<component 2>`: `<purpose>`
- `<component 3>`: `<purpose>`

### Testing Strategy
- Levels: `<unit/integration/e2e>`
- Scope expectations: `<coverage/critical paths>`
- Validation approach: `<manual/automated checks>`

### Documentation Standards
- Primary format: `<markdown/docs format>`
- Required artifacts: `<readme/runbooks/adr/etc>`
- Update expectations: `<when/how docs are updated>`

### Testing Commands
```bash
# Build
<build command>

# Test
<test command>

# Run (if applicable)
<run command>
```

### Future Roadmap
- `<next milestone>`
- `<planned improvement>`
- `<known gap>`

## Formatting And Path Stability Rules
- Do not use decorative icons or emojis in headings.
- Keep canonical paths stable once adopted.
- Use relative repository paths for references.
- Keep language provider-agnostic.

## Update And Drift-Control Rule
When the specification changes, audit and update all impacted artifacts:
- `templates/`
- `skills/`
- sample files (`usercontexts/`)
- `README.md`
- `AGENTS.md` files

## Key References
- Specification: `<relative path to spec>`
- Templates: `<relative path(s)>`
- Skills: `<relative path(s)>`
- Samples: `<relative path(s)>`
