---
name: "create-checkpoint"
description: "Capture the current session state as a checkpoint artifact per §4.4 of the AI Context Kit spec. Use when the user signals session end or explicitly requests a checkpoint. Do not use mid-session or without user approval."
version: "1.0.0"
allowed-tools: [Read, Write]
---

# Create Checkpoint

## Purpose
Capture the active session state as a structured Markdown checkpoint artifact so the session can be restored in a future conversation.

## When To Use
- When the user signals they are ending the session and want to resume later.
- When the user explicitly requests a checkpoint.
- Do not create checkpoints silently or mid-session without the user's explicit request.

## Required Inputs
- Current active values for: project, role, phase, output_style, tone, and interaction_mode (if established).
- Open tasks or confirmed next steps from this session.
- Key decisions made during this session that affect future work.
- File paths actively referenced or modified this session.

## Workflow
1. Collect the current values for all required schema fields from active session state.
2. List all open tasks — items in progress or confirmed next steps.
3. List key decisions made this session that would affect future work.
4. List file paths actively referenced or modified.
5. Draft the checkpoint artifact using the schema in `references/checkpoint-schema.md`.
6. Present the full draft to the user for review and approval before writing anything.
7. Write the file only after the user explicitly approves.
8. Suggest saving as `checkpoint-YYYY-MM-DD.md` in the project root or a `checkpoints/` folder if one exists. Let the user decide the exact path.

## Output Expectations
- A Markdown file with YAML frontmatter containing all required schema fields.
- Human-readable summary paragraph below the frontmatter is optional but encouraged.
- The file must not be written without explicit user approval.
- Sensitive data (credentials, private client content) must never be included.

## Resources
- `references/checkpoint-schema.md` for field definitions, constraints, and an example artifact.

## Constraints And Safety
- Checkpoint artifacts must be stored outside the instruction layer — never inside `AGENTS.md` or user context files.
- Always require explicit user confirmation before writing the file.
- If a field value is unknown or not yet established, use `null`.
- Never include sensitive information such as credentials, API keys, or private client content.
