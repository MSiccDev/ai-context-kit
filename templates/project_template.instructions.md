---
name: <project-name-slug>
description: Project-specific instructions for <Project Name> (v1.2, spec v1.2, updated YYYY-MM-DD)
applyTo: "**/*"
---

# Project Context – <Project Name>

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

**<Project Name>** is a <concise description of what the project does and who it is for>.

- Current status / phase: **<Planning / Active Development / Maintenance / Review / Migration>**
- Primary objectives:
  - <Objective 1>
  - <Objective 2>
  - <Objective 3>

---

## Default Session State

| Element | Default Value | How to Change |
|-------|---------------|--------------|
| Project | <Project Name> | Fixed for this file |
| Role | <default role> | "Switch to \<role\> mode" or `/tag.mode <role>` |
| Phase | <default phase> | `/tag.phase <phase>` |
| Output Style | <structured \| minimal \| detailed \| annotated> | `/tag.style <style>` |
| Tone | <professional \| direct \| concise \| detailed> | `/tag.tone <tone>` |
| Interaction Mode | <advisory \| pair \| driver> | `/tag.interact <mode>` |

---

## State Management & Control

### Context Visibility
- The assistant must maintain awareness of the active session state
- On request (`/tag.context`), the assistant must summarize the active context

### Command Namespace
- Namespace prefix: `<short-tag>` (required)
- Format: `/tag.command` (e.g., `/ack.context`)
- Unprefixed aliases should only be provided if explicitly documented

### State Transitions
- Role, Phase, Output Style, Tone, and Interaction Mode may be changed explicitly
- Project changes always require confirmation
- The assistant must not silently assume context changes

### Command Reference

| Command | Parameters | Description | Example |
|--------|-----------|-------------|---------|
| `/tag.context` | — | Display current session state | `/ack.context` |
| `/tag.mode [role]` | Role name | Switch assistant role | `/ack.mode developer` |
| `/tag.phase [phase]` | Phase name | Update work phase | `/ack.phase implementation` |
| `/tag.style [style]` | structured \| minimal \| detailed \| annotated | Change output verbosity | `/ack.style minimal` |
| `/tag.tone [tone]` | professional \| direct \| concise \| detailed | Adjust communication tone | `/ack.tone concise` |
| `/tag.interact [mode]` | advisory \| pair \| driver | Set collaboration style | `/ack.interact pair` |
| `/tag.reset` | — | Reset session state (keeps user + project) | `/ack.reset` |

---

## Role Definitions

Define all roles that are valid within this project.  
Roles determine **how the assistant reasons**, not just what it outputs.

| Role | When to Use | Assistant Behavior | Typical Outputs |
|------|-------------|-------------------|-----------------|
| **<Role Name>** | <When this role is appropriate> | <How the assistant should think and act> | <Typical deliverables> |
| **<Role Name>** | <When this role is appropriate> | <How the assistant should think and act> | <Typical deliverables> |
| **<Role Name>** | <When this role is appropriate> | <How the assistant should think and act> | <Typical deliverables> |

---

## Tech Stack

- **Languages:** <e.g., Swift, C#, TypeScript>
- **Frameworks:** <e.g., SwiftUI, .NET, React>
- **Architecture:** <e.g., MVVM, Clean Architecture, TDD>
- **Persistence / Storage:** <e.g., SwiftData, SQLite, PostgreSQL>
- **APIs / Integrations:** <External services or SDKs>
- **Build / CI:** <e.g., GitHub Actions>
- **Testing:** <Unit / Integration / UI frameworks>

**Repository Structure:**
```
src/
tests/
resources/
docs/
```

---

## Current Objectives

- <Objective 1>
- <Objective 2>
- <Objective 3>
- <Objective 4>

---

## Development Principles

- Follow agreed architecture and patterns
- Prefer clarity and maintainability over premature optimization
- Keep changes incremental and reviewable
- Avoid undocumented conventions and magic behavior

---

## Repository Context

- Default branch: `<branch>`
- Key paths:
  - `/src`
  - `/tests`
  - `/resources`
  - `/docs`
- Notable configuration or setup notes: <if any>

---

## Working Together

The assistant should support the following collaboration patterns.

**<Role Name>:**
- *"Example request 1"*
- *"Example request 2"*
- *"Example request 3"*

**<Role Name>:**
- *"Example request 1"*
- *"Example request 2"*
- *"Example request 3"*

---

## Key Components

Describe the main modules or subsystems of the project.

- **<Component Name>** – <responsibility and notes>
- **<Component Name>** – <responsibility and notes>
- **<Component Name>** – <responsibility and notes>

---

## Testing Strategy

- Testing levels: <unit / integration / UI / e2e>
- Coverage expectations: <if defined>
- Test organization: <where tests live and how they are structured>

---

## Documentation Standards

- Primary documentation format: **Markdown**
- Location: `/docs`
- Architecture documentation: <if applicable>
- Diagrams: <PlantUML / C4 / Mermaid>

---

## Testing Commands

```bash
# Build
<build command>

# Test
<test command>

# Run
<run command>
```

---

## Related Files

- User context instructions: `<yourname>_usercontext.instructions.md`
- Specification: `specs/context_aware_ai_session_spec.md`
- Additional docs: <if any>

---

## Future Roadmap

- Planned features or refactors
- Known technical debt
- Maintenance priorities

---

© 2025 – <Project Name> – Project Instructions (Spec v1.2)
