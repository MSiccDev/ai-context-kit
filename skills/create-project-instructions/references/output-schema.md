# Output Schema: create-project-instructions

## Required Sections (in order)
1. Purpose
2. Source Of Truth And Precedence
3. Repository Map
4. Scope And Precedence For AGENTS.md Files
5. Session-State Contract
6. Command Namespace Policy
7. Repository Project Context
8. Formatting And Path Stability Rules
9. Update And Drift-Control Rule
10. Key References

## Scope And Precedence For AGENTS.md Files: Required Rules
- An `AGENTS.md` applies to its directory and all subdirectories.
- When several apply, the closest (deepest) one wins for files in its subtree.
- The root `AGENTS.md` stays global; nested files stay folder-specific.
- If instructions conflict or remain unclear after precedence, ask before proceeding.

## Repository Project Context: Required Subsections
The `Repository Project Context` section must include all of the following subsections:
- Overview
- Role Definitions
- Tech Stack
- Current Objectives
- Development Principles
- Repository Context
- Working Together
- Key Components
- Testing Strategy
- Documentation Standards
- Testing Commands
- Future Roadmap

## Core Project Context Completeness Requirement
All required core project-context sections must be present with substantive content, either as:
- first-class AGENTS sections, or
- required `Repository Project Context` subsections listed above.

## Section Quality Requirements
- All required sections must have substantive, project-specific content.
- Default state table must include Project, Role, Phase, Output Style, Tone, Interaction Mode.
- Command reference must include the namespaced control surface.
- Output must remain provider-neutral.
