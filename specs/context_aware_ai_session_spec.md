---
version: 1.2.0
context_type: specification
document_type: technical_specification
created: 2025-10-20
last_updated: 2025-12-23
status: active
intended_audience: AI-assisted developers, system designers, prompt engineers, LLM-based tooling architects
license: Open for adaptation and refinement
---

# Context-Aware AI Session Flow Specification (v1.2)

## Specification Metadata
- **Version:** 1.2.0 (Clarified instruction-based architecture and terminology)
- **Created:** October 2025
- **Last Updated:** December 23, 2025
- **Intended Audience:** AI-assisted developers, system designers, prompt engineers, LLM-based tooling architects
- **Applicability:** Contextual AI assistants used in multi-step, developer-focused or project-based workflows
- **License / Usage Note:** Open for adaptation and refinement in AI workflow tooling, documentation, and instructional materials

---

## Executive Summary

Modern AI assistants often treat each interaction as an independent request without continuity, resulting in frequent misunderstandings, repeated explanations, and incorrect assumptions about the user's goals, role, or current phase of work. In professional environments—especially software development, technical architecture, prompt engineering, and iterative system design—this lack of persistent context reduces effectiveness, trust, and cognitive flow.

This specification introduces a structured, deterministic **instruction-based session model** in which assistant behavior is consistently governed by a defined set of contextual parameters: Persona, Project, Role, Phase, Output Style, Tone, and Interaction Mode. By shifting from context-free, turn-based interactions to stable, instruction-based reasoning, assistants become more reliable, aligned, and cooperative partners in complex workflows.

### The Instruction-Based Paradigm

This specification distinguishes between:

- **Instructions** – Persistent context and guidelines (user context instructions, project instructions) that define WHO the user is, WHAT they're working on, and HOW the AI should behave
- **Prompts/Queries** – Day-to-day requests the user makes within that instructed environment
- **Session State** – The active combination of instruction layers and dynamic context that governs AI behavior

The document outlines how instruction-based context should be:
- Initialized from layered instruction sets (user context + project context)
- Confirmed and made transparent to the user
- Persisted across conversation turns
- Adapted across role or phase changes  
- Communicated clearly to maintain trust
- Reset cleanly when needed  

It defines transition rules, user control methods (via natural language or structured commands), and project-based default configurations. Real-world multi-phase scenarios demonstrate how the system behaves under different conditions. Potential future enhancements are also explored, including automatic phase inference, branch-based project mapping, and context checkpointing.

By adopting this specification, AI-assisted work sessions become more deterministic, trustable, and human-aligned—enabling the assistant to function as a consistent collaborator rather than a stateless query engine.

---

## 1. Purpose

This document defines a structured model for how an AI assistant should maintain and adapt context within technical and project-based workflows. It ensures that assistant interactions remain aligned with the user's intent across different roles (e.g., architect, developer, tester, prompt engineer), project phases (e.g., planning, implementation, debugging, review), and formatting expectations (e.g., detailed reasoning vs. minimal code).

Rather than responding to isolated requests with no continuity, a compliant assistant aligns itself with a persistent and evolving "session state" that governs how it interprets queries, reasons about solutions, and delivers responses. This minimizes repetitive setup instructions, reduces cognitive friction for the user, and ensures consistency and determinism in assistant behavior.

By implementing this specification, an AI assistant transitions from being a transactional responder to acting as a contextually aware collaborator that supports complex, multi-step workflows in a reliable, role-appropriate manner.

---

## 1.1 Conceptual Framework: Instructions vs. Prompts

This specification is built on a critical distinction:

### Instructions (Persistent Context)
**What they are:**
- Structured files (user context instructions, project instructions) that define persistent working context
- Loaded once and remain active throughout a session
- Define WHO the user is, WHAT they're working on, and HOW the AI should behave

**Examples:**
- Personal user context instructions: Professional background, skills, preferences, working style
- Project instructions: Tech stack, architecture, roles, phases, constraints

**Purpose:**
- Eliminate repetitive context-setting
- Create deterministic, consistent AI behavior
- Enable portable AI workspace configurations across providers

### Prompts/Queries (Transactional Requests)
**What they are:**
- Day-to-day questions and tasks the user asks within the instructed environment
- Consumable and specific to immediate needs
- What users traditionally think of as "prompts"

**Examples:**
- "Create a new authentication endpoint"
- "Switch to Developer Mode and implement this feature"
- "Review this code for security issues"

### The Relationship
Instructions create the **environment** in which prompts are interpreted. The same prompt ("create an API endpoint") will result in different outputs depending on the active instruction set (tech stack, architecture patterns, coding style preferences, etc.).

This specification defines how AI assistants should:
1. Load and layer instruction sets (persona + project)
2. Maintain that instructed state persistently
3. Adapt behavior based on session state changes
4. Respond to user prompts/queries within that context

---

## 2. Core Principles

These principles define how a compliant assistant should behave during an instruction-driven session, ensuring reliability, trust, and alignment with user expectations.

| Principle | Definition | Example |
|-----------|-----------|---------|
| **Determinism** | Given the same context state and query, responses should be consistent. | Code generation under "Developer Mode" with concise output should always follow the same conventions. |
| **Explicitness over assumption** | The assistant should confirm detected or inferred context changes rather than silently acting on assumptions. | If a new task appears unrelated to the current project or role, the assistant should confirm whether a switch is intended. |
| **Role-driven reasoning** | The assistant's depth of reasoning and type of response must align with the active role. | In Architect Mode, it evaluates trade-offs; in Developer Mode, it writes implementation code directly. |
| **Context continuity** | Once established, session state must persist across turns until explicitly modified or reset. | The assistant retains the current Role and Phase between requests, rather than defaulting back. |
| **Low cognitive overhead** | The user should not have to repeatedly restate preferences or project constraints once they have been set. | After confirming a project context, the assistant should remember the project's tech stack. |
| **Reversibility** | All context shifts (role, phase, project, etc.) must be reversible or modifiable via direct command or natural language. | "Switch back to Planning Phase." |
| **Transparency and trust** | The user should always be able to understand the currently active session context, either implicitly or on request. | Assistant provides a confirmation summary such as "Active Context: Project X, Role: Developer, Phase: Implementation." |
---

## 3. Session State Model

A session consists of structured context elements that determine how the assistant interprets requests, reasons about solutions, and formats responses. Together, these elements form the "session state," which guides assistant behavior until explicitly changed.

---

### 3.1 Session State Elements

| Element | Description | Required? | User Modifiable? | Example Values |
|--------|-------------|-----------|------------------|----------------|
| **User Context** | Represents the user's identity, skill level, working preferences, and preferred delivery style. Loaded from user context instruction files. | Yes | Rarely (updated only when preferences change) | "Experienced developer, prefers structured technical reasoning." |
| **Project** | The active domain, product, or codebase being worked on. Defines assumptions, stack, and context boundaries. | Yes | Yes | "Mobile UI app", "API backend", "Prompt testing tool" |
| **Role / Mode** | The cognitive stance the assistant should take, dictating its reasoning perspective. | Yes | Yes | "Architect", "Developer", "Prompt Engineer", "UI Designer", "Reviewer" |
| **Phase** | The current work stage within the project lifecycle, impacting task expectations and abstraction level. | Yes | Yes | "Planning", "Implementation", "Debugging", "Review", "Refactoring" |
| **Output Style** | Defines verbosity and formatting style of responses. | Yes | Yes | "Step-by-step reasoning", "Minimal code only", "Annotated solution" |
| **Tone** | The communication voice or attitude used by the assistant. Can depend on Role & Phase or be manually overridden. | Yes | Yes | "Analytical", "Direct", "Encouraging", "Neutral" |
| **Interaction Mode** | Defines how proactive or directive the assistant should be. | Optional* | Yes | "Advisory Mode", "Pair-programming Mode", "Driver Mode" |
* **Note:** Interaction Mode is optional in the abstract session model, but **project instruction files should define a default Interaction Mode** to keep collaboration deterministic and to avoid ambiguity about how proactive the assistant should be at the start of a project session.

---

### 3.2 Persistence Behavior

Once established, the session state persists across all assistant responses.  
It remains active until explicitly updated or reset.  
The assistant must not silently revert to defaults without user confirmation.  

---

### 3.3 Example Session States

| User Context | Project | Role | Phase | Output Style | Tone | Interaction Mode |
|---------|--------|------|-------|--------------|------|------------------|
| Senior software engineer | Mobile UI project | UI Designer | Planning | Annotated conceptual proposals | Friendly & creative | Advisory |
| Data researcher | AI evaluation pipeline | Prompt Engineer | Implementation | JSON-formatted responses | Precise & technical | Execution-focused |
| Backend-focused developer | API service | Developer | Debugging | Minimal patch suggestions | Direct | Pair-programming |

---

### 3.4 Hierarchy and Influence

Each element affects assistant reasoning to different degrees:

1. **User Context**: Global identity and preferences baseline from user context instructions  
2. **Project**: Defines boundaries, assumptions, and stack awareness  
3. **Role**: Defines reasoning approach and problem-solving lens  
4. **Phase**: Determines expected abstraction level and type of deliverable  
5. **Output Style**: Controls structure and verbosity  
6. **Tone**: Controls voice and personality  
7. **Interaction Mode**: Controls initiative and collaboration pattern  

Together, these elements ensure every response is aligned with context and ready for immediate use.

---

## 4. Context Initialization Flow

This section defines how an AI assistant should establish session context at the beginning of an interaction. The process ensures that all required context elements (user context, project, role, phase, output style, etc.) are correctly activated, confirmed, and aligned with the user's expectations before meaningful work begins.

---

### 4.1 Session Start Triggers

A session initialization flow should begin when any of the following occurs:

| Trigger | Example |
|---------|---------|
| **New conversation** | The user opens a fresh chat session or resets the assistant. |
| **New project environment detected** | The user opens an IDE session in a different repository or project folder. |
| **Explicit reset** | The user requests: "Reset context" or "Start a new session." |
| **Role or project uncertainty arises** | The assistant detects ambiguous context or conflicting instructions. |

---

### 4.2 Step-by-Step Initialization Lifecycle (Happy Path)

**Step 1 – Load User Context**  
User Context is always assumed or loaded as the foundational identity/preference layer.  
Example: "User prefers structured, technical explanations and iterative refinement."

**Step 2 – Detect Project Context (if possible)**  
If the environment provides metadata (e.g., repository name, workspace fingerprint), the assistant may attempt a project suggestion.  
Example: "It looks like you are working in a project named `backend-api-service`. Use this project context?"

**Step 3 – Confirm or Request Project Selection**  
If detection is confident -> assistant confirms and activates.  
If unclear -> assistant lists known projects or asks for a description.  
Example: "Yes, use this project." / "No, load the UI project." / "I am starting a new one."

**Step 4 – Apply Default Role & Phase for the Project**  
Each project may define a default role and typical starting phase.  
Example: "Default mode: Architect; Phase: Planning. Continue or change?"

**Step 5 – Confirm State or Offer Adjustment**  
Assistant provides a concise session summary and allows modification.  
Example:  
Active Context:
- Project: backend-api-service
- Role: Architect
- Phase: Planning
- Output Style: Structured
Continue or adjust?

**Step 6 – Begin Work**  
Once confirmed, assistant transitions into operational mode and proceeds based on the established state.

---

### 4.3 Flow Description (Including Alternate Paths)

```
START SESSION
  |
  v
Load User Context (always)
  |
  v
Attempt project detection
  |
  |--Yes, confident -> Suggest project & get confirmation
  |    |
  |    |--User confirms  Project activated
  |    |--User rejects -> Ask for project selection/definition
  |
  |--No or unsure -> Ask user to confirm/select/define project
  |
  v
Project confirmed
  |
  v
Load default role & phase for that project
  |
  v
Assistant presents session state summary
  |
  v
User may confirm or modify:
  - Change role (e.g., Architect -> Developer)
  - Change phase (e.g., Planning -> Implementation)
  - Adjust output style or tone
  - Set interaction mode
  |
  |--User confirms -> Begin active session
  |--User modifies -> Update state & re-present summary
  |
  v
State confirmed -> Begin active session
```

**Alternate Paths:**
- **Unknown project**: Assistant requests project description or lists known projects
- **Ambiguous task**: Assistant infers context but asks for confirmation before proceeding
- **Immediate task**: User issues task before initialization -> Assistant requests minimal context needed
- **Context conflict**: Assistant detects mismatch between task and current state -> Suggests transition

---

### 4.4 Behavior When User Immediately Issues a Task

If the user issues a task before explicit initialization:

The assistant should infer whether context is already established or missing.  
If no project is known, it should request clarification rather than proceed under incorrect assumptions.  
If the task implies a role (e.g., "rewrite this function"), the assistant may suggest switching roles.  
Execution begins only after context is clarified.

Example:
User: "Create a database schema for user accounts."
Assistant: "Should I assume we are in an API backend project, using Developer Mode in Implementation Phase?"

---

### 4.5 When Explicit Confirmation May Be Skipped (Experienced Sessions)

If:
A valid session state is already established,  
The task aligns with the current context,  
No conflicts are detected,  
-> The assistant may proceed without re-confirming context.

However, the user may always issue the project’s namespaced context command (e.g., `/tag.context`) to request a recap.

---

### 4.6 Recommended Initial Context Summary Format
Active Context:
- Project: [project name]
- Role: [e.g., Developer]
- Phase: [e.g., Implementation]
- Output Style: [e.g., Minimal Code]
- Tone: [e.g., Direct]
Ready to proceed.

---

## 5. State Confirmation & Visibility

Once the session context has been initialized, the assistant must make it easy for the user to remain aware of the active configuration. Transparency builds trust, supports cognitive alignment, and prevents the assistant from operating under incorrect assumptions.

---

### 5.1 When the Assistant Should Present the Active Context

| Situation | Should Confirm Context? | Example |
|-----------|------------------------|---------|
| After initial setup | Yes | "Context established: Project backend-api, Role Developer…" |
| After project, role, phase, or style changes | Yes | "Switched to Developer Mode…" |
| After a long pause or reconnection | Recommended | "Resuming in Planning Phase…" |
| After user expresses uncertainty | Yes | "Yes, current Phase is Implementation." |
| During continuous aligned work | Not required | Assistant continues executing tasks |

---

### 5.2 Confirmation Format (Standard)

A confirmation should be:
Concise  
Structured and readable  
Focused only on active session state  

Example:
Active Context:
- Project: Mobile UI App
- Role: Developer
- Phase: Implementation
- Output Style: Minimal Code
- Tone: Direct

---

### 5.3 Optional Compact Format

For users who prefer minimal distraction, a single-line summary may be used:
[Developer - Implementation - Mobile UI App - Minimal Code]

Users should be able to specify a preferred summary style (full vs compact).

---

### 5.4 User-Initiated Context Recall

Users should be able to explicitly request active context using natural language or commands.  
Example triggers:
"/tag.context"
"What mode are we in?"
"Remind me of our current phase."

The assistant responds with the summary format preferred by the user.

---

### 5.5 Silent Internal Checks

Even when not explicitly confirming state, the assistant should **internally verify alignment** between incoming tasks and the current context. If a mismatch is detected:

The assistant may *suggest* a context transition.  
It must not assume a transition without confirmation.

Example:
User: "Please produce a fully coded implementation with minimal comments."
Assistant: "Would you like to switch to Developer Mode and Implementation Phase with Minimal Code output?"

---

### 5.6 Restoring State After Session Persistence

If session persistence is supported:
The assistant may reload a saved context and present it for confirmation:
"Previous session state restored: Project backend-api | Developer Mode | Debugging Phase. Continue?"

If uncertain, it should ask the user to confirm or adjust.

---

By maintaining clear visibility and recallability of state, the assistant ensures users always understand how it is currently reasoning and responding.

---

## 6. State Transition Rules

This section defines when and how session state elements (Project, Role, Phase, Output Style, Tone, Interaction Mode) may change during an active session. Transitions ensure that assistant behavior remains aligned with evolving user needs while maintaining clarity and determinism.

---

### 6.1 General Transition Principles

Any session element may be updated during a session.  
Transitions may be triggered explicitly by user command or implicitly by context shifts.  
The assistant must confirm transitions when intent is not fully clear.  
Significant transitions should be followed by a brief state summary.  
Transitions should not reset unrelated state elements.

---

### 6.2 Valid Transition Triggers

| State Element | Explicit Trigger Example | Implicit Trigger Example | Requires Confirmation? |
|---------------|--------------------------|---------------------------|------------------------|
| **Project** | "Switch to the dashboard project." | User tasks clearly reference a different codebase | Always |
| **Role / Mode** | "Switch to Architect Mode." | Request changes from code writing to system reasoning | Recommended |
| **Phase** | "We are now in implementation." | Continuous coding after planning | Recommended |
| **Output Style** | "From now on, minimal code only." | Repeated requests to skip explanations | Unless conflicts arise |
| **Tone** | "Be more concise." | Rarely inferred; typically user-driven | If explicit |
| **Interaction Mode** | "Let's pair-program this." | Ambiguous unless explicitly stated | If unclear |

---

### 6.3 Project Transition Behavior

When changing projects:
The assistant must confirm the change.  
Default role and phase for the new project may be suggested.  
A summary of the new active state must be presented.

Example:
User: "Switch to the DevOps automation project."
Assistant: "Switching from Mobile UI Toolkit to DevOps Automation. Suggested: Role = Pipeline Engineer, Phase = Implementation. Confirm or adjust?"

---

### 6.4 Role Transition Behavior

When the role changes, the assistant should update its reasoning approach and expected response structure.

Example:
User: "Switch to Architect Mode."
Assistant: "Role updated to Architect. Phase remains Planning."

The assistant may warn about mismatched combinations:
Assistant: "Architect Mode typically aligns with Planning or Review. Continue using it in Implementation Phase?"

---

### 6.5 Phase Transition Behavior

Each phase affects how detailed or abstract responses should be.

| Phase | Expected Assistant Behavior |
|-------|-----------------------------|
| Planning | Explore options, clarify requirements |
| Implementation | Provide concrete solutions or code |
| Debugging | Investigate issues and propose fixes |
| Review | Evaluate, critique, and refine |

Example:
User: "We're ready to move to implementation."
Assistant: "Phase updated: Implementation. Remaining in Developer Mode."

---

### 6.6 Output Style Transition Behavior

Output Style changes only affect formatting/verbosity, not reasoning.  
If the requested style could conflict with the active role or phase, the assistant should clarify.

Example:
User: "From now on, respond with minimal code."
Assistant: "Output Style updated: Minimal Code. Explanations will be omitted unless requested."

---

### 6.7 Tone & Interaction Mode Transitions

Tone changes modify voice but not reasoning.  
Interaction Mode changes define how proactive the assistant should be.

| Interaction Mode | Assistant Behavior |
|-----------------|-------------------|
| Advisory Mode | Answers on demand, low proactivity |
| Pair-Programming Mode | Provides step-by-step collaboration |
| Driver Mode | Leads the process with strong initiative |

Example:
User: "Let's pair-program this."
Assistant: "Interaction Mode set to Pair-Programming. I'll proceed step-by-step and confirm progress."

---

### 6.8 Refusing or Reversing Transitions

If the user explicitly rejects a suggested transition, no change is made.  
Example:
Assistant: "Switch to Architect Mode?"
User: "No, stay in Developer Mode."
Assistant: "Understood. Remaining in Developer Mode."

Users can revert transitions:
User: "Return to Planning Phase."

---

### 6.9 Post-Transition Summary

After major changes (especially Project, Role, or Phase), the assistant should summarize the new context in either full or compact form:
Active Context Updated:
- Project: DevOps automation
- Role: Pipeline Engineer
- Phase: Implementation
- Output Style: Structured

---

This ensures that all transitions are intentional, reversible, and transparent, preserving alignment and trust throughout the session.

---

## 7. Command & Natural-Language Control Surface

A compliant assistant must support both natural language interaction and structured command-style controls for managing session context. This dual-surface approach accommodates users who prefer conversational guidance as well as those who favor precision and speed.

---

### 7.1 Natural Language Control (Conversational Adjustments)

The assistant should recognize clearly expressed changes made via everyday language.

Example interpretations:

| User says… | Assistant interprets as… |
|------------|-------------------------|
| "Switch to Architect Mode." | Set Role = Architect |
| "We're moving into implementation now." | Set Phase = Implementation |
| "Give me only code from now on." | Set Output Style = Minimal Code |
| "Be more concise and direct." | Adjust Tone = Concise, Direct |
| "Let's pair-program this step by step." | Set Interaction Mode = Pair-Programming |
| "We're working on the authentication service now." | Set Project = Authentication Service |

If unclear, the assistant must ask clarifying questions rather than assume a transition.

---

### 7.2 Structured Command Interface (Explicit Control Layer)

A compact command syntax allows direct manipulation of session elements. This is especially useful for experienced users or when integrated into IDE tooling and UI-driven interfaces.

| Command | Parameters | Description |
|---------|------------|-------------|
| `/tag.project [name]` | Project name or label | Switches the active project |
| `/tag.mode [role]` | e.g., architect, developer, reviewer | Changes assistant role |
| `/tag.phase [name]` | planning / implementation / debugging / review | Updates work phase |
| `/tag.style [name]` | step-by-step / minimal / annotated | Sets verbosity and formatting |
| `/tag.tone [style]` | formal / direct / encouraging | Changes communication tone |
| `/tag.interact [mode]` | advisory / pair / driver | Adjusts assistant initiative |
| `/tag.context` | — | Displays current session state |
| `/tag.reset` | — | Clears session state (except user context) |

Commands may be combined if unambiguous:
/tag.project backend-api /tag.mode developer /tag.phase implementation

---

### 7.3 Confirmation and Error Handling

If a command is valid and complete, the assistant executes it and provides a confirmation summary.  
If information is missing, the assistant prompts for clarification:

/tag.project
Assistant: "Please specify a project name."

If a conflict arises, clarification is required:
/tag.mode architect /tag.phase implementation
Assistant: "Architect Mode is typically used in Planning or Review. Continue using it with Implementation Phase?"

If the command is malformed, the assistant should suggest available options:
/tag.style blazingfast
Assistant: "'blazingfast' is not a recognized style. Available: step-by-step, minimal, annotated."

---

### 7.4 Priority and Coexistence

| Input Type | When to Use | Assistant Behavior |
|------------|------------|--------------------|
| Natural language | Most conversational or exploratory sessions | Assistant interprets intent |
| Structured commands | Fast state changes, automation, or UI integrations | Assistant applies directly |
| Mixed expressions | Allowed ("Switch to Developer Mode /tag.phase implementation") | Assistant parses both parts |

---

### 7.5 Discoverability and Support

Users should be able to ask for available commands by saying:  
"What commands can I use?" or /tag.help

The assistant may reference structured commands as tips when users repeatedly perform similar transitions:
"You can also switch mode quickly by using: /tag.mode developer"

If supported by UI, commands may be auto-completed (optional future enhancement).

---

### 7.6 Command Namespacing (Collision Avoidance)

In environments with multiple instruction sets or agent packs, command collisions are common.  
To avoid ambiguity, projects must define a **command namespace** prefix that uniquely scopes commands.

**Recommended pattern:**
- Use a short, lowercase project tag as a prefix (3-6 characters)
- Format: `/tag.command` (preferred) or `/tag-command` (fallback)

**Examples:**
- `/ack.context` for AI Context Kit
- `/ack.mode developer`
- `/ack.phase implementation`

**Guidelines:**
- The namespace must be documented in project instructions
- Provide unprefixed aliases only if explicitly documented
- When both prefixed and unprefixed commands exist, prefixed commands take priority

This keeps command discovery simple while preventing collisions across tools.

---

By supporting both conversational and command-style control, the assistant accommodates a range of workflows—casual, exploratory, high-speed, automated, or UI-assisted.

---

## 8. Project Context Defaults & Profiles

Different projects may require different assistant behaviors. To streamline session initialization and ensure contextual relevance, each project may define a set of defaults that automatically apply when the project is activated. These defaults serve as recommended starting points and can always be overridden by the user.

---

### 8.1 Purpose of Project Defaults

Project defaults exist to:
- Accelerate session setup
- Ensure role and phase assumptions align with typical workflow expectations
- Promote consistent assistant responses within a given domain
- Minimize repeated configuration when returning to a project

Defaults are soft suggestions, not strict rules. The user may accept, adjust, or replace them.

---

### 8.2 Default Project Profile Structure (Example Schema)

| Field | Description | Required |
|-------|-------------|----------|
| `name` | Project identifier | Yes |
| `description` | Short description of the project focus | Yes |
| `default_role` | Assistant’s recommended starting role | Yes |
| `default_phase` | Likely phase when work begins | Yes |
| `default_output_style` | Typical response style | Optional |
| `default_tone` | Preferred communication tone | Optional |
| `supported_roles` | Roles that apply to the project context | Optional |
| `notes` | Additional constraints or preferences | Optional |

---

### 8.3 Example Profiles (Generic Illustrations)

| Project Type | Default Role | Default Phase | Output Style | Tone | Notes |
|--------------|-------------|--------------|--------------|------|-------|
| Backend API Service | Developer | Implementation | Structured code with brief explanations | Direct | Transitions to Debugging Phase common |
| New Product Concept | Architect | Planning | Exploratory, comparative analysis | Analytical | Focus on trade-offs |
| Prompt Testing Framework | Prompt Engineer | Iterative Testing | JSON or schema-aligned | Precise | Deterministic outputs are critical |
| Mobile App UI | UI Developer or Designer | Planning or Implementation | Annotated UI concepts or code | User-centered | Often alternates between visuals and code |
| Data Processing Pipeline | Automation Engineer | Design or Implementation | Process flow breakdowns and batch scripts | Technical | Performance considerations important |

---

### 8.4 Defaults as Soft Hints

Defaults provide an initial configuration only. They do not restrict the user. After applying defaults, the assistant should confirm:
Detected project: Data Pipeline
Suggested defaults: Role = Automation Engineer, Phase = Planning, Output Style = Analytical
Continue or modify?

---

### 8.5 Adaptive Defaults (Optional Enhancement)

If a user consistently overrides defaults (e.g., always enters Review Mode first), the assistant may suggest updating defaults. Such updates should require explicit confirmation.

Example:
I notice that you often begin this project in Review Mode. Shall I set Review as the new default phase?

---

### 8.6 Lifecycle-Based Defaults

As projects evolve, defaults may shift. For example:

| Project Stage | Default Role | Phase |
|---------------|-------------|-------|
| Early MVP Design | Architect | Planning |
| Active Feature Development | Developer | Implementation |
| Pre-release | QA Reviewer | Review |
| Post-release Maintenance | Developer or Debugger | Debugging |

On project stage change, the assistant may prompt:
The project is now in pre-release review. Switch defaults to Reviewer Mode in Review Phase?

---

### 8.7 Summary

Project defaults streamline initialization and reinforce workflow consistency while preserving flexibility. They form a foundation that the user can refine based on task demands, project lifecycle, or evolving preferences.

---

## 8.8 Documentation Formatting Guidelines

To maintain professional clarity and reduce visual noise in instruction files (user context instructions, project instructions, specification documents), the following formatting guidelines are recommended:

### 8.8.1 No Decorative Icons or Emojis

**Guideline:** Context files should not include decorative icons, emojis, or non-textual visual markers in section headers or throughout documentation.

**Rationale:**
- **Professional appearance** – Technical documentation benefits from clean, distraction-free formatting
- **Parsing consistency** – Emojis can interfere with automated parsing, grep searches, and version control diffs
- **Accessibility** – Screen readers may handle emojis inconsistently or announce them unnecessarily
- **Cross-platform compatibility** – Emoji rendering varies across systems and fonts
- **Focus on content** – Visual decorations shift attention away from semantic meaning

**Correct Examples:**
```markdown
## Session Prerequisites
## State Management & Control
### Context Visibility
```

**Incorrect Examples:**
```markdown
## 📋 Session Prerequisites
## 🔄 State Management & Control
### 📍 Context Visibility
```

### 8.8.2 Consistent Markdown Structure

- Use standard Markdown headers (`##`, `###`) without decoration
- Use clear, descriptive section names without symbolic prefixes
- Maintain consistent indentation and spacing
- Use code blocks (` ``` `) for technical examples
- Use tables for structured data presentation
- Use bullet points and numbered lists for clarity

### 8.8.3 YAML Frontmatter for Metadata

All context files should begin with YAML frontmatter. The expected fields depend on the file type:

#### Instruction Files (User Context, Project Instructions)

Instruction files should use a **minimal, portable frontmatter** that is stable across tooling:

- `description`
- `applyTo: "**/*"`

Project instruction files may additionally include a stable identifier such as `name` (a lowercase slug), if used by tooling. Avoid adding speculative metadata fields that validators or loaders do not recognize.

#### Specification / Reference Documents

Specification and reference documents may use **extended metadata**, such as:

- `version`
- `context_type`
- `document_type`
- `created`
- `last_updated`
- `status`
- other documentation-specific fields

**Example:**
```yaml
---
version: 1.0.0
spec_version: 1.0
context_type: project
project_name: ExampleProject
created: 2025-10-20
last_updated: 2025-10-20
status: active
user_context_file: ../name_surname_usercontext.instructions.md
---
```

### 8.8.4 File Path Conventions

To keep cross-references stable across templates, prompts, validators, and documentation, repositories using this specification should adopt **predictable, canonical paths**.

Recommended canonical paths:

- `templates/`
  - Canonical instruction templates (user context + project instructions)
- `prompts/`
  - Instruction creation and validation prompts
- `specs/context_aware_ai_session_spec.md`
  - Authoritative specification document
- `projects/`
  - Project-specific instruction files
- Root `README.md`
  - Human-facing entry point and workflow documentation

#### Path Stability Rules

- Do not rename or move these directories without updating:
  - README references
  - specification cross-references
  - creation and validation prompts
- Instruction files should reference the specification by **relative path**, not URL
- Validators and generators may assume these paths by convention

If paths must change, update the specification and README first, then adjust prompts and validators accordingly.

---

## 9. Example End-to-End Scenarios

This section demonstrates how the assistant applies session logic in different conversational scenarios, including initialization, transitions, and continuation. Each scenario illustrates how user intent influences the session state and how the assistant responds in alignment with the specification.

---

### 9.1 Scenario A – Fresh Session with Project Detection and User Confirmation

User opens a chat environment integrated in an IDE, within a repository named 'mobile-ui-app'.
Assistant: It appears you are working in a project named 'mobile-ui-app'. Would you like to activate this project context?
User: Yes.
Assistant: The suggested default role for this project is UI Developer in the Planning Phase, with structured explanations. Would you like to continue with these defaults or modify?
User: Switch role to Developer but stay in Planning Phase.
Assistant: Session Context:
- Project: mobile-ui-app
- Role: Developer
- Phase: Planning
- Output Style: Structured
- Tone: Neutral
Ready to proceed.

---

### 9.2 Scenario B – Implicit Initialization Triggered by Task Request

The user begins with a task without prior initialization.
User: Generate the initial database schema for product reviews.
Assistant: To ensure alignment, should I assume this task belongs to a backend API project, with Developer Role in Implementation Phase?
User: Yes, backend API project, Developer Mode, Implementation Phase. Make the output concise.
Assistant: Session Context:
- Project: backend-api
- Role: Developer
- Phase: Implementation
- Output Style: Concise
- Tone: Direct
Now generating schema...

---

### 9.3 Scenario C – Role Shift Due to Conceptual Change

The conversation transitions from implementation to design-level reasoning.
User: Now let's think about how this backend should scale globally before adding more code.
Assistant: This involves higher-level system reasoning. Would you like to switch to Architect Role and return to Planning Phase?
User: Yes, switch.
Assistant: Session Context Updated:
- Project: backend-api
- Role: Architect
- Phase: Planning
I will now provide scaling strategies.

---

### 9.4 Scenario D – Phase Transition During Development

The team completes design and moves into execution.

User: We have agreed on the design. Implement the data access layer now.
Assistant: Would you like to switch to Developer Role in Implementation Phase?
User: Yes.
Assistant: Session Context Updated:
- Role: Developer
- Phase: Implementation
Beginning implementation.

---

### 9.5 Scenario E – Output Style Override Without Role Change
User: From now on, produce only code responses without explanations.
Assistant: Output Style updated to Minimal Code. I will omit explanations unless explicitly requested.

---

### 9.6 Scenario F – Full Context Reset and Reinitialization
User: Reset the session.
Assistant: Session context has been cleared. User context preferences remain active. Please specify the new project or provide a task to start.
User: We are working on a prompt-testing tool project. Begin in Prompt Engineer Role, Testing Phase, JSON output.
Assistant: Session Context:
- Project: prompt-testing tool
- Role: Prompt Engineer
- Phase: Testing
- Output Style: JSON-focused
- Tone: Technical
Proceeding with schema-based validation approach.

---

These examples illustrate predictable transitions, explicit confirmations, and context persistence, demonstrating how the session model supports both guided initialization and dynamic adjustment during complex multi-phase interactions.

---

## 10. Future Enhancements (Optional / Evolutionary)

The core model defined in this specification provides a structured, deterministic foundation for context-aware AI collaboration. However, additional enhancements may be optionally introduced to improve usability, adaptability, and automation. These enhancements must remain optional and should never compromise explicitness, transparency, or user control.

### 10.1 Session Persistence & Checkpointing
Sessions may be saved to a structured file (e.g., JSON or Markdown with frontmatter) that captures active session state and key context. This enables deterministic restores across tools, supports portability, and improves auditability. Checkpoints define when and how snapshots are created, restored, and reconciled. Persistence and checkpointing should be optional and always user-approved.

### 10.2 Context Compression Handling
For long sessions, the assistant may propose a compressed summary that preserves active state, constraints, key decisions, open tasks, and file references. Compression should be explicit, user-confirmed, and reversible.

### 10.3 Automatic Phase Inference
The assistant may observe repeated task patterns (e.g., extended implementation work) and suggest transitioning to a corresponding phase. Any inferred change must be confirmed before activation.
Example: "You have been requesting multiple code implementations. Should we enter Implementation Phase?"

### 10.4 Suggested Role Alignment
If a user repeatedly shifts task types (e.g., from conceptual planning to coding), the assistant may recommend a more fitting role.
Example: "This request aligns more with Developer Mode. Would you like to switch modes?"

### 10.5 Tone Adaptation Based on User Behavior
The assistant may optionally adjust tone based on the user’s communication style or explicit preference. This must be opt-in and based on user confirmation.

### 10.6 Multi-Role Comparative Reasoning
In advanced review scenarios, the assistant may offer responses from multiple roles for broader evaluation.
Example:
Architect Perspective: ...
Developer Perspective: ...
Reviewer Perspective: ...

### 10.7 Git Branch or Naming Convention Awareness
The assistant may optionally infer project phase or role based on branch naming conventions such as:
| Branch Prefix | Likely Phase | Role |
|---------------|-------------|------|
| feature/* | Implementation | Developer |
| design/* | Planning | Architect |
| bugfix/* or hotfix/* | Debugging | Developer or Debugging Mode |

Assistant prompt: "You are currently in a branch named feature/login-ui. Should I switch to Developer Mode in Implementation Phase?"

### 10.8 CI/CD and Release Readiness Integration
Near release checkpoints, the assistant may propose transitions to Review or QA modes to support documentation, changelog generation, or final auditing.

### 10.9 Lifecycle-Based Default Shifts
If the project moves through well-defined phases (e.g., MVP -> development -> testing -> maintenance), default profiles may adapt with user approval.
Example: "This project has moved to testing. Change default Phase to Review and Role to QA Reviewer?"

### 10.10 Multi-User Collaboration Extension (Future Model Support)
In multi-user environments, different team members may require different role-focused interactions within the same project. Future implementations could support switching contextual interpretations depending on user identity or prompt attribution.

### 10.11 UI and Tooling Integration
Future implementations could include:
- Visual dashboards showing current session context
- Quick toggles for role or phase changes
- Command auto-completion
- Visual indicators of context transitions

### Summary
These enhancements are intended as additive optimizations that improve usability and flow once the core deterministic model is firmly established. They should be introduced carefully, always preserving user control, clarity, reversibility, and reasoning transparency.

---

## 11. Conclusion

This specification establishes a structured, deterministic, and user-aligned framework for how AI assistants should manage, maintain, and evolve session context in complex, project-driven workflows. Rather than treating each interaction as an isolated query, this model enables the assistant to act as a persistent, adaptive collaborator that aligns with the user’s intent, role, task phase, and communication expectations.

By defining a formal session state composed of User Context, Project, Role, Phase, Output Style, Tone, and Interaction Mode, this framework ensures continuity, reduces repetitive context setup, and enables more accurate, high-quality responses over time. The initialization flow establishes clear entry conditions; transition rules ensure clarity and reversibility; state confirmation and on-demand visibility build trust; and structured as well as natural-language controls offer flexibility across different user preferences.

Real-world scenarios illustrate how the assistant behaves when transitioning across stages such as planning, implementation, debugging, and review, while future enhancements highlight paths toward smarter inference, multi-role perspectives, context checkpointing, and lifecycle-aware automation.

This model is domain-agnostic, implementation-neutral, and compatible with a wide range of environments—from chat-based assistants to IDE copilots, MCP-driven agent systems, and specialized domain workflows. It provides a stable foundation for designing AI systems that support deeper, context-rich collaborations without sacrificing clarity or control.

By adopting this specification, developers and AI system designers can create assistants that think within the user's working world, not in isolation from it—supporting authenticity, predictability, efficiency, and long-term trust.

---

## 12. Glossary of Core Terms

| Term | Definition |
|------|-----------|
| **Session** | A continuous interaction period with the assistant in which context is preserved until explicitly reset or modified. |
| **User Context** | The user's profile, including preferences, expertise level, communication expectations, and recurring stylistic requirements. |
| **Project** | The active domain or body of work (e.g., codebase, product concept, design system) within which all tasks are currently contextualized. |
| **Role / Mode** | The cognitive stance adopted by the assistant, defining the reasoning style (e.g., Architect, Developer, Prompt Engineer, Reviewer). |
| **Phase** | The stage of work within the project lifecycle (e.g., Planning, Implementation, Debugging, Review, Refactoring). |
| **Output Style** | The desired structure and verbosity of responses (e.g., annotated explanation, minimal code-only, step-by-step breakdown). |
| **Tone** | The communication voice or attitude used by the assistant (e.g., direct, neutral, analytical, mentoring, concise). |
| **Interaction Mode** | Defines how proactive or guided the assistant should be (e.g., advisory, pair-programming, driver-led interaction). |
| **State Transition** | A deliberate change in one or more session elements—such as switching from Planning to Implementation Phase or from Architect Mode to Developer Mode. |
| **Default Profile** | A set of recommended initial values (role, phase, style, tone) established for a specific project to streamline session initialization. |
| **State Confirmation** | A summary communicated by the assistant that verifies the active session context, typically after initialization or a transition. |
| **Determinism** | The property ensuring that identical queries under identical session contexts produce consistent assistant behavior and comparable outputs. |
