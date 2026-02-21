# AI Context Kit

> **Author:** Marco Siccardi (MSiccDev Software Development)  
> **Purpose:** An AGENTS-first, skills-first framework for maintaining consistent, context-aware AI collaboration across different LLM providers, projects, and development phases.



## Overview

This repository provides a **comprehensive AGENTS-first context and workflow system** designed to enable consistent, context-aware AI collaboration across multiple projects and platforms.

## Primary Agent Entrypoint

- Root `AGENTS.md` is the primary operational entrypoint for agents in this repository.
- `specs/context_aware_ai_session_spec.md` is the normative source of truth for the full session model.

### The Evolution

What began as a way to extract and reuse prompts across AI providers has evolved into a sophisticated architecture for AI collaboration:

- **Layered architecture** – Personal user context + project `AGENTS.md` context create complete AI workspace configurations
- **Skill-based workflows** – Create and validate context files using reusable skills with detailed operational logic
- **Provider-agnostic** – Works seamlessly across different LLM environments

### The System

This framework consists of:
- **Personal user context artifacts** – Your professional identity, skills, preferences, and working style
- **Project-specific `AGENTS.md` context** – Scope, tech stack, roles, objectives, and operational guidance per project
- **Skill workflows in `skills/`** – Canonical create/validate/governance operational logic
- **Session specification** – How AI assistants should maintain and adapt context during work sessions
- **Templates in `templates/`** – Canonical artifact structures aligned to the spec

All components are designed to work across hosted and local LLM environments, ensuring that every AI assistant understands your background, working style, and project context without repeated explanations. Results may vary by platform, so you may need to adjust your context files accordingly.

---

## Repository Structure

```
ai-context-kit/
│
├── AGENTS.md                                        # Primary agent entrypoint for this repository
├── README.md                                         # This file
├── LICENSE                                           # MIT License file
│
├── prompts/                                          # Composition prompt wrappers
│   ├── create-usercontext-instructions.prompt.md     # Generate user context instruction files
│   ├── create-project-instructions.prompt.md         # Generate project-context AGENTS.md files
│   ├── create-agents-md.prompt.md                    # Generate AGENTS.md files
│   ├── create-skill.prompt.md                        # Generate skill files
│   ├── validate-usercontext-instructions.prompt.md   # Validate user context files
│   ├── validate-project-instructions.prompt.md       # Validate project-context AGENTS.md files
│   ├── validate-agents-md.prompt.md                  # Validate AGENTS.md files
│   └── validate-skill.prompt.md                      # Validate skill files
│
├── specs/
│   └── context_aware_ai_session_spec.md              # Specification for AI session management
│
├── templates/
│  ├── usercontext_template.instructions.md           # Canonical v1.3.1 user context template (authoritative)
│  ├── AGENTS_template.md                             # Canonical AGENTS template (authoritative)
│  └── skill_template/SKILL.md                        # Canonical skill template
│
└── skills/
   └── README.md                                      # Canonical location for skill instances
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

`prompts/` are available as composition wrappers, while canonical workflow logic lives in `skills/`.

---

## Canonical Authority (Spec v1.3.1)

When guidance differs across files, use this authority order:

1. `specs/context_aware_ai_session_spec.md` (normative)
2. `templates/` (canonical artifact structures)
3. `skills/` (canonical operational workflows)
4. `prompts/` (composition wrappers)
5. `usercontexts/` and validation artifacts (illustrative examples)

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

Note: Interaction Mode is optional in the abstract session model, but project `AGENTS.md` should define a default to keep startup behavior deterministic.

State behavior rules:
- State persists across turns until explicitly changed or reset.
- No silent transitions: project, role, phase, style, tone, and interaction mode must not change implicitly.
- State can be changed with natural language or namespaced commands (for example `/namespace.mode`, `/namespace.phase`, `/namespace.style`, `/namespace.tone`, `/namespace.interact`).
- `/namespace.context` shows current active state; `/namespace.reset` resets session state.

**Purpose:** Keeps behavior deterministic, transparent, and aligned as work moves between planning, implementation, debugging, and review.

---

## Agent Skills

This repository provides for reusable **Agent Skills** for authoring and validation.

- Documentation reference: https://agentskills.io/home
- Canonical paths:
  - `templates/skill_template/SKILL.md`
  - `skills/`
  - `prompts/` (composition wrappers)

### Skill-First Authority Model
Operational workflow authority is skill-first:
1. `skills/` is the canonical source for create/validate/governance workflow logic.
2. `prompts/` are available as composition wrappers to orchestrate skills.
3. Prompt wrappers should stay concise and must not reintroduce full checklists/rubrics already defined in skills.

### Skill Workflow
1. Author or update workflow behavior in `skills/*/SKILL.md` plus skill-local `references/`.
2. Keep detailed operational logic in skills; use prompts as composition wrappers only.
3. Always validate skills and keep `SKILL.validation.md` current.

### Available Skills
- `skills/create-usercontext-instructions/`
- `skills/create-project-instructions/`
- `skills/create-agents-md/`
- `skills/validate-usercontext-instructions/`
- `skills/validate-project-instructions/`
- `skills/validate-agents-md/`
- `skills/repository-drift-control/`
- `skills/create-skill/`
- `skills/validate-skill/`

### Neutrality And Safety
- Skills must remain provider-neutral and runtime-portable.
- Use relative paths for skill-local references.
- Treat tool execution permissions as explicit policy decisions.
- Keep prompt wrappers thin and non-authoritative to avoid logic drift.

---

## File Path Conventions

This repository relies on **stable, predictable file paths** so that AGENTS context, skills, specifications, prompts, and validators can reference each other safely.

The following paths are considered **canonical**:

- `AGENTS.md`
  - Primary agent entrypoint (repo-specific operational contract)
- `templates/`
  - Canonical instruction templates (spec v1.3.1)
- `skills/`
  - Canonical workflow skills (`SKILL.md`-based folders)
- `prompts/`
  - Composition wrappers for instruction/skill workflows
- `specs/context_aware_ai_session_spec.md`
  - Authoritative specification (v1.3.1+)
- Root `README.md`
  - Human-facing entry point and workflow documentation

If paths must change, update the specification and README first, then adjust skills, prompts, and validators accordingly.

## Quick Start

### For First-Time Users

1. **Create Your User Context Artifact**
   - **Manual (canonical):** Copy `templates/usercontext_template.instructions.md`, fill in your details, and save as `yourname_usercontext.instructions.md`
   - **Skill:** Use `skills/create-usercontext-instructions/SKILL.md` to generate your user context file

2. **Create Project AGENTS Context**
   - **Manual (canonical):** Copy `templates/AGENTS_template.md` and define your project context
   - **Skill:** Use `skills/create-agents-md/SKILL.md` (or `skills/create-project-instructions/SKILL.md` where that workflow is preferred)
   - Save as `AGENTS.md` in your project root (or scoped nested `AGENTS.md` where needed)

3. **Validate Artifacts**
   - Use `skills/validate-usercontext-instructions/SKILL.md` for user context files
   - Use `skills/validate-agents-md/SKILL.md` for `AGENTS.md`
   - Use `skills/validate-project-instructions/SKILL.md` when validating project-context `AGENTS.md` artifacts

4. **Load Context Into Your AI Environment**
   - See platform-specific instructions below

### For Returning Users

- Load your user context artifact as the base context
- Add the relevant project `AGENTS.md` context on top
- Use your project's namespaced commands (for example `/ack.context`) to inspect or adjust active session state

---

## Loading Context in Different AI Platforms

| Platform | Method |
|----------|---------|
| **Anthropic Claude Projects** | Paste user context and project AGENTS context into **project-level context settings** and/or add to project knowledge |
| **GitHub Copilot (VS Code/IDE)** | Just keep `AGENTS.md` in your project root (or the folder where you need it); Copilot reads it automatically |
| **OpenAI ChatGPT** | Paste your user context into **Custom Instructions** and upload `AGENTS.md` as project context |
| **OpenAI Codex** | Just keep `AGENTS.md` in your project root (or the folder where you need it); Codex reads it automatically |
| **Local scripts / APIs** | Concatenate user context + `AGENTS.md` project context when initializing conversations |
| **Other platforms** | Use the method that best fits the platform's context management capabilities (for example, project knowledge bases, system instructions, or initial prompt injection) |


## How It Works

### Context Control

You can modify session state dynamically using:

- **Natural language:** "Switch to Developer Mode" or "Move to Implementation Phase"
- **Commands:** `/namespace.context`, `/namespace.mode`, `/namespace.phase`, `/namespace.style`, `/namespace.tone`, `/namespace.interact`, `/namespace.reset`
- **Command namespace:** Projects define a namespace prefix to avoid collisions (preferred pattern: `/namespace.command`; AI Context Kit uses `/ack.*`)
- **Project defaults:** Each project can define typical starting configurations

### Design Principles

- **Determinism:** Same context + same query = consistent responses 
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
- **Canonical structure:** The templates in `/templates` define the only supported artifact structures for spec v1.3.1

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

## Getting Started with This Template Repository

This is a **GitHub template repository**. Here's how to use it:

### Creating Your Own Instance

1. **Use the Template:**
   - Click the green **"Use this template"** button on GitHub
   - Choose **"Create a new repository"**
   - Give it a name (e.g., `my-ai-instructions` or `ai-workspace-config`)
   - **Make it Private** (recommended - it will contain personal information!)
   - GitHub will create a fresh copy for you

2. **Customize Your Instance:**
   - Clone your new repository locally
   - Start with `templates/usercontext_template.instructions.md`
   - Fill in your professional details, skills, and preferences
   - Save as `yourname_usercontext.instructions.md` in the root
   - Create project context from `templates/AGENTS_template.md`
   - Save as `AGENTS.md` in your project root

3. **Keep It Updated:**
   - Update your user context as your skills evolve
   - Version control tracks your AI workspace evolution

### Why Use Template Instead of Fork?

- **Clean history:** Your repository starts fresh without this template's history
- **Private by default:** Easily make your instance private (recommended)
- **No upstream confusion:** It's your repository, not a fork
- **Your data, your control:** Personal instructions stay in your private repo

### Keeping Your Instance Up-to-Date

When the template repository gets improvements, here's how to pull them into your instance:

**Option 1: Manual Updates (Recommended)**
```bash
# Add the template as a remote (one-time setup)
git remote add template https://github.com/MSiccDev/ai-context-kit.git

# Fetch template updates
git fetch template

# Review what changed in the template
git log template/main

# Cherry-pick specific improvements you want
git cherry-pick <commit-hash>

# Or merge specific files manually
git checkout template/main -- README.md
git checkout template/main -- specs/context_aware_ai_session_spec.md
git checkout template/main -- templates/
```

**Option 2: Automated Merge (Use with Caution)**
```bash
# Merge all template changes
git merge template/main --allow-unrelated-histories

# Resolve conflicts (protect your personal files!)
# Commit the merge
```

**Best Practice:**
- Watch/star the template repository to get notified of updates
- Review the CHANGELOG or commit history before updating
- Only pull updates that add value to your workflow
- **Always protect your personal instruction files** - never overwrite them

**What to Update:**
- ✅ Template files in `templates/`
- ✅ Specification documents in `specs/`
- ✅ README improvements  
- ✅ Skill updates and additions in `skills/`
- ❌ Your personal `*_usercontext.instructions.md`
- ❌ Your project `AGENTS.md`

### Contributing Back

Found a bug or have an improvement to the **template itself**?

1. Create an issue in the [original template repository](https://github.com/MSiccDev/ai-context-kit)
2. Submit a pull request with improvements to:
   - Template structure
   - Documentation clarity
   - Specification enhancements
   - Example improvements

**Note:** Never contribute your personal user context or project files - keep those private!

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

---
