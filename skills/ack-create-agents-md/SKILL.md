---
name: "ack-create-agents-md"
description: "Create AGENTS.md files: the full root file (operational contract, spec-driven change workflow, project context) or a nested file that refines the root for one folder. Use when adding or regenerating any AGENTS.md."
version: "2.1.0"
allowed-tools: [Read, Write, Edit, Bash]
disable-model-invocation: true
metadata:
  workflow_type: "generation"
  invocation: "user"
---

# Create AGENTS.md

## Purpose
Generate an `AGENTS.md` file in one of two modes:
- **root**: the repository's primary entrypoint, following `templates/AGENTS_template.md` section by section, including the spec-driven change workflow (spec section 11.1) and the full project context.
- **nested**: a folder-level file that says only what differs for that folder and points to the root file for everything else.

This skill replaces `create-agents-md` and `create-project-instructions` (ADR-009).

## When To Use
- Use this skill when adding or regenerating a root or nested `AGENTS.md`.
- Do not use this skill for user context files (`ack-create-user-context`) or skills (`ack-create-skill`).

## Choosing The Mode
- Target at the repository root: **root** mode. Target in a subfolder: **nested** mode.
- The user may override the mode explicitly.
- Nested mode requires an existing root `AGENTS.md`. If there is none, stop and offer root mode first.

## Required Inputs
- Target path (decides the mode).
- Root mode: repository purpose, canonical paths, source precedence, session-state defaults, OpenSpec setup, project context.
- Nested mode: the folder's purpose, local paths and commands, and the root rules it overrides.

## Workflow
1. Determine the mode as described above.
2. Run discovery from `references/discovery-phases.md`: all eight phases in root mode; phases 1, 2, 7 and 8, scoped to the folder, in nested mode. Look up facts in the repository before asking; ask each remaining question with a recommended answer.
3. In root mode, discovery phase 6 starts `ack-openspec-check`, then runs `openspec list --json`. An old CLI stops the skill until the user upgrades; without a CLI, read `openspec/` directly and note that in the completion summary.
4. Build the file from `references/root-schema.md` (root) or `references/nested-schema.md` (nested). In root mode, build the command reference from `references/command-template.md` and the roles from `references/role-template.md`.
5. Root mode: stamp `<!-- spec_version: 2.0.0-beta.1 -->` as an HTML comment at the top of the file. Nested files carry the same stamp.
6. Check the result against `references/quality-checklist.md` for the chosen mode.
7. Return the artifact and completion summary as described in `references/output-format.md`.

## Output Expectations
- One complete `AGENTS.md` for the chosen mode.
- Root mode: every section of `references/root-schema.md`, in order, with project-specific content.
- Nested mode: the five sections of `references/nested-schema.md`, with no repetition of root content.
- Relative links only; provider-neutral wording.

## Resources
- Discovery: `references/discovery-phases.md`
- OpenSpec version check: the `ack-openspec-check` skill
- Root schema: `references/root-schema.md`
- Nested schema: `references/nested-schema.md`
- Command reference template: `references/command-template.md`
- Role templates: `references/role-template.md`
- Output contract: `references/output-format.md`
- Quality checklist: `references/quality-checklist.md`
- Canonical template: `../../templates/AGENTS_template.md`
- Repository example: `../../AGENTS.md`

## Constraints And Safety
- Do not copy normative specification text into `AGENTS.md`; link to it.
- Keep canonical paths stable and use relative paths only.
- Do not run `openspec init` or any other command that changes the repository without explicit user approval.
- Do not overwrite an existing `AGENTS.md` without showing the diff and getting approval.
- Keep wording provider-neutral.
