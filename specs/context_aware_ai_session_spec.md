---
version: 2.0.0-beta.1
context_type: specification
document_type: technical_specification
created: 2025-10-20
last_updated: 2026-11-16
status: beta
intended_audience: AI-assisted developers, system designers, prompt engineers, LLM-based tooling architects
license: Open for adaptation and refinement
---

# Context-Aware AI Session Flow Specification (v2.0.0-beta.1)

**Version:** 2.0.0-beta.1 | **Updated:** 2026-11-16 | **Status:** Beta

> This document contains the normative rules. For background reasoning, extended examples, end-to-end scenarios, and future enhancement notes, see [`docs/spec-rationale.md`](../docs/spec-rationale.md).

---

## 1. Purpose

This specification defines how an AI assistant should maintain and adapt context within technical and project-based workflows. A compliant assistant aligns itself with a persistent "session state" that governs how it interprets queries, reasons about solutions, and delivers responses — minimizing repetitive setup and ensuring consistent, role-appropriate behavior across multi-step work.

---

## 2. Core Concepts

### 2.1 Instructions, Skills, and Prompts

| Type | What it is | Purpose |
|------|-----------|---------|
| **Instructions** | Persistent context files (user context, project `AGENTS.md`) | Define WHO the user is, WHAT they're working on, HOW the AI should behave |
| **Skills** | Reusable workflow artifacts (`skills/*/SKILL.md` + references) | Centralize create/validate/governance operational logic |
| **Prompts/Queries** | Day-to-day requests within the instructed environment | Express user intent; prompt files may serve as composition entrypoints |
| **Change specifications** | OpenSpec artifacts in the project repository (`openspec/specs/`, `openspec/changes/<id>/`) | Define WHAT the system must do and WHAT is changing now; see section 11 |

Instructions create the **environment**. Skills provide canonical **workflow behavior**. Prompts express **immediate intent**. Change specifications define the **contract** that implementation works against.

### 2.2 Normative Artifact Precedence

When guidance conflicts across repository artifacts, apply this order:

1. Specification (this document — authoritative model and normative rules)
2. Templates (canonical artifact structures)
3. Skills (canonical operational workflows)
4. Prompts (composition entrypoints)
5. Samples and validation artifacts (illustrative examples)

### 2.3 AGENTS.md Bootstrap and Scope

Repositories **SHOULD** provide a root `AGENTS.md` as a concise bootstrap entrypoint. When present, assistants **SHOULD** treat it as the primary operational entrypoint and follow its references to deeper artifacts.

When multiple `AGENTS.md` files exist:
- Each file applies to its own directory and all descendant paths.
- The closest (deepest) `AGENTS.md` takes precedence for any target file/path.
- Root `AGENTS.md` defines global policy; nested files refine behavior for their subtree only.
- If applicable files conflict and precedence does not resolve intent, the assistant must request clarification.

---

## 3. Core Principles

| Principle | Rule |
|-----------|------|
| **Reduced variance** | Responses follow consistent conventions and reasoning patterns under the same context state. LLMs are probabilistic; this principle targets reduced variance and predictable behavior, not guaranteed identical outputs. |
| **Explicitness over assumption** | The assistant must confirm detected or inferred context changes rather than silently acting on assumptions. |
| **Role-driven reasoning** | The assistant's reasoning depth and response type must align with the active role. |
| **Context continuity** | Once established, session state must persist across turns until explicitly modified or reset. |
| **Low cognitive overhead** | The user must not have to repeatedly restate preferences or project constraints once they have been set. |
| **Reversibility** | All context shifts must be reversible or modifiable via direct command or natural language. |
| **Transparency and trust** | The user must always be able to understand the currently active session context, either implicitly or on request. |

---

## 4. Session State Model

### 4.1 Session State Elements

| Element | Description | Required? | User Modifiable? |
|--------|-------------|-----------|------------------|
| **User Context** | User's identity, skill level, working preferences, and delivery style. Loaded from user context instruction files. | Yes | Rarely |
| **Project** | Active domain, product, or codebase. Defines assumptions, stack, and context boundaries. | Yes | Yes |
| **Role / Mode** | Cognitive stance dictating reasoning perspective (Architect, Developer, Reviewer, etc.). | Yes | Yes |
| **Phase** | Current work stage (Planning, Implementation, Debugging, Review, Refactoring). | Yes | Yes |
| **Output Style** | Verbosity and formatting style (step-by-step, minimal, annotated). | Yes | Yes |
| **Tone** | Communication voice (analytical, direct, encouraging, neutral). | Yes | Yes |
| **Interaction Mode** | Initiative level (advisory, pair-programming, driver). | Optional* | Yes |

*Project `AGENTS.md` files should define a default Interaction Mode to keep startup behavior consistent and predictable.

### 4.2 Persistence Rules

- Session state persists across all assistant responses.
- State remains active until explicitly updated or reset.
- The assistant must not silently revert to defaults without user confirmation.

### 4.3 State Hierarchy

Each element influences assistant behavior in this order:

1. **User Context** — global identity and preferences baseline
2. **Project** — boundaries, assumptions, stack awareness
3. **Role** — reasoning approach and problem-solving lens
4. **Phase** — expected abstraction level and deliverable type
5. **Output Style** — structure and verbosity
6. **Tone** — voice and personality
7. **Interaction Mode** — initiative and collaboration pattern

### 4.4 Cross-Session Persistence

Cross-session persistence allows session state to be captured in a checkpoint artifact and restored in a future session.

#### 4.4.1 Checkpoint Proposal Rules

- The assistant may propose creating a checkpoint only when the user signals session end or explicitly requests one.
- Checkpoints must never be created silently; user approval is required before writing.
- Checkpoint artifacts must be stored outside the instruction layer and must not modify `AGENTS.md` or user context files.

#### 4.4.2 Checkpoint Schema

A checkpoint artifact must include the following fields:

| Field | Description |
|-------|-------------|
| `checkpoint` | Always `true` — identifies this file as a checkpoint artifact |
| `project` | Active project name |
| `role` | Active role at session end |
| `phase` | Active phase at session end |
| `output_style` | Active output style |
| `tone` | Active tone |
| `interaction_mode` | Active interaction mode (omit or set to `null` if not established) |
| `open_tasks` | In-progress tasks or confirmed next steps |
| `key_decisions` | Material decisions made during the session |
| `active_files` | File paths actively referenced |
| `last_updated` | ISO 8601 timestamp of checkpoint creation |

Additional fields are permitted. Sensitive data (credentials, private client content) must never be written to a checkpoint artifact.

#### 4.4.3 Restore Rules

- Checkpoint state is applied only when the artifact is explicitly provided at session start.
- If checkpoint state conflicts with active instruction files, the assistant must surface each conflict explicitly and ask the user which source to apply.
- Instruction files are the default if the user does not respond to a conflict prompt.
- The user must confirm the full restored state before the assistant proceeds.

### 4.5 Context Compression

Context compression is a mechanism for managing context window pressure in long sessions.

#### 4.5.1 Compression Proposal Rules

- The assistant may propose compression when context window saturation is evident — for example, when early session content becomes inaccessible or when the provider signals that compression is occurring.
- Compression must never be applied silently. The assistant must describe what will be retained and what will be dropped before the user confirms.
- The user must confirm before compression is applied.

#### 4.5.2 Compression Checkpoint Contents

A compression checkpoint must preserve:

- Full active session state (all section 4.1 elements)
- Active constraints from the instruction layer
- Key decisions made during the session
- Open and in-progress tasks
- Active file references
- A summary of what context was dropped

#### 4.5.3 Reversibility

- Before compression is applied, the assistant should offer to export the current uncompressed context summary to a checkpoint file.
- A compression checkpoint may serve as a session restore point per section 4.4.
- The assistant must not imply that dropped context is recoverable after compression has been applied.

---

## 5. Context Initialization

### 5.1 Session Start Triggers

| Trigger | Example |
|---------|---------|
| New conversation | User opens a fresh chat session or resets the assistant |
| New project environment detected | User opens an IDE session in a different repository |
| Explicit reset | "Reset context" or "Start a new session" |
| Role or project uncertainty | Assistant detects ambiguous or conflicting instructions |

### 5.2 Initialization Lifecycle

**Step 1 — Load User Context**
User Context is always loaded first as the foundational identity/preference layer.

**Step 2 — Detect Project Context**
If the environment provides metadata, the assistant may suggest a project. Where the OpenSpec CLI is available, the assistant **SHOULD** also run `openspec list --json` to find the OpenSpec root and the active changes (section 11).

**Step 3 — Confirm or Request Project Selection**
- Confident detection → assistant confirms and activates
- Unclear → assistant lists known projects or asks for a description

**Step 4 — Apply Default Role & Phase**
Load project defaults for role, phase, output style, and tone.

**Step 5 — Confirm State or Offer Adjustment**
Present a concise session summary and allow modification before proceeding.

**Step 6 — Begin Work**
Once confirmed, transition into operational mode.

### 5.3 Initialization Flow (Including Alternate Paths)

```
START SESSION
  |
  v
Load User Context (always)
  |
  v
Attempt project detection
  |
  |-- Confident -> Suggest project -> User confirms -> Project activated
  |                               -> User rejects -> Ask for selection
  |
  |-- Unsure -> Ask user to confirm / select / define project
  |
  v
Project confirmed -> Load default role & phase
  |
  v
Present session state summary
  |
  v
User confirms or modifies -> Begin active session
```

**Alternate paths:**
- **Unknown project**: Request project description or list known projects
- **Ambiguous task**: Infer context but ask for confirmation before proceeding
- **Immediate task**: Request minimal context needed before executing
- **Context conflict**: Suggest transition; do not assume one

### 5.4 Behavior When User Immediately Issues a Task

The assistant should infer whether context is established or missing. If no project is known, it must request clarification rather than proceed under incorrect assumptions. Execution begins only after context is clarified.

### 5.5 When Confirmation May Be Skipped

If a valid session state is already established, the task aligns with current context, and no conflicts are detected, the assistant may proceed without re-confirming. The user may always request a recap via the project's context command (e.g., `/namespace.context`).

### 5.6 Recommended Context Summary Format

```
Active Context:
- Project: [project name]
- Role: [e.g., Developer]
- Phase: [e.g., Implementation]
- Output Style: [e.g., Minimal Code]
- Tone: [e.g., Direct]
Ready to proceed.
```

---

## 6. State Visibility and Confirmation

### 6.1 When to Confirm Active Context

| Situation | Confirm? |
|-----------|----------|
| After initial setup | Yes |
| After project, role, phase, or style changes | Yes |
| After a long pause or reconnection | Recommended |
| After user expresses uncertainty | Yes |
| During continuous aligned work | Not required |

### 6.2 Confirmation Formats

**Standard:**
```
Active Context:
- Project: [name]
- Role: [role]
- Phase: [phase]
- Output Style: [style]
- Tone: [tone]
```

**Compact (user preference):**
```
[Role - Phase - Project - Output Style]
```

### 6.3 User-Initiated Context Recall

Users may request active context at any time via natural language ("What mode are we in?") or the project's namespaced context command. The assistant responds with the user's preferred summary format.

### 6.4 Silent Internal Checks

Even when not explicitly confirming state, the assistant should internally verify alignment between incoming tasks and the current context. On mismatch, the assistant may suggest a transition but must not assume one.

---

## 7. State Transition Rules

### 7.1 General Principles

- Any session element may be updated during a session.
- Context shifts may trigger transition suggestions, but application requires explicit user confirmation.
- The assistant must confirm transitions when intent is not fully clear.
- Significant transitions should be followed by a brief state summary.
- Transitions must not reset unrelated state elements.

### 7.2 Transition Triggers

| State Element | Explicit Trigger | Implicit Trigger | Requires Confirmation? |
|---------------|-----------------|-----------------|----------------------|
| **Project** | "Switch to the dashboard project." | Task clearly references a different codebase | Always |
| **Role / Mode** | "Switch to Architect Mode." | Request shifts from code writing to system reasoning | Yes |
| **Phase** | "We are now in implementation." | Continuous coding after planning | Yes |
| **Output Style** | "Minimal code only from now on." | Repeated requests to skip explanations | Yes |
| **Tone** | "Be more concise." | Rarely inferred | Yes |
| **Interaction Mode** | "Let's pair-program this." | Ambiguous unless explicit | Yes |

### 7.3 Phase Behavior Reference

| Phase | Expected Assistant Behavior | OpenSpec step (section 11) |
|-------|-----------------------------|----------------------------|
| Planning | Explore options, clarify requirements | Explore, then propose a change (proposal, spec deltas, design, tasks) |
| Implementation | Provide concrete solutions or code | Apply an apply-ready change, task by task |
| Debugging | Investigate issues and propose fixes | Fixes that change behavior go through a change like any other work |
| Review | Evaluate, critique, and refine | `openspec validate --strict`; archive after review approval |

### 7.4 Refusing or Reversing Transitions

If the user rejects a suggested transition, no change is made. Users may revert any transition at any time via natural language or command.

### 7.5 Post-Transition Summary

After major changes (Project, Role, or Phase), the assistant should present the new context in full or compact form.

---

## 8. Command and Control Surface

### 8.1 Natural Language Control

The assistant must recognize clearly expressed state changes via natural language.

| User says… | Interpreted as… |
|------------|----------------|
| "Switch to Architect Mode." | Set Role = Architect |
| "We're moving into implementation now." | Set Phase = Implementation |
| "Give me only code from now on." | Set Output Style = Minimal Code |
| "Be more concise and direct." | Adjust Tone = Direct |
| "Let's pair-program this step by step." | Set Interaction Mode = Pair-Programming |

### 8.2 Structured Command Interface

| Command | Parameters | Description |
|---------|------------|-------------|
| `/namespace.mode [role]` | architect, developer, reviewer, … | Changes assistant role |
| `/namespace.phase [name]` | planning, implementation, debugging, review | Updates work phase |
| `/namespace.style [name]` | step-by-step, minimal, annotated | Sets verbosity and formatting |
| `/namespace.tone [style]` | formal, direct, encouraging, neutral | Changes communication tone |
| `/namespace.interact [mode]` | advisory, pair, driver | Adjusts assistant initiative |
| `/namespace.context` | — | Displays current session state |
| `/namespace.reset` | — | Clears session state (user context retained) |

Optional extensions:

| Command | Description |
|---------|-------------|
| `/namespace.project [name]` | Switches active project (when explicit project routing is enabled) |
| `/namespace.help` | Lists available commands |

Commands may be combined if unambiguous: `/namespace.mode developer /namespace.phase implementation`

### 8.3 Error Handling

- **Missing parameter**: Assistant prompts for clarification
- **Conflict**: Assistant flags the conflict and asks for confirmation before proceeding
- **Unrecognized value**: Assistant lists available options

### 8.4 Command Namespacing

Projects must define a command namespace prefix to avoid collisions across tooling. Format: `/namespace.command` (e.g., `/ack.context` for AI Context Kit). The namespace must be documented in the project `AGENTS.md`.

---

## 9. Project Context Defaults

### 9.1 Default Profile Structure

| Field | Description | Required |
|-------|-------------|----------|
| `name` | Project identifier | Yes |
| `description` | Short description of project focus | Yes |
| `default_role` | Recommended starting role | Yes |
| `default_phase` | Likely phase when work begins | Yes |
| `default_output_style` | Typical response style | Optional |
| `default_tone` | Preferred communication tone | Optional |
| `supported_roles` | Roles applicable to this project | Optional |
| `notes` | Additional constraints or preferences | Optional |

### 9.2 Defaults as Soft Hints

Defaults provide an initial configuration only. They do not restrict the user. After applying defaults, the assistant must confirm and allow modification before beginning work.

See [`docs/spec-rationale.md`](../docs/spec-rationale.md) for example profiles and lifecycle-based default patterns.

---

## 10. Repository Governance Contracts

### 10.1 Documentation Formatting

- Instruction artifacts (`AGENTS.md` and `*.instructions.md` files) must not include decorative icons or emojis in headers or body text.
- Use standard Markdown headers (`##`, `###`) without symbolic prefixes.
- Instruction files (`*.instructions.md`) should use minimal YAML frontmatter: `description`, `applyTo`, and optionally `spec_version` for version tracking.
- Specification and reference documents may use extended metadata fields.

### 10.2 Canonical File Paths

The following paths are stable by policy:

| Path | Purpose |
|------|---------|
| `specs/context_aware_ai_session_spec.md` | Authoritative specification |
| `templates/` | Canonical artifact structures |
| `skills/` | Canonical workflow skill artifacts |
| `prompts/` | Composition entrypoints |
| `docs/spec-rationale.md` | Spec companion (rationale, examples, future notes) |
| `docs/adr/` | Architecture decision records, one file per decision |
| Root `AGENTS.md` | Primary repository operational entrypoint |
| Root `README.md` | Human-facing documentation |

If paths must change, update the specification and README first, then adjust AGENTS, skills, prompts, and validators.

### 10.3 Workflow Authority and Entrypoint Discipline

- Detailed workflow logic for create/validate/governance tasks **MUST** be canonicalized in skills.
- Prompt files **MAY** remain as composition entrypoints but **MUST NOT** reintroduce logic already defined in skills.
- When workflow behavior changes, skill artifacts **MUST** be updated first.

### 10.4 Skill Integration Contract

- Canonical operational workflows belong under `skills/`.
- Repository governance should define how skill validation evidence is stored (e.g., colocated `SKILL.validation.md` files).

### 10.5 Validation Artifact Naming

| Target | Validation file convention |
|--------|---------------------------|
| `AGENTS.md` | `AGENTS.validation.md` |
| `SKILL.md` | `SKILL.validation.md` |
| Generic instruction file | `[original-name].validation.md` |

### 10.6 Drift-Control Trigger Policy

When authoritative guidance changes, maintainers must audit all dependent artifacts including templates, canonical skills, prompt entrypoints, sample artifacts, and repository-facing docs. Apply related updates in a coordinated change set to avoid partial drift.

### 10.7 Prompt Composition Entrypoint Contract

- Entrypoints must remain concise and non-authoritative.
- Each entrypoint must reference the canonical skill that owns its workflow logic.
- If entrypoint and skill guidance diverge, the skill is the source of truth.

### 10.8 Workflow Family Mapping

Skill-first repositories should group canonical skills into clear operational families:

| Family | Purpose |
|--------|---------|
| Creation workflows | Generate or regenerate instruction artifacts |
| Validation workflows | Evaluate artifacts and produce consistent and predictable findings |
| Governance workflows | Coordinate repository-level policy, lifecycle, and drift control |

---

## 11. Spec-Driven Change Workflow (OpenSpec)

Kit-managed repositories use [OpenSpec](https://github.com/Fission-AI/OpenSpec) as the contract for what gets built. The kit owns *who and how* (user context, `AGENTS.md`, session state); OpenSpec owns *what the system must do* and *what is changing now*. Background: [`docs/spec-rationale.md`](../docs/spec-rationale.md) and ADR-001 to ADR-005 in [`docs/adr/`](../docs/adr/README.md).

### 11.1 Repository Requirement

- A kit-managed repository **MUST** contain an initialised `openspec/` directory and at least one OpenSpec tool integration.
- The project `AGENTS.md` **MUST** include a spec-driven change workflow section naming the OpenSpec root, the active change and how each tool invokes OpenSpec (see `templates/AGENTS_template.md`).

### 11.2 Implementation Gate

- The Implementation phase **MUST** start only against an OpenSpec change that `openspec status --change <id> --json` reports as apply-ready.
- If no apply-ready change exists for the requested work, the assistant **MUST** stop and offer to create or complete one instead of writing code. This is the no-change-no-code rule.
- Work proceeds task by task from the change's `tasks.md`; a task is ticked only after its build and tests pass.

### 11.3 Changes Without Behavior Impact

- Every change goes through OpenSpec; there are no exemptions.
- Changes with no behavior impact (documentation, refactoring, tooling) still get a change folder, marked with OpenSpec's `skip_specs: true`.

### 11.4 Customisation

- Generated `openspec-*` skills and commands **MUST NOT** be edited, because `openspec update` overwrites them.
- Customisation **MUST** go through `openspec/config.yaml` (`context`, `rules`, `operations`). `context` entries **SHOULD** be short pointers (to `AGENTS.md`, the glossary, `docs/adr/`) rather than copies.

### 11.5 Manual Mode

- Surfaces that cannot run the OpenSpec CLI (for example chat-only assistants) are fully supported in **manual mode**: planning artifacts (proposal, spec deltas, design, tasks) may be written anywhere from templates generated out of OpenSpec's shipped schema.
- Validate, apply and archive **MUST** happen in a repository with the CLI. The implementation gate in 11.2 applies unchanged.

### 11.6 Minimum Version

- The minimum supported OpenSpec version is **1.13.2**.
- Older versions **MUST** be reported as unsupported. Newer versions **SHOULD** produce a warning and **MUST NOT** fail a check.
- The minimum is reviewed every three months.

### 11.7 Archive Timing

- A change **MUST** be archived as the last commit on its feature branch, after review approval, so spec deltas and code land in one pull request.
- arc42 and ADR updates that follow from the change happen on the same branch. Design decisions that are hard to reverse, would surprise a newcomer, and are a real trade-off are promoted to `docs/adr/`.

### 11.8 Telemetry

- OpenSpec sends anonymous usage statistics by default. Kit documentation **MUST** name the opt-out (`openspec config set telemetry.enabled false`, or `OPENSPEC_TELEMETRY=0`), and kit tooling **MUST** ask before enabling or leaving it on.

---

## 12. Glossary

| Term | Definition |
|------|-----------|
| **Session** | A continuous interaction period in which context is preserved until explicitly reset or modified. |
| **User Context** | The user's profile: preferences, expertise level, communication expectations, and recurring stylistic requirements. |
| **Project** | The active domain or body of work within which all tasks are currently contextualized. |
| **Role / Mode** | The cognitive stance adopted by the assistant (Architect, Developer, Prompt Engineer, Reviewer, etc.). |
| **Phase** | The stage of work within the project lifecycle (Planning, Implementation, Debugging, Review, Refactoring). |
| **Output Style** | The desired structure and verbosity of responses (annotated, minimal code-only, step-by-step). |
| **Tone** | The communication voice used by the assistant (direct, neutral, analytical, encouraging). |
| **Interaction Mode** | How proactive or guided the assistant should be (advisory, pair-programming, driver-led). |
| **State Transition** | A deliberate change in one or more session elements. |
| **Default Profile** | A set of recommended initial values (role, phase, style, tone) for a specific project. |
| **State Confirmation** | A summary communicated by the assistant verifying the active session context. |
| **OpenSpec change** | A folder under `openspec/changes/<id>/` holding a proposal, spec deltas, design and tasks for one unit of work. |
| **Apply-ready** | The state in which `openspec status --change <id> --json` reports that a change may be implemented. |
| **Manual mode** | Using OpenSpec planning templates on a surface without the CLI, then validating, applying and archiving in a repository that has it. |
| **Reduced variance** | The property of producing consistent conventions, reasoning patterns, and response structure under the same session context. LLMs are probabilistic; this principle targets predictable, comparable outputs rather than guaranteed identical ones. |
