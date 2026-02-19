# AI Context Kit

> **Author:** Marco Siccardi (MSiccDev Software Development)  
> **Purpose:** A structured instruction framework for maintaining consistent, context-aware AI collaboration across different LLM providers, projects, and development phases.



## Overview

This repository provides a **comprehensive AI instruction and workspace configuration system** designed to enable consistent, context-aware AI collaboration across multiple projects and platforms.

## Primary Agent Entrypoint

- Root `AGENTS.md` is the primary operational entrypoint for agents in this repository.
- `specs/context_aware_ai_session_spec.md` remains the normative source of truth for the full session model.
- `plans/` contains planning prompts as plain Markdown files usable in any environment.

### The Evolution

What began as a way to extract and reuse prompts across AI providers has evolved into a sophisticated **instruction-based architecture** for AI collaboration:

- **Not just prompts** – These are persistent instruction sets that define working context
- **Layered architecture** – Personal user context + project `AGENTS.md` context create complete AI workspace configurations
- **Provider-agnostic** – Works seamlessly across different LLM environments

### The System

This framework consists of:
- **Personal user context instructions** – Your professional identity, skills, preferences, and working style
- **Project AGENTS context** – Scope, tech stack, roles, objectives, and operational guidance per project
- **Session specification** – How AI assistants should maintain and adapt context during work sessions
- **Templates** – For creating new instruction sets quickly and consistently

All components are designed to work across hosted and local LLM environments, ensuring that every AI assistant understands your background, working style, and project context without repeated explanations. Results may vary by platform, so you may need to adjust your instructions accordingly.

---

## Repository Structure

```
ai-context-kit/
│
├── AGENTS.md                                        # Primary agent entrypoint for this repository
├── README.md                                         # This file
├── LICENSE.md                                        # MIT License file
│
├── plans/                                            # Planning prompts (plain Markdown)
│   ├── *.prompt.md                                   # Open/executed plan files
│   ├── README.md                                     # Plan lifecycle policy
│   └── plan-status.sh                                # Open/executed plan detector
│
├── prompts/                                          # Compatibility prompt wrappers
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
│  ├── usercontext_template.instructions.md           # Canonical v1.3 user context template (authoritative)
│  ├── AGENTS_template.md                             # Canonical AGENTS template (authoritative)
│  └── skill_template/SKILL.md                        # Canonical skill template
│
└── skills/
   └── README.md                                      # Canonical location for skill instances
```

---

## Core Concepts

### The Instruction vs. Prompt Distinction

**Instructions** are persistent context and guidelines that define:
- WHO you are (user context)
- WHAT the project is (project context)
- HOW the AI should behave (roles, phases, preferences)

**Prompts** are your day-to-day requests within that instructed environment:
- "Create a new API endpoint"
- "Review this code for security issues"
- "Switch to Developer Mode and implement this feature"

This repository provides the **instruction layer** that makes your prompts more effective.

It also provides a **skill-first workflow system** for creating and validating those instruction files, with prompt wrappers retained for compatibility.

---

## Canonical Templates (Spec v1.3)

The templates located in `/templates` are the **single authoritative source** for instruction structure:

- `templates/usercontext_template.instructions.md`
- `templates/AGENTS_template.md`

These templates are:
- Fully aligned with the **Context-Aware AI Session Flow Specification v1.3**
- The exact structures generated by creation workflows
- The exact structures enforced by validation workflows

There are no alternate or “light” templates.  
If a file validates successfully, it is structurally correct by definition.

### 1. **Personal User Context Instructions**
Your foundational AI context that includes:
- Professional background and current role
- Technical skills and expertise areas
- Active projects and goals
- Preferred working style and communication preferences
- Constraints and limitations

**Purpose:** Serves as the base instruction layer that AI assistants load first to understand who you are and how you work globally.

### 2. **Project AGENTS Context**
Project-level AGENTS context defines:
- Project scope and objectives
- Technology stack and architecture
- Recommended AI roles (Architect, Developer, Designer, etc.)
- Default work phases (Planning, Implementation, Debugging, Review)
- Project-specific constraints and guidelines

**Purpose:** Provides focused, project-specific operational context layered on top of user context.

### 3. **Session State Model**
A structured approach to AI collaboration that manages context dynamically:

| Element | Description | Example Values |
|---------|-------------|----------------|
| **User Context** | Your identity, skills, and preferences | Defined in your user context instructions |
| **Project** | Active domain or codebase | "Mobile UI app", "Backend API" |
| **Role/Mode** | AI's cognitive stance | Architect, Developer, Designer, Reviewer |
| **Phase** | Current work stage | Planning, Implementation, Debugging, Review |
| **Output Style** | Response verbosity | Step-by-step, Minimal code, Annotated |
| **Tone** | Communication voice | Analytical, Direct, Encouraging |
| **Interaction Mode** | AI proactivity level | Advisory, Pair-programming, Driver |

**Purpose:** Ensures AI behavior adapts appropriately as you move through different stages of work.

---

## Agent Skills

This repository includes a foundation for reusable **Agent Skills** authoring and validation.

- Documentation reference: https://agentskills.io/home
- Canonical paths:
  - `templates/skill_template/SKILL.md`
  - `skills/`
  - `prompts/` (compatibility wrappers)

### Skill-First Authority Model
Operational workflow authority is skill-first:
1. `skills/` is the canonical source for create/validate/governance workflow logic.
2. `prompts/` remains available as compatibility wrappers that route to canonical skills.
3. Prompt wrappers should stay concise and must not reintroduce full checklists/rubrics already defined in skills.

### Skill Workflow
1. Author or update workflow behavior in `skills/*/SKILL.md` plus skill-local `references/`.
2. Keep detailed operational logic in skills; use prompts as thin wrappers only.
3. Validate skills and keep `SKILL.validation.md` current.

### Extracted Skills
- `skills/create-usercontext-instructions/`
- `skills/create-project-instructions/`
- `skills/create-agents-md/`
- `skills/validate-usercontext-instructions/`
- `skills/validate-project-instructions/`
- `skills/validate-agents-md/`
- `skills/plan-lifecycle-management/`
- `skills/repository-drift-control/`

### Neutrality And Safety
- Skills must remain provider-neutral and runtime-portable.
- Use relative paths for skill-local references.
- Treat tool execution permissions as explicit policy decisions.
- Keep prompt wrappers thin and non-authoritative to avoid logic drift.

---

## File Path Conventions

This repository relies on **stable, predictable file paths** so that instructions, specifications, prompts, and validators can reference each other safely.

The following paths are considered **canonical**:

- `AGENTS.md`
  - Primary agent entrypoint (repo-specific operational contract)
- `templates/`
  - Canonical instruction templates (spec v1.3)
- `skills/`
  - Canonical workflow skills (`SKILL.md`-based folders)
- `prompts/`
  - Compatibility wrappers for instruction/skill workflows
- `plans/`
  - Planning prompts and plan lifecycle/status utilities
- `specs/context_aware_ai_session_spec.md`
  - Authoritative specification (v1.3+)
- Root `README.md`
  - Human-facing entry point and workflow documentation

### Path Stability Rules

- Do not rename or move these directories without updating:
  - README references
  - specification cross-references
  - canonical skill references and prompt wrappers
- Instruction files should reference the specification by **relative path**, not URL
- Validators and generators assume these paths by convention

If paths must change, update the specification and README first, then adjust skills, prompts, and validators accordingly.

## Quick Start

### For First-Time Users

1. **Create Your User Context:**
   - **Manual (canonical):** Copy `templates/usercontext_template.instructions.md` (spec v1.3), fill in your details, and save as `yourname_usercontext.instructions.md`
   - **AI-Assisted (skill-first):** Use `skills/create-usercontext-instructions/SKILL.md` (or `prompts/create-usercontext-instructions.prompt.md` as compatibility wrapper)

2. **Create Project Context (AGENTS.md):**
   - **Manual (canonical):** Copy `templates/AGENTS_template.md` and define your project context
   - **AI-Assisted (skill-first):** Use `skills/create-agents-md/SKILL.md` (or `skills/create-project-instructions/SKILL.md` compatibility alias)
   - Save as `AGENTS.md` in your project root (or scoped nested `AGENTS.md` where needed)

3. **Validate Your Context Artifacts (Optional but Recommended):**
   - Use `skills/validate-usercontext-instructions/SKILL.md` to check your user context file
   - Use `skills/validate-agents-md/SKILL.md` to check your project `AGENTS.md`
   - Prompt wrappers in `prompts/` remain available as compatibility entrypoints
   - Validation creates a `.validation.md` report with scoring and recommendations

4. **Load Into Your AI Environment:**
   - See platform-specific instructions below

### For Returning Users

- Load your user context instructions as the base context
- Add the relevant project `AGENTS.md` context on top
- The AI will maintain state across your work session

---
### Linking Instructions Across Repositories (macOS)

If you manage your context files centrally in this repository, you can link them into a project repo using symlinks.

Example:
```bash
mkdir -p /path/to/your-project/.github/instructions
ln -s /path/to/your-instructions/AGENTS.md \
      /path/to/your-project/AGENTS.md
```

Use absolute paths to keep the links stable.

---

## Loading Context in Different AI Platforms

| Platform | Method |
|----------|---------|
| **Anthropic Claude Projects** | Paste user context and project AGENTS context into **Project Instructions** and/or add to project knowledge |
| **GitHub Copilot (VS Code/IDE)** | Create `.github/instructions/copilot-instructions.md`; Copilot reads it automatically |
| **LM Studio / Ollama** | Save `.instructions.md` files as system prompts or instruction presets |
| **OpenAI ChatGPT** | Paste into **Custom Instructions** (user context) and upload `AGENTS.md` as project context |
| **Gemini** | Paste into chat or use a system instruction (Gemini API / AI Studio) |
| **Local scripts / APIs** | Concatenate user context + `AGENTS.md` project context when initializing conversations |
| **IDE integrations** | Reference `.instructions.md` files in config or load via custom extensions |


## How It Works

### Context Control

You can modify session state dynamically using:

- **Natural language:** "Switch to Developer Mode" or "Move to Implementation Phase"
- **Commands:** `/ack.mode developer`, `/ack.phase implementation`, `/ack.context` (shows current state)
- **Command namespace:** Projects define a namespace prefix to avoid collisions (e.g., `/ack.context`, `/ack.mode developer`)
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

The user context file includes both a **human-readable system instructions** and **machine-readable JSON metadata**, ensuring compatibility with various AI platforms.

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

## Skill-First Workflow System

This repository uses a **skill-first operating model** for create/validate/governance workflows.

### Canonical Workflow Skills

- `skills/create-usercontext-instructions/`
- `skills/create-project-instructions/`
- `skills/create-agents-md/`
- `skills/create-skill/`
- `skills/validate-usercontext-instructions/`
- `skills/validate-project-instructions/`
- `skills/validate-agents-md/`
- `skills/validate-skill/`
- `skills/plan-lifecycle-management/`
- `skills/repository-drift-control/`

Detailed operational logic (phases, checklists, scoring, report schemas) is authoritative in these skills and their `references/` folders.

### Compatibility Prompt Wrappers

- `prompts/*.prompt.md` files remain supported for compatibility.
- Prompt wrappers should be concise and defer workflow detail to canonical skills.
- Wrapper prompts must not reintroduce duplicated authoritative logic.

### Validation Reports

Validation workflows create persistent `.validation.md` files alongside your instruction files:

- **Location:** Same directory as the validated file
- **Naming:** `[filename].validation.md` (e.g., `name_surname_usercontext.validation.md`)
- **Overwrite:** Each validation replaces the previous report
- **Format:** Comprehensive markdown report with scoring, issues, and recommendations
- **Benefits:** Easy review for both humans and LLMs, enables chunk-based processing

---

## Conventions

- **File format:** UTF-8 Markdown
  - `.instructions.md` for user context files
  - `AGENTS.md` for project-level operational context
  - Actual prompts/queries are what you ask the AI day-to-day within this instructed environment
- **Naming:** lowercase with underscores for user contexts (e.g., `yourname_usercontext.instructions.md`)
- **Structure:** Consistent headings and sections across all files
- **Languages:** Technical content in English; adapt as needed
- **Versioning:** Update user context when skills/preferences evolve; update project `AGENTS.md` when phases/objectives change
- **Discoverability:** Semantic file extensions help AI tools identify and load the appropriate instructions automatically

- **Canonical structure:** The templates in `/templates` define the only supported instruction structure for spec v1.3

---

## Benefits

### Consistency
- Same quality of AI assistance across different platforms
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

## Getting Started with This Template

This is a **GitHub template repository**. Here's how to use it:

### Creating Your Own Instance

1. **Use the Template:**
   - Click the green **"Use this template"** button on GitHub
   - Choose **"Create a new repository"**
   - Give it a name (e.g., `my-ai-instructions` or `ai-workspace-config`)
   - **Make it Private** (recommended - contains personal information!)
   - GitHub will create a fresh copy for you

2. **Customize Your Instance:**
   - Clone your new repository locally
   - Start with `templates/usercontext_template.instructions.md`
   - Fill in your professional details, skills, and preferences
   - Save as `yourname_usercontext.instructions.md` in the root
   - Create project context from `templates/AGENTS_template.md`
   - Save as `AGENTS.md` in your project root

3. **Keep It Updated:**
   - Update your usercontext as your skills evolve
   - Add new projects as you start them
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

What makes this approach powerful is the shift from treating every AI interaction as isolated to creating **persistent, layered instruction sets** that transform how AI assistants understand and support your work.

This represents lessons learned from extensive work with hosted and local LLM providers and real-world development workflows across multiple projects and domains.

---

## Philosophy

**Traditional approach:**
- User sends isolated prompts
- AI has no continuity between sessions
- Constant re-explanation of context
- Inconsistent results across providers

**Instruction-based approach:**
- User loads instruction sets once
- AI maintains persistent understanding
- Context builds and evolves naturally
- Consistent collaboration regardless of provider

This isn't just about efficiency—it's about creating a fundamentally different relationship between developers and AI assistants, where the AI becomes a true collaborative partner rather than a stateless tool.
