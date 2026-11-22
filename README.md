# AI Context Kit

> **Author:** Marco Siccardi (MSiccDev Software Development)  
> **Purpose:** An AGENTS-first, skills-first framework for maintaining consistent, context-aware AI collaboration across different LLM providers, projects, and development phases.



## Overview

This repository provides a **comprehensive AGENTS-first context and workflow system** designed to enable consistent, context-aware AI collaboration across multiple projects and platforms.

## Primary Agent Entrypoint

- Root `AGENTS.md` is the primary operational entrypoint for agents in this repository.
- `specs/context_aware_ai_session_spec.md` is the normative source of truth for the full session model.
- `docs/spec-rationale.md` is the companion document with background reasoning, extended examples, and future enhancement notes.

### The Evolution

What began as a way to extract and reuse prompts across AI providers has evolved into a sophisticated architecture for AI collaboration:

- **Layered architecture** – Personal user context + project `AGENTS.md` context create complete AI workspace configurations
- **Skill-based workflows** – Create and validate context files using reusable skills with detailed operational logic
- **Provider-agnostic** – Designed to work across different LLM environments; results may vary by platform

### The System

This framework consists of:
- **Personal user context artifacts** – Your professional identity, skills, preferences, and working style
- **Project-specific `AGENTS.md` context** – Scope, tech stack, roles, objectives, and operational guidance per project
- **Skill workflows in `skills/`** – Canonical create/validate/governance operational logic
- **Session specification** – How AI assistants should maintain and adapt context during work sessions
- **Templates in `templates/`** – Canonical artifact structures aligned to the spec

All components are designed to work across hosted and local LLM environments, ensuring that every AI assistant understands your background, working style, and project context without repeated explanations. You may need to adjust your context files for specific platforms.

---

## See It In Action

The same question, with and without AI Context Kit loaded:

**Without AI Context Kit:**
> User: "Help me add authentication to the app."
>
> AI: "Sure! What framework are you using? What kind of auth — OAuth, JWT, sessions? What's your backend stack?..."

*The AI starts from scratch every session.*

**With AI Context Kit loaded:**
> User: "Help me add authentication to the app."
>
> AI: "Given your SwiftUI codebase and the TCA architecture you're migrating to, I'd model this as a new `AuthenticationFeature` reducer rather than adding it to an existing one. Want me to scaffold the reducer and effect first, or start with the SwiftUI view bindings?"

*The AI already knows your stack, your existing patterns, and your preferences.*

The difference is not magic — it is reduced friction. The AI spends zero turns asking who you are, what you are building, or how you like to work. That adds up significantly across a full development session.

---

## Repository Structure

```
ai-context-kit/
│
├── AGENTS.md                                        # Primary agent entrypoint for this repository
├── README.md                                        # This file
├── CHANGELOG.md                                     # Release notes, breaking changes and migration steps
├── LICENSE                                          # MIT License file
├── THIRD_PARTY_NOTICES.md                           # Licenses of adapted work and the skills that adapt it
├── install.md                                       # Agent-executable front door: runs the installer, then ack-setup
│
├── .claude-plugin/                                  # Claude Code plugin and marketplace manifests
├── .codex-plugin/
│   └── plugin.json                                  # Codex plugin manifest
├── .agents/
│   ├── plugins/
│   │   └── marketplace.json                         # Repo-scoped Codex marketplace
│   └── skills/                                      # Codex skill discovery links to skills/
├── .github/workflows/                               # Installer tests, drift check, version sync, npm release
│
├── specs/
│   └── context_aware_ai_session_spec.md             # Specification for AI session management
│
├── templates/
│   ├── usercontext_template.instructions.md         # Canonical v2.0.0 user context template (authoritative)
│   ├── AGENTS_template.md                           # Canonical AGENTS template (authoritative)
│   ├── openspec_config_block.yaml                   # Kit context and rules the installer adds to openspec/config.yaml
│   └── skill_template/SKILL.md                      # Canonical skill template
│
├── skills/
│   ├── README.md                                    # Canonical location for skill instances
│   ├── ack-*/                                       # Create, validate, checkpoint, governance, session and setup skills
│   └── ack-loop-01-readiness/ … ack-loop-05-commit/ # Implementation loop, one skill per step (invoke in order)
│
├── installer/                                       # @msiccdev/ai-context-kit: the npm installer (TypeScript)
├── docs/
│   ├── adr/                                         # Architecture decision records; start with README.md
│   └── plans/                                       # Adoption plans
└── openspec/                                        # OpenSpec root for the kit's own changes
```

---

## Core Concepts

### The AGENTS + Skills Distinction

**`AGENTS.md` files** define persistent operational context:
- WHO is collaborating (user/project context)
- WHAT the project scope and constraints are
- HOW collaboration should run (roles, phases, tone, interaction mode)

**`skills/*/SKILL.md` files** define reusable workflows:
- How to create artifacts (for example, AGENTS or user context files)
- How to validate artifacts and report findings
- How to keep workflow logic centralized and auditable

**Day-to-day requests** are task directives executed within that context:
- "Create a new API endpoint"
- "Review this code for security issues"
- "Run the AGENTS validation workflow and list blocking issues"

All workflow logic lives in `skills/`, including the implementation loop: `ack-loop-01-readiness` → `ack-loop-02-implement` → `ack-loop-03-review` → `ack-loop-04-learnings` (optional) → `ack-loop-05-commit`. There are no separate prompt files (ADR-010).

---

## Canonical Authority (Spec v2.0.0)

When guidance differs across files, use this authority order:

1. `specs/context_aware_ai_session_spec.md` (normative)
2. `templates/` (canonical artifact structures)
3. `skills/` (canonical operational workflows, including the implementation loop)
4. `usercontexts/` and validation artifacts (illustrative examples)

Canonical template structures live in:
- `templates/usercontext_template.instructions.md`
- `templates/AGENTS_template.md`
- `templates/skill_template/SKILL.md`

These templates are spec-aligned and are the structures expected by canonical create/validate workflows.

### 1. **Personal User Context Instructions**
Your foundational AI context that includes:
- Professional background and current role
- Technical skills and expertise areas
- Active projects and goals
- Preferred working style and communication preferences
- Constraints and limitations

**Purpose:** Serves as the base personal context layer that AI assistants load first to understand who you are and how you work globally.

### 2. **AGENTS.md as Project Context**
Project-level AGENTS.md defines:
- Project scope and objectives
- Technology stack and architecture
- Recommended AI roles (Architect, Developer, Designer, etc.)
- Default work phases (Planning, Implementation, Debugging, Review)
- Project-specific constraints and guidelines

**Purpose:** Provides focused, project-specific operational context layered on top of user context.

### 3. **Session State Model**
Session state is the active set of context values that governs assistant behavior during a working session.

| Element | What It Controls | Default Source | User Modifiable? |
|---------|------------------|----------------|------------------|
| **User Context** | Identity, preferences, and baseline working style | `*.instructions.md` user context | Rarely (when profile/preferences change) |
| **Project** | Active codebase/domain assumptions and boundaries | Project `AGENTS.md` | Yes |
| **Role/Mode** | Reasoning stance (architecting, implementing, reviewing) | Project defaults in `AGENTS.md` | Yes |
| **Phase** | Current work stage and expected deliverable type | Project defaults in `AGENTS.md` | Yes |
| **Output Style** | Verbosity and response structure | Project defaults in `AGENTS.md` | Yes |
| **Tone** | Communication style | Project defaults in `AGENTS.md` | Yes |
| **Interaction Mode** | Initiative level (`advisory`, `pair`, `driver`) | Project defaults in `AGENTS.md` | Yes |

Note: Interaction Mode is optional in the abstract session model, but project `AGENTS.md` should define a default to keep startup behavior consistent and predictable.

State behavior rules:
- State persists across turns until explicitly changed or reset.
- No silent transitions: project, role, phase, style, tone, and interaction mode must not change implicitly.
- State can be changed with natural language or the user-invoked `ack-session` skill (`ack-session mode <role>`, `phase`, `style`, `tone`, `interact`).
- `ack-session context` shows current active state; `ack-session reset` returns to the project defaults.

**Purpose:** Keeps behavior consistent, transparent, and aligned as work moves between planning, implementation, debugging, and review.

---

## Agent Skills

This repository provides for reusable **Agent Skills** for authoring and validation.

- Documentation reference: https://agentskills.io/home *(third-party community site for the Agent Skills format — not maintained by this project)*
- Canonical paths:
  - `templates/skill_template/SKILL.md`
  - `skills/`

### Skill-First Authority Model
Operational workflow authority is skill-first:
1. `skills/` is the canonical source for create, validate, governance and loop workflow logic.
2. Skills are the only entrypoint; there are no wrapper prompt files.

### Skill Workflow
1. Author or update workflow behavior in `skills/*/SKILL.md` plus skill-local `references/`.
2. Keep detailed operational logic in skills and their `references/`.
3. Always validate skills and keep `SKILL.validation.md` current.

> **Validation scope:** Validation scores reflect structural compliance with the spec format as assessed by an AI model against a structured scoring rubric intended to be applied consistently. They do not guarantee real-world session effectiveness or consistent LLM behavior across providers. Treat scores as a structural checklist result, not a quality certification.

### Available Skills
- `skills/ack-create-user-context/`
- `skills/ack-create-agents-md/`
- `skills/ack-validate-user-context/`
- `skills/ack-validate-agents-md/`
- `skills/ack-drift-control/`
- `skills/ack-openspec-check/` (OpenSpec version and upgrade check)
- `skills/ack-create-skill/`
- `skills/ack-validate-skill/`
- `skills/ack-create-checkpoint/`
- `skills/ack-restore-checkpoint/`
- `skills/ack-session/` (session state control)
- `skills/ack-guide/` (which skill to run next; phase boundaries)
- `skills/ack-setup/` (first setup after the kit installer)
- `skills/ack-interview/` and `skills/ack-interview-with-context/` (settle decisions and terms)
- `skills/ack-tdd/` (test-driven implementation at agreed seams)
- `skills/ack-loop-01-readiness/` to `skills/ack-loop-05-commit/` (the implementation loop)

### Invoking Skills

Each skill declares who may start it in `metadata.invocation`:

- **`user`** (create, validate, governance and loop skills): only you start it. These skills also carry `disable-model-invocation: true`, so Claude Code never loads them on its own; `/name` still runs them.
- **`model`** (`ack-create-checkpoint`, `ack-restore-checkpoint`, `ack-openspec-check`, `ack-interview`, `ack-tdd`): the assistant may start it, for example to propose a checkpoint at session end or to check the OpenSpec version before relying on it.

`disable-model-invocation` is a Claude Code extension outside the Agent Skills spec. Uploading a skill to claude.ai or the Skills API fails on unknown keys, so delete that one line from a user-invoked skill before uploading it. Pasting a skill into a chat or adding it as project knowledge works unchanged.

Skills are invoked by loading the skill's `SKILL.md` content into your AI session. The method varies by platform:

| Platform | How to invoke a skill |
|----------|-----------------------|
| **Claude Projects** | Add the `SKILL.md` file to project knowledge, or paste its content into the project instructions field |
| **Claude (web)** | Paste the full `SKILL.md` content at the start of your conversation |
| **VS Code Copilot Chat** | Type `#file:skills/<skill-name>/SKILL.md` in the chat input to reference the file inline |
| **GitHub Copilot (coding agent)** | Reference or include the `SKILL.md` in your prompt file; the agent reads it as part of its context |
| **ChatGPT** | Paste the content into the chat, or upload the `SKILL.md` as a file attachment |
| **Local API** | Include the `SKILL.md` content in your system prompt when initializing a conversation |

In repo-aware environments (VS Code Copilot Chat with `#file:` access, Claude Projects with full repository knowledge), skill reference files in `references/` subfolders are resolved automatically by the AI when following the workflow. In paste-based or upload-based environments (ChatGPT, local API), attach or include the relevant reference files alongside `SKILL.md` for full workflow coverage.

### Neutrality And Safety
- Skills must remain provider-neutral and runtime-portable.
- Use relative paths for skill-local references.
- Treat tool execution permissions as explicit policy decisions.

---

## File Path Conventions

This repository relies on **stable, predictable file paths** so that AGENTS context, skills, specifications, and validators can reference each other safely.

The following paths are considered **canonical**:

- `AGENTS.md`
  - Primary agent entrypoint (repo-specific operational contract)
- `templates/`
  - Canonical instruction templates (spec v2.0.0)
- `skills/`
  - Canonical workflow skills (`SKILL.md`-based folders)
- `specs/context_aware_ai_session_spec.md`
  - Authoritative specification (v2.0.0)
- Root `README.md`
  - Human-facing entry point and workflow documentation

If paths must change, update the specification and README first, then adjust skills, prompts, and validators accordingly.

## Quick Start

### Install In A Repository

Install the kit into each repository you work in. The installer copies the `ack-*` skills into every tool's skills folder, adds a short kit block to `AGENTS.md` (and a `CLAUDE.md` that imports it for Claude Code), sets up OpenSpec, and records what it wrote so updates never overwrite your edits. It needs Node.js 22.12 or later.

**Let your agent do it.** Paste this into your coding agent:

```text
Follow https://github.com/MSiccDev/ai-context-kit/blob/main/install.md
```

It checks Node and OpenSpec, asks before installing anything, runs the installer, and tells you how to start `ack-setup`.

**Or run it yourself** from the repository root, naming your tools (`claude`, `codex`, `github-copilot`, `agents`):

```bash
npx @msiccdev/ai-context-kit@latest init --tools claude,codex
```

Always use the scoped name: the unscoped `ai-context-kit` on npm is an unrelated package. The installer sets up OpenSpec, which sends anonymous usage statistics by default; to turn them off, run `openspec config set telemetry.enabled false` (machine-wide) or set `OPENSPEC_TELEMETRY=0`; the installer asks before setting it (spec section 11.8). See [`installer/README.md`](installer/README.md) for `update`, `doctor` and `tools`.

### For First-Time Users

1. **Install the kit** in your repository, as above.
2. **Run `ack-setup`** (`/ack-setup` in Claude Code and GitHub Copilot, `$ack-setup` in Codex). It checks OpenSpec, your project's `AGENTS.md` and your user context, and tells you which skill to run next:
   - `ack-create-agents-md` writes the project context (`AGENTS.md`); `ack-validate-agents-md` checks it.
   - `ack-create-user-context` writes your personal user context file, kept outside the repository; `ack-validate-user-context` checks it.
3. **Load your user context** into your AI environment; see [Loading Context in Different AI Platforms](#loading-context-in-different-ai-platforms).

Prefer to work by hand? Copy `templates/usercontext_template.instructions.md` and `templates/AGENTS_template.md` and fill them in.

### For Returning Users

- Load your user context artifact as the base context
- Add the relevant project `AGENTS.md` context on top
- Use `ack-session` (for example `ack-session context`) to inspect or adjust active session state, and `ack-guide` to find the right skill for the next step

---

## Loading Context in Different AI Platforms

| Platform | Method | Limitations / Notes |
|----------|---------|---------------------|
| **Anthropic Claude Projects** | Add user context and `AGENTS.md` to project knowledge or project instructions | Large files compete with conversation history for context window space; keep files concise |
| **GitHub Copilot (VS Code/IDE, coding agent, code review)** | Keep `AGENTS.md` in your project root; Copilot reads it automatically | — |
| **OpenAI ChatGPT** | Paste user context into **Custom Instructions**; upload `AGENTS.md` as a file attachment | Custom Instructions has a tight character limit — long user context files will be silently truncated; maintain a condensed version and consult current OpenAI documentation for the latest limit |
| **OpenAI Codex** | Keep `AGENTS.md` in your project root; Codex reads it automatically | — |
| **Local scripts / APIs** | Concatenate user context + `AGENTS.md` when initializing conversations | Context window management is your responsibility; monitor token usage for long sessions |
| **Other platforms** | Use the platform's context management capabilities (project knowledge, system instructions, or initial prompt injection) | Method and limits vary; consult platform documentation |

---

## Installing as a Plugin

AI Context Kit ships native plugin metadata for Codex and compatibility metadata for Claude Code and GitHub Copilot CLI. Installing registers all kit skills in the target runtime, with no manual `SKILL.md` loading required.

### OpenAI Codex

Register the repository as a marketplace source:

```bash
codex plugin marketplace add MSiccDev/ai-context-kit
```

Then restart Codex, open **Plugins**, choose the **AI Context Kit** marketplace, and install `ai-context-kit`.

This repository also supports repo-scoped skill discovery for direct local use. If you clone the repository and run Codex inside it, the `.agents/skills/` symlinks expose the canonical `skills/` directory without duplicating content.

### Claude Code

Register the marketplace (one-time) and install:

```bash
claude plugin marketplace add MSiccDev/ai-context-kit
claude plugin install ai-context-kit@ai-context-kit
```

To install for a specific project only (shared via `.claude/settings.json`):

```bash
claude plugin install ai-context-kit@ai-context-kit --scope project
```

### GitHub Copilot CLI

The install commands are identical — the plugin spec is shared:

```bash
copilot plugin marketplace add MSiccDev/ai-context-kit
copilot plugin install ai-context-kit@ai-context-kit
```

### Test locally before installing

```bash
claude --plugin-dir ./path/to/ai-context-kit
```

### Invoking skills after installation

> **Plugin runtime vs. manual invocation:** This section covers invocation when the plugin is installed via the plugin system. If you are using the repository directly (cloned or forked), see [Invoking Skills](#invoking-skills) above, or use Codex repo-scoped skill discovery through `.agents/skills/`.

Skills are namespaced to the plugin name. Inside a session:

```
/ai-context-kit:ack-create-user-context
/ai-context-kit:ack-validate-agents-md
```

| Skill | What it does |
|-------|-------------|
| `ack-create-user-context` | Generate a new user context file through structured discovery |
| `ack-create-agents-md` | Generate a root `AGENTS.md` (full template, including project context and the OpenSpec section) or a nested one for a folder |
| `ack-create-skill` | Generate a new canonical `SKILL.md` artifact |
| `ack-validate-user-context` | Validate a user context file with scored report |
| `ack-validate-agents-md` | Validate a root or nested `AGENTS.md` with one scored rubric |
| `ack-validate-skill` | Validate a `SKILL.md` artifact with scored report |
| `ack-drift-control` | Check and enforce consistency across spec, templates, and docs |
| `ack-openspec-check` | (model-invoked) Check the OpenSpec CLI is 2.1.0 or later and the repository's OpenSpec files match it; give the upgrade steps |
| `ack-create-checkpoint` | Capture session state as a checkpoint artifact (spec section 4.4) |
| `ack-restore-checkpoint` | Restore session state from a checkpoint artifact (spec section 4.4) |
| `ack-session` | Show or change session state, or reset it to the project defaults |
| `ack-guide` | Recommend the next skill for a goal, and choose what to do at a phase boundary |
| `ack-setup` | Run once after the kit installer: recommend the skills that set up OpenSpec, project context and your user context, in order |
| `ack-interview-with-context` | Settle a change's decisions and terms before proposing it; record ADRs that pass the three-part test |
| `ack-interview` | (model-invoked) Settle open decisions in rounds, with a recommended answer per question |
| `ack-tdd` | (model-invoked) Test-driven implementation: seams agreed first, red before green, one slice per cycle |
| `ack-loop-01-readiness` | Loop step 01: confirm the OpenSpec change is apply-ready and pick the next task group |
| `ack-loop-02-implement` | Loop step 02: implement the approved task group task by task on a feature branch |
| `ack-loop-03-review` | Loop step 03: two-axis self-review (Spec, Standards); STATUS: PASS or BLOCKED |
| `ack-loop-04-learnings` | Loop step 04 (optional): teach the lessons from the step and its review |
| `ack-loop-05-commit` | Loop step 05: commit checklist; archive the change after review approval |

### Update

```bash
claude plugin update ai-context-kit
```

---

## Using with OpenAI Codex

Codex auto-discovers skills from the `.agents/skills/` directory, scanning upward from the current working directory to the repo root. AI Context Kit ships a `.agents/skills/` directory whose entries are symlinks to the canonical `skills/` folders, so repo-local skill discovery and plugin packaging both point at the same source of truth.

On Windows, git creates these symlinks only with Developer Mode enabled (or `core.symlinks=true` and elevated rights). Without it the entries check out as plain text files and discovery fails; either enable Developer Mode and re-clone, or install the plugin instead.

### Auto-discovery (no install needed)

If you clone this repo and run Codex from within it, all kit skills are discovered automatically. No registration or import is required for repo-local use.

### Invoking skills in Codex

Skills surface as chips in the Codex skill picker. You can also invoke them explicitly:

```
$ack-create-user-context
$ack-validate-agents-md
$ack-drift-control
```

Invoke user-invoked skills (every skill except the five model-invoked ones listed in [Invoking Skills](#invoking-skills)) explicitly. Codex reads invocation policy from a per-skill `agents/openai.yaml` sidecar. The installer generates one for every user-invoked skill it copies (`allow_implicit_invocation: false`). The links in this repository's own `.agents/skills/` carry no sidecar, so Codex running inside this repository may still select any skill on its own.

### Installing the plugin instead of using repo-local discovery

If you want the skills available outside this repository without copying `.agents/skills/` into each project, install the plugin from the Codex marketplace flow described above.

### Using skills in your own project

To make these skills available when working in a different project without installing the plugin, add the skill path to your Codex configuration, or copy or symlink the `.agents/skills/` directory into your project root.

> **Note for Windows users:** Git symlink support must be enabled **before** checkout — otherwise git materialises symlinks as plain text files. Enable it at clone time:
> ```bash
> git clone -c core.symlinks=true https://github.com/MSiccDev/ai-context-kit.git
> ```
> On Windows this also requires Developer Mode or elevated (Administrator) privileges. If you cannot enable symlinks, copy the `skills/` subdirectories into `.agents/skills/` manually as a fallback.

---

## How It Works

### Context Control

You can modify session state dynamically using:

- **Natural language:** "Switch to Developer Mode" or "Move to Implementation Phase"
- **Session skill:** `ack-session context`, `mode`, `phase`, `style`, `tone`, `interact`, `reset` (spec section 8.2). It is user-invoked, so the assistant cannot change state on its own. The former `/ack.*` and `/<tag>.*` commands are retired
- **Phase boundaries:** `ack-guide` walks continue, clear, handoff, subagent and compact, in that order (spec section 4.5.4)
- **Project defaults:** Each project can define typical starting configurations

### Design Principles

- **Reduced variance:** Same context + same query = more predictable responses that follow consistent conventions and reasoning patterns. LLMs are probabilistic by nature; this means reduced variance, not guaranteed identical outputs.
- **Explicitness:** AI confirms context changes rather than assuming
- **Continuity:** Session state persists across conversation turns
- **Reversibility:** All context changes can be undone
- **Transparency:** Current context is always visible on request

---

## Customization

### Creating Your User Context

The user context file includes both **human-readable system instructions** and **machine-readable JSON metadata**, ensuring compatibility with various AI platforms.

Key sections to customize:
- About (role, location, ecosystem preferences)
- Projects (with platforms and status)
- Skills (categorized by domain)
- Goals and Constraints
- Preferred working style
- Current focus areas

### Creating Project AGENTS Context

Each project `AGENTS.md` should define:
- Project description and tech stack
- Supported AI roles for this project
- Default role and phase
- Phase-specific guidelines
- Output preferences
- Constraints and special considerations

---

## Conventions

- **File format:** UTF-8 Markdown
  - `.instructions.md` for user context files (lowercase with underscores for user contexts (e.g., `yourname_usercontext.instructions.md`))
  - `AGENTS.md` for project-level operational context
  - Day-to-day task requests are what you ask the AI within this context layer
- **Structure:** Consistent headings and sections across all files
- **Languages:** LLMs work best when instructions are in English, but you can include multilingual content in user context if needed (just be aware of potential comprehension issues)
- **Versioning:** Update user context when skills/preferences evolve; update project `AGENTS.md` when phases/objectives change. Ideally, these should live in the same repository as your codebase once they are created.
- **Discoverability:** Semantic file extensions help AI tools identify and load the appropriate instructions automatically
- **Canonical structure:** The templates in `/templates` define the only supported artifact structures for spec v2.0.0

---

## Benefits

### Consistency
- Similar quality of AI assistance across different platforms
- No need to re-explain your background repeatedly

### Efficiency  
- AI understands your context from the start
- Faster onboarding when switching projects
- Less cognitive overhead managing AI interactions

### Adaptability
- AI behavior adjusts to your current work phase
- Easy to switch between different roles (planning, coding, reviewing)
- Context evolves with your projects

### Portability
- Works across multiple LLM providers
- Can be versioned and backed up
- Shareable with team members (with appropriate redactions)

---

## Why This Over Alternatives?

| Approach | What it gives you | What's missing |
|----------|------------------|----------------|
| Single `CLAUDE.md` / `.cursorrules` | Quick, zero-overhead context for one tool | No personal/project separation — the same file covers everything, no cross-tool portability, no structured validation |
| Handwritten system prompt | Full control over phrasing | Re-explained every session, not versionable, not portable |
| Per-project `AGENTS.md` only | Project-specific agent behavior | No personal layer — AI still doesn't know who you are |
| **AI Context Kit** | Layered (personal + project), portable across providers, versioned, validated, skill-reusable | More upfront setup |

**When it pays off:**
- You work across more than one project or AI platform
- You want your personal preferences and stack knowledge to travel with you
- You want a team-shareable, versionable AI workspace configuration
- You want validated, spec-compliant artifacts rather than ad-hoc prompts

**When simpler is better:**
- You use a single tool on a single project and don't plan to change that
- A one-file `.cursorrules` or `CLAUDE.md` already covers your needs

---

## Coming From The Template Repository

Earlier versions were used as a GitHub template repository. That path is retired: install the kit into each project with the installer instead (see [Install In A Repository](#install-in-a-repository)).

- Keep your `*_usercontext.instructions.md` where it is, outside your projects.
- In each project, run the installer, then `ack-setup`; `ack-create-agents-md` rewrites an older `AGENTS.md` after showing you the diff.
- [`CHANGELOG.md`](CHANGELOG.md) lists every breaking change and its migration step under each release.

## Contributing

Found a bug or have an improvement to the kit itself? Open an issue or a pull request in [MSiccDev/ai-context-kit](https://github.com/MSiccDev/ai-context-kit). Never include your personal user context or project files.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Note:** While the templates and specifications are open source, your personal user context files should remain private and not be shared without redacting sensitive information.

---

## Author

**Marco Siccardi** – MSiccDev Software Development

---

## Acknowledgments

This instruction-based system evolved from the challenge of maintaining consistent AI collaboration across multiple platforms and projects. 

**The Evolution:**
- **Phase 1:** Started as a way to extract and reuse prompts across AI providers
- **Phase 2:** Evolved into structured, persistent context management
- **Phase 3:** Matured into a complete instruction-based architecture for AI workspace configuration
- **Phase 4:** Adopting `AGENTS.md` and favoring skills for operational logic to create a more robust, maintainable system

What makes this approach powerful is the shift from treating every AI interaction as isolated to creating **persistent, layered instruction sets** that transform how AI assistants understand and support your work.

This represents lessons learned from extensive work with hosted and local LLM providers and real-world development workflows across multiple projects and domains.

**Third-party work:** some skills adapt ideas from other MIT-licensed projects. [mattpocock/skills](https://github.com/mattpocock/skills) by Matt Pocock: the router and phase-boundary tree in `ack-guide`, the setup pattern in `ack-setup`, the interview method in `ack-interview` and `ack-interview-with-context`, and the test-driven cycle in `ack-tdd`. Each adapted skill credits its source in `metadata.credits`, and [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) holds the full license texts and the list of adapted skills.

---
