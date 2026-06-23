---
description: 'Readiness check — assess the target slice and produce a readiness report before any implementation begins.'
---

# Readiness Check

Do not start implementation yet.

Read `AGENTS.md` first and follow its precedence and role guidance throughout.

Then read each of the following files in full if they exist:
- `docs/implementation-backlog.md`
- `specs/` — all specification files relevant to the target slice
  (fall back to `docs/specs/` if `specs/` is absent)
- `docs/adrs/README.md` and every ADR file listed for the target slice
- `docs/use-cases/README.md` and every use-case file linked for the target slice

For arc42 architecture documentation, check whether a `docs/arc42/` folder exists:
- If it exists, read `docs/arc42/05-building-block-view.md` and
  `docs/arc42/10-quality-requirements.md` in full.
- If it does not exist, note this in the readiness report and recommend that
  the user consider adopting arc42 for structured architecture documentation.
  Do not block the readiness assessment on its absence.

Do not proceed to the readiness assessment until all available files above have been read.

Inspect the primary code and test directories to confirm the current solution structure
(commonly `src/` and `tests/`, but use whatever the project defines).
Check `.agents/skills/` for any applicable skills.

Explicitly list in the readiness report:
- which skills under `.agents/skills/` apply to this slice
- if arc42 docs are present: which sections are likely to need updating after
  implementation, and which skill under `.agents/skills/` covers each one

If the user named a slice or task, target that.
If not, determine the target in this order:
1. Check the `Current Objectives` section of `AGENTS.md` for a single clear active item.
2. If that is ambiguous, check `docs/implementation-backlog.md` for the first
   unstarted or in-progress item.
3. If neither gives a single unambiguous target, stop and ask the user to name
   the slice or task explicitly. Do not guess.

Determine:
- whether the target is implementation-ready, needs definition first,
  or is blocked by an unresolved ADR
- the single next smallest meaningful step (code, tests, docs, or definition)
- which files in the project's code and test directories would be touched

Reply with a short readiness report covering the above,
plus any visibility gaps or missing context.
Stop and wait for explicit go-ahead before making any changes.