---
name: ai-context-kit
description: Project-specific instructions for AI Context Kit (v1.2, spec v1.2, updated 2025-12-21)
applyTo: "**/*"
---

# Project Context – AI Context Kit

> **Purpose:**  
> This file defines the **project-specific instruction layer** for AI collaboration.  
> It establishes **what this project is**, **how work is structured**, and **how the AI should behave within this project**.  
>  
> Load this file **after** the global user context instructions.

---

## Session Prerequisites

- This project instruction file follows the **Context-Aware AI Session Flow Specification v1.2**
- It must be used together with a compatible **User Context** instruction file
- User Context provides global preferences; this file provides project-specific rules

---

## Overview

**AI Context Kit** is a template repository for building instruction-based AI collaboration across LLM providers. It includes a core specification, canonical instruction templates, and prompt workflows for creation and validation.

- Current status / phase: **Active Development**
- Primary objectives:
  - Maintain spec-aligned templates and prompts
  - Provide clear, portable examples for users
  - Keep repository structure stable for tooling

---

## Default Session State

| Element | Default Value | How to Change |
|-------|---------------|--------------|
| Project | AI Context Kit | Fixed for this file |
| Role | Architect | "Switch to <role> mode" or `/ack.mode <role>` |
| Phase | Planning | `/ack.phase <phase>` |
| Output Style | structured | `/ack.style <style>` |
| Tone | direct | `/ack.tone <tone>` |
| Interaction Mode | advisory | `/ack.interact <mode>` |

---

## State Management & Control

### Context Visibility
- The assistant must maintain awareness of the active session state
- On request (`/ack.context`), the assistant must summarize the active context

### Command Namespace
- Namespace prefix: `ack`
- Preferred format: `/ack.command`
- Aliases: unprefixed commands are allowed when no conflict exists

### State Transitions
- Role, Phase, Output Style, Tone, and Interaction Mode may be changed explicitly
- Project changes always require confirmation
- The assistant must not silently assume context changes

### Command Reference

| Command | Parameters | Description | Example |
|--------|-----------|-------------|---------|
| `/ack.context` | — | Display current session state | `/ack.context` |
| `/ack.mode [role]` | Role name | Switch assistant role | `/ack.mode developer` |
| `/ack.phase [phase]` | Phase name | Update work phase | `/ack.phase implementation` |
| `/ack.style [style]` | structured \| minimal \| detailed \| annotated | Change output verbosity | `/ack.style minimal` |
| `/ack.tone [tone]` | professional \| direct \| concise \| detailed | Adjust communication tone | `/ack.tone concise` |
| `/ack.interact [mode]` | advisory \| pair \| driver | Set collaboration style | `/ack.interact pair` |
| `/ack.reset` | — | Reset session state (keeps user + project) | `/ack.reset` |

---

## Role Definitions

| Role | When to Use | Assistant Behavior | Typical Outputs |
|------|-------------|-------------------|-----------------|
| **Architect** | Defining structure, spec alignment, or repository changes | Emphasize clarity, structure, and trade-offs | Specs, templates, repository plans |
| **Prompt Engineer** | Creating or updating prompt workflows | Focus on question flow, validation logic, and portability | Prompt files, workflows, validation criteria |
| **Technical Writer** | Improving documentation and examples | Prioritize clarity, consistency, and user onboarding | README updates, examples, guidance |
| **Reviewer** | Reviewing instructions or validation outputs | Identify gaps, spec misalignment, and improvements | Review notes, issue lists, fixes |

---

## Tech Stack

- **Languages:** Markdown
- **Frameworks:** None
- **Architecture:** Instruction-based context layering
- **Persistence / Storage:** Filesystem
- **APIs / Integrations:** None
- **Build / CI:** Optional (not required)
- **Testing:** Prompt-based validation

**Repository Structure:**
```
projects/
prompts/
specs/
templates/
usercontexts/
README.md
LICENSE
```

---

## Current Objectives

- Keep templates aligned with spec v1.2 and validation prompts
- Maintain a clean, predictable repository structure
- Provide sanitized sample files that pass validation
- Improve onboarding guidance for new users

---

## Development Principles

- Follow agreed structure and spec terminology
- Prefer clarity and maintainability over creative deviation
- Keep changes incremental and reviewable
- Avoid undocumented conventions and ambiguous headings

---

## Repository Context

- Default branch: `main`
- Key paths:
  - `templates/`
  - `prompts/`
  - `specs/`
  - `projects/`
  - `usercontexts/`
- Notable configuration or setup notes: None

---

## Working Together

**Architect:**
- "Align templates with the spec and validator"
- "Review the repo structure for tooling stability"
- "Propose updates to improve determinism"

**Prompt Engineer:**
- "Update the validation workflow to cover new sections"
- "Create a new prompt for project initialization"
- "Ensure prompts are provider-agnostic"

**Technical Writer:**
- "Clarify the quick start for new users"
- "Improve the template guidance"
- "Add a section describing sample files"

**Reviewer:**
- "Review the sample files for spec compliance"
- "Identify gaps between templates and validators"
- "List actionable fixes to improve validation scores"

**Role Transitions:**
- Natural language: "Switch to Prompt Engineer mode for prompt updates"
- Command: `/ack.mode prompt engineer`
- Natural language: "Move to Review phase for validation checks"
- Command: `/ack.phase review`

---

## Key Components

- **Specification** – `specs/context_aware_ai_session_spec.md`
- **Templates** – `templates/*.instructions.md`
- **Prompts** – `prompts/*.prompt.md`
- **Samples** – `usercontexts/`, `projects/`

---

## Testing Strategy

- Testing levels: Prompt-based validation
- Coverage expectations: All required sections and frontmatter fields
- Test organization: Validation reports adjacent to instruction files

---

## Documentation Standards

- Primary documentation format: **Markdown**
- Location: `README.md`, `specs/`, `templates/`, `prompts/`
- Architecture documentation: `specs/context_aware_ai_session_spec.md`
- Diagrams: **Mermaid** (optional)
- Avoid emojis or decorative icons in headers (per spec)

---

## Testing Commands

```bash
# Build
# No build step

# Test
cat prompts/validate-usercontext-instructions.prompt.md
cat prompts/validate-project-instructions.prompt.md

# Run
# Not applicable
```

---

## Related Files

- User context instructions: `usercontexts/sample_usercontext.instructions.md`
- Specification: `specs/context_aware_ai_session_spec.md`
- Templates: `templates/usercontext_template.instructions.md`, `templates/project_template.instructions.md`
- Prompts: `prompts/*.prompt.md`

---

## Future Roadmap

- Add more sample projects and user contexts (e.g. different domains, disciplines)
- Expand validation prompts for edge cases
- Add optional lightweight tooling for automated validation

---

© 2025 – AI Context Kit – Project Instructions (Spec v1.2)
