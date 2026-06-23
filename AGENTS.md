<!-- spec_version: 1.4.2 -->

# AI Context Kit Agent Guide

## Purpose
AI Context Kit is a cross-provider instruction-layer repository for context-aware AI collaboration.

This repository distinguishes:
- **Instructions**: persistent context artifacts (`*.instructions.md` for user context and `AGENTS.md` for project context) that define who the user is, what the project is, and how collaboration should run.
- **Prompts/queries**: day-to-day requests made inside that instructed environment.

## Source Of Truth And Precedence
Use this order when files differ:
1. **Specification (authoritative, v1.4.2):** `specs/context_aware_ai_session_spec.md`
2. **Templates (canonical structures):** `templates/*.instructions.md` and `templates/skill_template/SKILL.md`
3. **Skills (canonical operational workflows):** `skills/*/SKILL.md` and skill-local references
4. **Prompts:** `prompts/skills/*.prompt.md` (compatibility wrappers — must defer detailed logic to skills); `prompts/loop/*.prompt.md` (implementation loop steps — self-contained workflow prompts)
5. **Samples and validation artifacts (illustrative records):** `usercontexts/*.instructions.md`, related `*.validation.md`

## Repository Map
| Path | Purpose |
| --- | --- |
| `specs/` | Normative session-model specification and terminology |
| `templates/` | Canonical instruction templates aligned to the spec |
| `skills/` | Canonical workflow skills (`SKILL.md` folders) and skill-local resources |
| `prompts/skills/` | Compatibility wrappers that route workflows to canonical skills |
| `prompts/loop/` | Numbered step prompts for the implementation loop (readiness-check → implementation → self-review → learnings → human-in-the-loop); invoke in order, learnings is optional |
| `usercontexts/` | User-context instruction examples and validation reports |

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
- When the user signals session end or explicitly requests one, propose creating a checkpoint artifact using the `create-checkpoint` skill.
- Never create a checkpoint silently. User approval is required before writing.
- When a checkpoint artifact is provided at session start, apply the `restore-checkpoint` skill to restore state and surface any conflicts with active instruction files before proceeding.

### Context Compression (spec section 4.5)
- When context window saturation is evident, propose compression explicitly — describe what will be retained and what will be dropped before asking for confirmation.
- Never apply compression silently. The user must confirm before any context is dropped.
- Before applying compression, offer to export the current state to a checkpoint file using the `create-checkpoint` skill.
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

## Repository Project Context
### Overview
**AI Context Kit** is a template repository for building instruction-based AI collaboration across providers.

- Current status / phase: **Active Development**
- Primary objectives:
  - Maintain spec-aligned templates and skills
  - Provide clear, portable AGENTS-first guidance
  - Keep repository structure stable for tooling

### Role Definitions
| Role | When To Use | Assistant Behavior | Typical Outputs |
| --- | --- | --- | --- |
| `Architect` | Defining structure, spec alignment, repository direction | Emphasize clarity, constraints, and tradeoffs | Plans, governance changes, architecture decisions |
| `Prompt Engineer` | Refining create/validate wrappers and instruction workflows | Optimize flow, quality gates, and determinism | Prompt wrappers, workflow rules, validation criteria |
| `Technical Writer` | Improving docs, onboarding, and migration clarity | Prioritize readability, consistency, and usability | README/AGENTS/template updates |
| `Reviewer` | Verifying quality, regressions, and policy compliance | Surface gaps and actionable remediations | Findings, fixes, acceptance notes |

### Tech Stack
- Languages: Markdown, shell scripts
- Runtime/tooling: provider-agnostic instruction workflows
- Architecture: specification + templates + skills + wrappers
- Validation: skill-based validation workflows and reports

### Current Objectives
- Keep templates and skills aligned with spec `v1.4.2`.
- Maintain the AGENTS-first project-context model.
- Preserve deterministic behavior and path stability.
- Reduce duplication and migration noise.

### Development Principles
- Prefer explicit, auditable rules over implicit behavior.
- Keep changes incremental and reviewable.
- Preserve provider neutrality and runtime portability.
- Avoid silent context shifts and undocumented conventions.

### Repository Context
- Default branch: `main`
- Key paths:
  - `specs/`
  - `templates/`
  - `skills/`
  - `prompts/`
  - `usercontexts/`

### Working Together
**Architect**
- "Align this change with spec and AGENTS precedence."
- "Propose a migration path with clear review gates."

**Prompt Engineer**
- "Keep wrappers thin and move logic into skills."
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
- Prompt wrappers: `prompts/`
- User context samples: `usercontexts/`

### Testing Strategy
- Validate structural/quality changes using canonical validation skills.
- Re-run affected validation reports after workflow/guidance changes.
- Verify references with repository-wide path scans.

### Documentation Standards
- Markdown-first documentation.
- Relative repository paths for cross-references.
- No decorative emojis/icons in headings.
- Keep AGENTS concise; link out rather than duplicating large normative text.

### Testing Commands
```bash
rg -n "<pattern>" AGENTS.md README.md skills prompts templates specs usercontexts
```

### Future Roadmap
- Maintain AGENTS-only project-context governance.
- Continue reducing legacy prompt-era artifacts.
- Strengthen skill validation and drift-control automation.

## Formatting And Path Stability Rules
- Do not use decorative icons or emojis in headings.
- Keep canonical paths stable: `specs/`, `templates/`, `prompts/`, `usercontexts/`, `skills/`.
- Use relative repository paths for cross-references.
- Keep language provider-agnostic.

## Update And Drift-Control Rule
When `specs/context_aware_ai_session_spec.md` changes, audit and update all impacted artifacts:
- `templates/`
- `skills/`
- `prompts/` wrappers (keep thin; do not duplicate full workflow logic)
- sample files in `usercontexts/`
- `README.md`
- `AGENTS.md`

## Key References
- Specification (v1.4.2): [`specs/context_aware_ai_session_spec.md`](specs/context_aware_ai_session_spec.md)
- Project operational defaults: this root `AGENTS.md` (Default State For This Repo)
- User context template: [`templates/usercontext_template.instructions.md`](templates/usercontext_template.instructions.md)
- Skill template: [`templates/skill_template/SKILL.md`](templates/skill_template/SKILL.md)
- Create prompts:
  - [`prompts/skills/create-agents-md.prompt.md`](prompts/skills/create-agents-md.prompt.md)
  - [`prompts/skills/create-usercontext-instructions.prompt.md`](prompts/skills/create-usercontext-instructions.prompt.md)
  - [`prompts/skills/create-project-instructions.prompt.md`](prompts/skills/create-project-instructions.prompt.md)
  - [`prompts/skills/create-skill.prompt.md`](prompts/skills/create-skill.prompt.md)
- Validate prompts:
  - [`prompts/skills/validate-agents-md.prompt.md`](prompts/skills/validate-agents-md.prompt.md)
  - [`prompts/skills/validate-usercontext-instructions.prompt.md`](prompts/skills/validate-usercontext-instructions.prompt.md)
  - [`prompts/skills/validate-project-instructions.prompt.md`](prompts/skills/validate-project-instructions.prompt.md)
  - [`prompts/skills/validate-skill.prompt.md`](prompts/skills/validate-skill.prompt.md)
- Loop prompts:
  - [`prompts/loop/01-readiness-check.prompt.md`](prompts/loop/01-readiness-check.prompt.md)
  - [`prompts/loop/02-implementation.prompt.md`](prompts/loop/02-implementation.prompt.md)
  - [`prompts/loop/03-self-review.prompt.md`](prompts/loop/03-self-review.prompt.md)
  - [`prompts/loop/04-learnings.prompt.md`](prompts/loop/04-learnings.prompt.md) _(optional)_
  - [`prompts/loop/05-human-in-the-loop.prompt.md`](prompts/loop/05-human-in-the-loop.prompt.md)
- Extracted skills index: [`skills/README.md`](skills/README.md)
- Sample user context instructions: [`usercontexts/sample_usercontext.instructions.md`](usercontexts/sample_usercontext.instructions.md)
