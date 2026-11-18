# Root Schema: ack-create-agents-md

The root `AGENTS.md` follows `templates/AGENTS_template.md` exactly.

## Required Sections (in order)
1. Purpose
2. Source Of Truth And Precedence
3. Repository Map
4. Scope And Precedence For AGENTS.md Files
5. Session-State Contract
6. Session Commands
7. Spec-Driven Change Workflow
8. Repository Project Context
9. Formatting And Path Stability Rules
10. Update And Drift-Control Rule
11. Key References

## Purpose
- What the repository is.
- The instructions-versus-prompts distinction.

## Scope And Precedence For AGENTS.md Files: Required Rules
- An `AGENTS.md` applies to its directory and all subdirectories.
- When several apply, the closest (deepest) one wins for files in its subtree.
- The root `AGENTS.md` stays global; nested files stay folder-specific.
- If instructions conflict or remain unclear after precedence, ask before proceeding.

## Session-State Contract: Required Content
- Session State Summary listing the six elements.
- Persistence And Transitions, including the no-silent-transitions rule.
- Ambiguity Rule.
- Default State table with Project, Role, Phase, Output Style, Tone, Interaction Mode.

## Session Commands: Required Content
- That explicit state changes go through the user-invoked `ack-session` skill (spec section 8.2), and that plain-language requests also work.
- The `ack-session` command table (see `command-template.md`).
- How each tool the project uses starts the skill (for example `/ack-session` in Claude Code, `$ack-session` in Codex).

## Spec-Driven Change Workflow: Required Fields
Fill each field from discovery phase 6:

| Field | Content | When OpenSpec is not set up |
| --- | --- | --- |
| OpenSpec root | The `openspec/` folder under `root.path`, relative to the repository (usually `openspec/`) | "not yet initialised in this repository" |
| Active change | The active change id | `none` |
| Minimum OpenSpec version | `1.13.2` | `1.13.2` |

Then two subsections:
- **No Change, No Code**: the template's four rules, unchanged: start implementation only against an apply-ready change (`openspec instructions apply --change <id> --json` reports `state` as `ready`); if none exists, stop and offer to create or complete one; changes with no behavior impact still get a change folder with `skip_specs: true`; archive the change as the last commit on the feature branch, after review approval.
- **Invoking OpenSpec**: a table with one row per tool and its invocation spelling, followed by the rule that generated `openspec-*` skills and commands are not edited; customisation goes through `openspec/config.yaml`.

## Repository Project Context: Required Subsections
- Overview
- Role Definitions (at least 3 roles; see `role-template.md`)
- Tech Stack
- Current Objectives
- Development Principles
- Repository Context
- Working Together
- Key Components
- Testing Strategy
- Documentation Standards
- Testing Commands
- Future Roadmap

## Authoring Rules
- Every section carries substantive, repository-specific content.
- Do not copy normative specification text; link to it.
- Use relative paths only.
- Keep wording provider-neutral.
