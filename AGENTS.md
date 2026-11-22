<!-- spec_version: 2.0.0 -->

# AI Context Kit Agent Guide

## Purpose
AI Context Kit is a cross-provider instruction-layer repository for context-aware AI collaboration.

This repository distinguishes:
- **Instructions**: persistent context artifacts (`*.instructions.md` for user context and `AGENTS.md` for project context) that define who the user is, what the project is, and how collaboration should run.
- **Prompts/queries**: day-to-day requests made inside that instructed environment.

## Source Of Truth And Precedence
Use this order when files differ:
1. **Specification (authoritative, v2.0.0):** `specs/context_aware_ai_session_spec.md`
2. **Templates (canonical structures):** `templates/*.instructions.md` and `templates/skill_template/SKILL.md`
3. **Skills (canonical operational workflows, including the implementation loop):** `skills/*/SKILL.md` and skill-local references
4. **Samples and validation artifacts (illustrative records):** `usercontexts/*.instructions.md`, related `*.validation.md`

## Repository Map
| Path | Purpose |
| --- | --- |
| `specs/` | Normative session-model specification and terminology |
| `templates/` | Canonical instruction templates aligned to the spec |
| `skills/` | Canonical workflow skills (`SKILL.md` folders) and skill-local resources |
| `skills/ack-loop-*/` | The implementation loop as five numbered skills (readiness → implement → review → learnings → commit); invoke in order, learnings is optional |
| `usercontexts/` | User-context instruction examples and validation reports |
| `docs/adr/` | Architecture decision records for the kit itself; start with `docs/adr/README.md` |
| `openspec/` | OpenSpec root: `config.yaml` and the active and archived changes |
| `install.md` | Agent-executable front door: runs the kit installer, then hands over to `ack-setup` |
| `THIRD_PARTY_NOTICES.md` | Licenses and the list of skills that adapt third-party work |

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

### Cross-Session Persistence (spec section 4.4)
- When the user signals session end or explicitly requests one, propose creating a checkpoint artifact using the `ack-create-checkpoint` skill.
- Never create a checkpoint silently. User approval is required before writing.
- When a checkpoint artifact is provided at session start, apply the `ack-restore-checkpoint` skill to restore state and surface any conflicts with active instruction files before proceeding.

### Context Compression (spec section 4.5)
- When context window saturation is evident, propose compression explicitly — describe what will be retained and what will be dropped before asking for confirmation.
- Never apply compression silently. The user must confirm before any context is dropped.
- Before applying compression, offer to export the current state to a checkpoint file using the `ack-create-checkpoint` skill.
- After compression, do not imply that dropped context is recoverable.

### Ambiguity Rule
- If assumptions, state, or intent are ambiguous, ask clarifying questions before acting.

### Default State For This Repo
Defaults are defined directly in this `AGENTS.md` to keep project context self-contained and AGENTS-first.

| Element | Default Value |
| --- | --- |
| Project | `AI Context Kit` |
| Role | `Architect` |
| Phase | `Planning` |
| Output Style | `structured` |
| Tone | `direct` |
| Interaction Mode | `advisory` |

## Session Commands
Change session state explicitly with the user-invoked [`ack-session`](skills/ack-session/SKILL.md) skill (spec section 8.2): `ack-session <command> [value]`. Plain-language requests ("switch to Reviewer") also work and follow the same confirmation rules.

| Command | Description |
| --- | --- |
| `ack-session context` | Show active session state summary |
| `ack-session mode <role>` | Change assistant role/mode |
| `ack-session phase <phase>` | Change current work phase |
| `ack-session style <style>` | Change output style/verbosity |
| `ack-session tone <tone>` | Change communication tone |
| `ack-session interact <mode>` | Change interaction mode (`advisory`, `pair`, `driver`) |
| `ack-session reset` | Reset session state to the defaults above (keep user context and project context unless the user says otherwise) |

Invocation: `/ack-session` in Claude Code (`/ai-context-kit:ack-session` with the plugin), `$ack-session` in Codex.

To find the right skill for a task, run [`ack-guide`](skills/ack-guide/SKILL.md).

## Spec-Driven Change Workflow
This repository uses OpenSpec as the contract for what gets built (spec section 11, ADR-001).

- OpenSpec root: `openspec/`
- Active change: `hotfix-2-0-1`
- Minimum OpenSpec version: `2.1.0`

The session spec stays the normative document and is not split into OpenSpec capability specs, so `openspec/specs/` stays empty and every change sets `skip_specs: true`. `openspec/config.yaml` points back to this file.

### No Change, No Code
- Start implementation only against an apply-ready change: `openspec instructions apply --change <id> --json` reports `state` as `ready`.
- If no apply-ready change exists, stop and offer to create or complete one.
- Changes with no behavior impact still get a change folder with `skip_specs: true`.
- Archive the change as the last commit on the feature branch, after review approval.

### Invoking OpenSpec
| Tool | How to invoke |
| --- | --- |
| Claude Code | `/openspec-propose`, `/openspec-apply-change`, `/openspec-archive-change` (skills in `.claude/skills/`) |
| Codex | `$openspec-propose`, `$openspec-apply-change`, `$openspec-archive-change` (skills in `.agents/skills/`) |

Do not edit generated `openspec-*` skills or commands; customise through `openspec/config.yaml`. OpenSpec telemetry is off for kit work: run `openspec config set telemetry.enabled false` or set `OPENSPEC_TELEMETRY=0`.

## Repository Project Context
### Overview
**AI Context Kit** is a kit for instruction-based AI collaboration across providers, installed into each repository with `@msiccdev/ai-context-kit`.

- Current status / phase: **Active Development**
- Primary objectives:
  - Maintain spec-aligned templates and skills
  - Provide clear, portable AGENTS-first guidance
  - Keep repository structure stable for tooling

### Role Definitions
| Role | When To Use | Assistant Behavior | Typical Outputs |
| --- | --- | --- | --- |
| `Architect` | Defining structure, spec alignment, repository direction | Emphasize clarity, constraints, and tradeoffs | Plans, governance changes, architecture decisions |
| `Prompt Engineer` | Refining skills and instruction workflows | Optimize flow, quality gates, and determinism | Skills, workflow rules, validation criteria |
| `Technical Writer` | Improving docs, onboarding, and migration clarity | Prioritize readability, consistency, and usability | README/AGENTS/template updates |
| `Reviewer` | Verifying quality, regressions, and policy compliance | Surface gaps and actionable remediations | Findings, fixes, acceptance notes |

### Tech Stack
- Languages: Markdown, shell scripts
- Runtime/tooling: provider-agnostic instruction workflows
- Architecture: specification + templates + skills (including the implementation loop)
- Validation: skill-based validation workflows and reports

### Current Objectives
- Keep templates and skills aligned with spec `v2.0.0`.
- Maintain the AGENTS-first project-context model.
- Preserve deterministic behavior and path stability.
- Reduce duplication and migration noise.

### Development Principles
- Prefer explicit, auditable rules over implicit behavior.
- Keep changes incremental and reviewable.
- Preserve provider neutrality and runtime portability.
- Avoid silent context shifts and undocumented conventions.

### Repository Context
- Default branch: `main`. It is the production release branch: every commit on `main` is a release, so releases are not tagged.
- Branch flow (git flow):
  - Features: start from `development` and open pull requests into `development`.
  - Releases: when the maintainer decides to release, start `release/<version>` from `development`. Only release preparation goes there (version bump, changelog heading, last fixes). Open a pull request into `main`; merging it publishes the installer to npm (`installer/RELEASING.md`). After it merges, bring it into `development` with a pull request from `main` into `development`.
  - Hotfixes: start `hotfix/<version>` from `main` and open a pull request into `main`. After it merges, bring the fix into `development` with a pull request from `main` into `development`.
  - `main` changes only through `release/*` and `hotfix/*` pull requests. Pull requests from `main` into `development` happen only after one of those merges.
- Key paths:
  - `specs/`
  - `templates/`
  - `skills/`
  - `usercontexts/`
  - `docs/adr/`
  - `openspec/`

### Working Together
**Architect**
- "Align this change with spec and AGENTS precedence."
- "Propose a migration path with clear review gates."

**Prompt Engineer**
- "Keep each skill focused and move detail into its references."
- "Preserve quality gates while reducing duplication."

**Technical Writer**
- "Rewrite this section for AGENTS-first onboarding."
- "Make platform-agnostic guidance clearer."

**Reviewer**
- "Check for regressions and stale references."
- "List blocking findings before merge."

### Key Components
- Specification: `specs/context_aware_ai_session_spec.md`
- Templates: `templates/`
- Skills: `skills/`
- Implementation loop: `skills/ack-loop-01-readiness/` to `skills/ack-loop-05-commit/`
- User context samples: `usercontexts/`

### Testing Strategy
- Validate structural/quality changes using canonical validation skills.
- Re-run affected validation reports after workflow/guidance changes.
- Verify references with repository-wide path scans.

### Documentation Standards
- Markdown-first documentation.
- Keep AGENTS concise; link out rather than duplicating large normative text.
- Headings and paths follow Formatting And Path Stability Rules below.

### Testing Commands
```bash
rg -n "<pattern>" AGENTS.md README.md skills templates specs usercontexts docs
```

### Future Roadmap
- Maintain AGENTS-only project-context governance.
- Strengthen skill validation and drift-control automation.

## Formatting And Path Stability Rules
- Do not use decorative icons or emojis in headings.
- Keep canonical paths stable: `specs/`, `templates/`, `skills/`, `usercontexts/`, `docs/adr/`.
- Use relative repository paths for cross-references.
- Keep language provider-agnostic.

## Update And Drift-Control Rule
When `specs/context_aware_ai_session_spec.md` changes, audit and update all impacted artifacts:
- `templates/`
- `skills/`
- sample files in `usercontexts/`
- `README.md`
- `AGENTS.md`

## Key References
- Specification (v2.0.0): [`specs/context_aware_ai_session_spec.md`](specs/context_aware_ai_session_spec.md)
- Project operational defaults: this root `AGENTS.md` (Default State For This Repo)
- User context template: [`templates/usercontext_template.instructions.md`](templates/usercontext_template.instructions.md)
- Skill template: [`templates/skill_template/SKILL.md`](templates/skill_template/SKILL.md)
- Create skills: [`ack-create-agents-md`](skills/ack-create-agents-md/SKILL.md), [`ack-create-user-context`](skills/ack-create-user-context/SKILL.md), [`ack-create-skill`](skills/ack-create-skill/SKILL.md)
- Validate skills: [`ack-validate-agents-md`](skills/ack-validate-agents-md/SKILL.md), [`ack-validate-user-context`](skills/ack-validate-user-context/SKILL.md), [`ack-validate-skill`](skills/ack-validate-skill/SKILL.md)
- Session and navigation: [`ack-session`](skills/ack-session/SKILL.md), [`ack-guide`](skills/ack-guide/SKILL.md)
- Interview and implementation: [`ack-interview`](skills/ack-interview/SKILL.md), [`ack-interview-with-context`](skills/ack-interview-with-context/SKILL.md), [`ack-tdd`](skills/ack-tdd/SKILL.md)
- Loop skills:
  - [`ack-loop-01-readiness`](skills/ack-loop-01-readiness/SKILL.md)
  - [`ack-loop-02-implement`](skills/ack-loop-02-implement/SKILL.md)
  - [`ack-loop-03-review`](skills/ack-loop-03-review/SKILL.md)
  - [`ack-loop-04-learnings`](skills/ack-loop-04-learnings/SKILL.md) _(optional)_
  - [`ack-loop-05-commit`](skills/ack-loop-05-commit/SKILL.md)
- Skills index: [`skills/README.md`](skills/README.md)
- Sample user context instructions: [`usercontexts/sample_usercontext.instructions.md`](usercontexts/sample_usercontext.instructions.md)
