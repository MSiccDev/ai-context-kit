---
description: 'Implementation — execute the single step approved in the readiness report on a dedicated feature branch.'
---

# Implementation

Proceed with the implementation step you proposed in the readiness report.

Tool preference:
- prefer MCP tools over command line tools for repository actions when available in the current session
- use shell commands as a fallback and state the reason briefly

Use the context already read in the readiness step — do not re-read those files
unless session context was lost.
If context was lost, re-read the following files before proceeding:
- `AGENTS.md`
- `specs/` — all specification files relevant to the target slice
- `docs/implementation-backlog.md` (if it exists)
- `docs/arc42/05-building-block-view.md` and `docs/arc42/10-quality-requirements.md`
  (if `docs/arc42/` exists)
- `docs/adrs/README.md` and every ADR file for the target slice (if it exists)
- `docs/use-cases/README.md` and every use-case file for the target slice (if it exists)

Also use:
- applicable project-local prompts and skills from `.agents/`
- available session skills identified in the readiness step

Use `.agents/` resources only to the degree they are actually visible in this session.
If a resource is not accessible, state that briefly and continue with verified
filesystem context.

Rules:
- if the current branch is `main`, `master`, `dev`, `develop`, or `development`,
  create a dedicated feature branch before making any changes; do not work
  directly on any of those branches
- work on the feature branch for this session; do not commit until after review
  and explicit user go-ahead
- keep the step narrow and reviewable
- add tests together with meaningful logic; never ship logic without
  accompanying tests
- run build and test suite after implementation and include the output
  in the report
- do not introduce new dependencies without an explicit decision
- before editing any arc42 section, check whether the project has an arc42
  helper skill available (e.g. `arc42-toolkit:arc42-section-NN`); if so,
  invoke it rather than editing arc42 docs directly
- update relevant arc42 docs and ADRs in the same change when architecture,
  persistence shape, or layer boundaries are affected
- preserve the architecture and layer boundaries defined in the project's
  AGENTS.md and ADRs (e.g. Clean Architecture: Domain → Application →
  Infrastructure → Presentation); do not introduce cross-layer dependencies
  that the project has not sanctioned
- implement only the slice approved in the readiness step; if readiness
  concluded that definition or ADR work is needed first, do that instead
  of guessing at code
- if any required repository context or agent resource becomes inaccessible,
  stop and ask instead of guessing
- explain important decisions briefly and practically

At the end, provide:
1. what was implemented
2. which slice or task the step advanced
3. whether the step was code, tests, docs, or feature-definition work
4. what tests were added or updated
5. which docs or ADRs were updated