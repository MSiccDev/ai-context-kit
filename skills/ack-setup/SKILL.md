---
name: "ack-setup"
description: "Run once per repository after the kit installer: explore the repository, recommend the skills that set up OpenSpec, project context and your user context, and agree the order with you."
version: "1.0.0"
allowed-tools: [Read, Bash]
disable-model-invocation: true
metadata:
  workflow_type: "setup"
  invocation: "user"
  credits: "Adapted from mattpocock/skills setup-matt-pocock-skills (MIT, Copyright (c) 2026 Matt Pocock), https://github.com/mattpocock/skills"
---

# Setup

## Purpose
Turn a fresh kit install into a working setup. `ai-context-kit init` copies the skills and writes the marker blocks; this skill finds out what the repository still needs and tells the user which skills to run, in which order. It follows the explore, present, confirm pattern of Matt Pocock's `setup-matt-pocock-skills`.

## When To Use
- Use this skill once after `ai-context-kit init`, or when `init`'s closing message or the `AGENTS.md` kit block says to run it.
- Use it again after adding a tool with `ai-context-kit init --tools <id>`.
- Do not use this skill to install the kit; follow `install.md` at the kit repository's root. To write `AGENTS.md`, run `ack-create-agents-md`.

## Required Inputs
- The repository root, with `.ai-context-kit/manifest.json` written by `init`.
- Answers to the questions in step 2, one area at a time.

## Workflow
1. **Explore.** Read every source listed in `references/areas.md` before asking anything, and run `ack-openspec-check`. Done when each of the three areas (OpenSpec, project context, user context) has a finding.
2. **Present and ask.** For each area in the order of `references/areas.md`, state the finding, then the recommended next skill or command and why, then ask the user to accept or change it. Ask about one area at a time. Done when every area has an accepted answer or "skip".
3. **Confirm.** Show the resulting plan: the ordered list of skills and commands, each spelled for every tool in the manifest's `tools` (for example `/ack-create-agents-md` in Claude Code, `$ack-create-agents-md` in Codex). Done when the user confirms the list.
4. **Hand off.** End with the confirmed list and the first item to run. Done when the list is shown; the user starts each user-invoked skill.

## Output Expectations
- A findings summary, one line per area.
- The confirmed, ordered list of next skills and commands, spelled per installed tool.
- No files written or changed by this skill.

## Resources
- Sources to read, findings and recommendations per area: `references/areas.md`
- OpenSpec version check: the `ack-openspec-check` skill
- Installer commands: `ai-context-kit doctor` checks the install; `ai-context-kit tools` lists the invocation spelling per tool

## Constraints And Safety
- This skill only reads. Writing belongs to the skills it recommends: `ack-create-agents-md` for `AGENTS.md`, `ack-create-user-context` for the user context file, and the OpenSpec CLI for `openspec/`.
- Start only the model-invoked `ack-openspec-check`; name every user-invoked skill for the user to run.
- Keep the user context file outside the repository: ask where it lives and how the user's tools load it, and record the answer nowhere in the repository.
- Run only read-only commands (`git remote -v`, `ai-context-kit doctor`, `openspec list --json`); installing or upgrading software is a recommendation for the user.
