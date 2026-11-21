# Design

## Context

ADR-001 rejected optional OpenSpec for one reason: two paths for building work would give every downstream rule a fallback. The maintainer chose option C (OpenSpec required only for the loop), docs and content repositories as the case, and "ADR now, build in 2.1" (2026-11-21).

## Goals / Non-Goals

**Goals:**
- Record the decision and its 2.1 scope before `release/2.0.0`.

**Non-Goals:**
- Any behaviour change in 2.0.0.

## Decisions

- **A new ADR narrows ADR-001.** The ADR rules forbid rewriting an accepted decision, so ADR-001 gets only a status note.

## Test Seams

Proposed; to be confirmed with the maintainer before tasks are written.

## Risks / Trade-offs

- None for 2.0.0.
