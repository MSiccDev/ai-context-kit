# Design

## Context

Findings from a repository-wide scan on 2026-11-21, listed in the proposal.

## Goals / Non-Goals

**Goals:**
- Every statement a 2.0.0 user reads matches the kit as released.

**Non-Goals:**
- Content changes beyond the findings; ADR-019's 2.1 work.

## Decisions

- **No skill counts in prose.** Counts went stale twice; "all kit skills" cannot.
- **Links accept both checkout forms.** On Windows, git checks a symbolic link out as a text file holding its target when symlinks are off, so the drift test accepts either form.
- **Historical changelog facts stay.** For example, "checked against OpenSpec 1.13.2 and 2.0.0" records what was tested at the time. Only statements about the current kit were changed.

## Test Seams

Agreed with the maintainer on 2026-11-21:
- Drift test: README, AGENTS template, `ack-openspec-check` and the installer README each name both telemetry opt-outs.
- Drift test: every `skills/ack-*` folder has a matching `.agents/skills/` link to it.
- Re-run `SKILL.validation.md` for `ack-openspec-check` and `ack-create-agents-md`, and `AGENTS.validation.md`.
- Path scan: the README tree's paths exist; no "all 11 skills", "two checkpoint skills", "does not ship yet" or "will generate it" wording; no "not yet published" and no Node 20.19 in `[Unreleased]`.

## Risks / Trade-offs

- None.
