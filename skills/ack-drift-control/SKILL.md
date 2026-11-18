---
name: "ack-drift-control"
description: "Enforce coordinated updates across specs, templates, skills, samples, and docs to prevent repository guidance drift."
version: "1.1.0"
allowed-tools: [Read, Edit]
disable-model-invocation: true
metadata:
  source_docs: "AGENTS.md, README.md, specs/context_aware_ai_session_spec.md, openspec/config.yaml"
  workflow_type: "governance"
  invocation: "user"
---

# Repository Drift Control

## Purpose
Prevent divergence between authoritative specification, operational skills and templates, and repository-facing documentation.

## When To Use
- Use this skill when specification or governance files change.
- Use this skill during repo-wide refactors affecting canonical paths or precedence rules.
- Do not use this skill for isolated content edits without cross-artifact impact.

## Required Inputs
- Changed authoritative artifact(s), especially `specs/context_aware_ai_session_spec.md` and `AGENTS.md`.
- Current canonical path map.
- List of dependent files expected to be audited.

## Workflow
1. List the changed source-of-truth files and, for each, the dependent files to audit. Done when every changed file has its dependent set.
2. Audit each dependent file (templates, skills, samples, `README.md`, `AGENTS.md`) for terminology, paths and rules that no longer match the source. Done when every file in the set is marked aligned or has a listed finding.
3. Fix each finding with consistent terms and relative paths. Done when a repository-wide search for each old term or path returns no stale hits.
4. Check that policy and precedence still agree across the spec, `AGENTS.md` and `README.md`. Done when no two files give different rules for the same case.
5. Check OpenSpec project context: when `openspec/config.yaml` exists, its `context` points to `AGENTS.md` instead of copying it, and anything it does state (project name, stack, conventions) matches `AGENTS.md`. Done when the field is aligned or each mismatch is listed.
6. Check attribution: every skill with a `metadata.credits` entry has a row in `THIRD_PARTY_NOTICES.md`, every row names an existing skill, and each source's license text is present (ADR-014). Done when skills and rows match one to one.
7. Record what was updated and why in the commit or pull request summary.

## Output Expectations
- Aligned artifacts with no stale references.
- Stable canonical paths and precedence documentation.
- Clear audit trail of what was updated and why.

## Resources
- Governance contract: `../../AGENTS.md`
- Repository guide: `../../README.md`
- Authoritative model: `../../specs/context_aware_ai_session_spec.md`
- OpenSpec project context: `openspec/config.yaml` at the repository root, when present (spec section 11)
- Attribution: `../../THIRD_PARTY_NOTICES.md`

## Constraints And Safety
- Treat specification as authoritative when conflicts exist.
- Keep guidance provider-neutral.
- Preserve canonical path stability unless explicitly migrating.
- Avoid partial updates that leave dependent artifacts inconsistent.
