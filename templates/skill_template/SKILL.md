---
name: "example-skill"
description: "Briefly describe what this skill does and when it should be used."
version: "1.0.0"
allowed-tools: [Read]
disable-model-invocation: true
license: "Optional license identifier"
compatibility: "Optional environment/runtime requirements."
metadata:
  invocation: "user"
  owner: "Optional owner"
  domain: "Optional domain"
---

# Example Skill

## Purpose
Describe the capability this skill provides and the problem it solves.

## When To Use
- Use this skill when the task matches this domain.
- Do not use this skill for unrelated tasks.

## Required Inputs
- List required information the assistant needs before applying this skill.

## Workflow
1. Confirm the task fits the skill scope. Done when the request matches When To Use.
2. Gather only the inputs required for this workflow. Done when every required input has a value.
3. Execute the steps in order. End each step on a completion criterion: the artifact, decision or check result that shows it is done.

## Output Expectations
- Define the expected output format and quality criteria.
- Include any acceptance checks.

## Resources
- `references/` for detailed docs loaded on demand.
- `scripts/` for optional automation or checks.
- `assets/` for reusable static artifacts.

## Constraints And Safety
- Keep instructions concise in this file; move large material to `references/`.
- Use relative paths for all skill-local references.
- Mention risky operations explicitly and require confirmation before running them.

## Frontmatter Rules
- `name` (required):
- 1-64 characters.
- Lowercase letters, numbers, and hyphens only.
- No leading/trailing hyphen.
- No consecutive hyphens.
- Must match the parent skill directory name.
- `description` (required):
- 1-1024 characters.
- It is the pointer that decides when the skill is reached. Model-invoked: say what the skill does, then each distinct trigger ("Use when …"). User-invoked: a one-line summary; a trigger list is optional. See `skills/ack-validate-skill/references/writing-for-agents.md`.
- `license` (optional): short license identifier.
- `compatibility` (optional):
- 1-500 characters.
- Use only for real environment constraints.
- `metadata` (optional): map of string keys to string values.
- `metadata.invocation` (required by this kit): `"user"` when only the user may start the skill (workflows with side effects or a fixed order, such as create, validate, governance and loop skills), or `"model"` when the assistant may start it on its own (for example, proposing a checkpoint at session end).
- `disable-model-invocation` (Claude Code only): `true` exactly when `metadata.invocation` is `"user"`; omit it otherwise. It stops Claude Code from loading the skill on its own. It is outside the Agent Skills spec, so remove this one line before uploading the skill to claude.ai or the Skills API, which reject unknown keys.
- Codex reads invocation policy from a separate `agents/openai.yaml` file, which the kit installer generates from `metadata.invocation`; do not write it by hand.
- A user-invoked skill is never started by another skill; a skill may only tell the user which skill to run next.
- `metadata.credits` (when adapting external material): one string with source, license, copyright and URL; also name the origin once in the body and list the skill in `THIRD_PARTY_NOTICES.md`.
- `version` (optional): semver string (e.g. `"1.0.0"`). Increment when skill behavior changes.
- `allowed-tools` (optional): YAML flow list of tool names this skill may invoke (e.g. `[Read, Write, Edit]`).
