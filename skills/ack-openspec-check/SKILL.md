---
name: "ack-openspec-check"
description: "Check that the OpenSpec CLI is 2.1.0 or later and that the OpenSpec files in the repository match it, and give the upgrade steps when they do not. Use before relying on OpenSpec, when an openspec command fails or behaves unexpectedly, or when someone asks which OpenSpec version is set up."
version: "1.1.0"
allowed-tools: [Read, Bash]
metadata:
  workflow_type: "governance"
  invocation: "model"
---

# OpenSpec Check

## Purpose
Detect an OpenSpec set-up older than the kit supports, and say exactly how to upgrade it. The kit relies on OpenSpec 2.1.0 or later (spec section 11.6, ADR-016). Two things can be out of date on their own: the CLI on the machine, and the files OpenSpec generated into the repository. This skill checks both and changes neither.

## When To Use
- Use before any step that relies on OpenSpec; `ack-loop-01-readiness`, `ack-create-agents-md`, `ack-validate-agents-md` and `ack-guide` start it.
- Use when an `openspec` command fails, is unknown, or returns output in an unexpected shape.
- Use when the user asks which OpenSpec version is installed or whether it is current.
- Do not use this skill to set up OpenSpec in a repository for the first time; `openspec init` does that, offered by `ack-create-agents-md`.

## Required Inputs
- A shell in the repository, so the `openspec` commands can run.

## Workflow
1. Run `openspec --version`. Done when you have a version, or know the command is missing.
2. Classify the CLI with `references/upgrade.md`: `NO_CLI`, `UPGRADE_CLI` (older than 2.1.0), `NEWER` (a later major than 2) or current. For `NO_CLI` and `UPGRADE_CLI`, skip to step 4.
3. Check the generated files with `openspec update --dry-run --json`; if the command fails, use the fallback in `references/upgrade.md`. Done when the files are classified as current, `UPDATE_FILES`, or `UNVERIFIED` (the fallback found no 1.x markers and so cannot confirm the files are current).
4. Report one status line (`OPENSPEC: OK`, `NEWER`, `UPDATE_FILES`, `UNVERIFIED`, `UPGRADE_CLI` or `NO_CLI`), the versions found, and for every status except `OK` the steps from `references/upgrade.md`, with the user's package manager where `openspec version --json` names it.

## Output Expectations
- The status line first, so the calling skill can act on it: `OK` and `NEWER` continue; `UPDATE_FILES` and `UNVERIFIED` continue only after the user runs `openspec update` (for `UNVERIFIED`, at least its dry run) or says to proceed; `UPGRADE_CLI` and `NO_CLI` stop (manual mode still allows planning).
- The CLI version, and for `UPDATE_FILES` how many generated files would change and whether any are 1.x `/opsx:*` command files.
- The upgrade steps, copied from `references/upgrade.md` and filled in for this machine. After an install or upgrade they include the telemetry opt-out and the question whether to keep telemetry on.

## Resources
- Version rule, classification and upgrade steps: `references/upgrade.md`
- Decision: ADR-016, `../../docs/adr/ADR-016-minimum-openspec-2-1.md` (in the kit repository)

## Constraints And Safety
- Run only `openspec --version`, `openspec version --json` and `openspec update --dry-run --json`. Installing, upgrading and `openspec update` are for the user to run; offer the commands and wait.
- Never use sudo or edit shell profiles in any suggested command.
