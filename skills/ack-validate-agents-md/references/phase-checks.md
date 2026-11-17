# Phase Checks: ack-validate-agents-md

Run the phases in order. Each phase lists its checks for root mode and for nested mode.

## Phase 1: Structure And Core Sections
- **Root:** the file exists; all eleven sections of the template are present, in template order (Purpose, Source Of Truth And Precedence, Repository Map, Scope And Precedence For AGENTS.md Files, Session-State Contract, Command Namespace Policy, Spec-Driven Change Workflow, Repository Project Context, Formatting And Path Stability Rules, Update And Drift-Control Rule, Key References); headings are scannable.
- **Nested:** the file exists; the five nested sections are present, in order (Scope, What This Folder Overrides, Local Map, Local Commands, Key References); a root `AGENTS.md` exists.

## Phase 2: Operational Contract
- **Root:** the session-state summary lists the six elements; the no-silent-transitions rule and the ambiguity rule are present; the Default State table has Project, Role, Phase, Output Style, Tone and Interaction Mode; the namespaced command reference is complete; Scope And Precedence For AGENTS.md Files states all four rules (applies to subtree, deepest wins, root global and nested folder-specific, ask when unresolved); the drift-control rule lists the dependent artifacts.
- **Nested:** the scope statement names the folder; Key References links to the root `AGENTS.md`; every override names the root rule it refines; nothing in the file contradicts the root file without being stated as an override.

## Phase 3: Spec-Driven Workflow (root mode only)
Run `openspec list --json`, or read `openspec/` if the CLI is unavailable.
- The `Spec-Driven Change Workflow` section is present.
- The repository has an OpenSpec root.
- The stated OpenSpec root matches `root.path`.
- The stated active change is in the list of active changes; if exactly one change is active, the section names it.
- The minimum version is `1.13.2`.
- The four No Change, No Code rules are complete.
- If `openspec/config.yaml` has a `context` field, it points to `AGENTS.md` rather than copying its content.
- The Invoking OpenSpec table has at least one row.

## Phase 4: Project Context
- **Root:** Repository Project Context has all twelve subsections (Overview, Role Definitions, Tech Stack, Current Objectives, Development Principles, Repository Context, Working Together, Key Components, Testing Strategy, Documentation Standards, Testing Commands, Future Roadmap) with substantive content; at least 3 roles; the role table has every column.
- **Nested:** the local map and local commands are concrete.

## Phase 5: Clarity And Conciseness
- Guidance is actionable and testable.
- No conflicting rules.
- No copied normative specification text.
- **Nested:** no repetition of root content.

## Phase 6: Portability, Links And Alignment
- Wording is provider-neutral, with no mandatory single-runtime assumptions.
- Every relative link and referenced path resolves.
- Canonical path guidance matches the repository.
