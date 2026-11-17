# Implementation

Proceed with the task group you proposed in the readiness report.

Tool preference:
- prefer MCP tools over command line tools for repository actions when available in the current session
- use shell commands as a fallback and state the reason briefly

Use the context already read in the readiness step — do not re-read those files
unless session context was lost.
If context was lost, re-read the following files before proceeding:
- `AGENTS.md`
- the change's `proposal.md`, `design.md`, `tasks.md` and spec deltas
  (`openspec status --change <id> --json` lists the paths under `artifactPaths`)
- `docs/arc42/05-building-block-view.md` and `docs/arc42/10-quality-requirements.md`
  (if `docs/arc42/` exists)
- `docs/adr/README.md` and every ADR relevant to the change (if it exists;
  fall back to `docs/adrs/` if `docs/adr/` is absent)
- `docs/use-cases/README.md` and every use-case file linked to the change (if it exists)

Also use:
- applicable project-local prompts and skills from `.agents/`
- available session skills identified in the readiness step

Use `.agents/` resources only to the degree they are actually visible in this session.
If a resource is not accessible, state that briefly and continue with verified
filesystem context.

## Fixing review findings

If this run follows a `STATUS: BLOCKED` self-review, fix those findings first:
- untick (`- [x]` → `- [ ]`) each task in `tasks.md` whose work a finding
  affects, or add a corrective task to the same group for a finding that no
  existing task covers
- list the reopened and added tasks, with the finding each one answers
- then continue below; the reopened and added tasks are the approved scope for
  this run, and nothing else

Reopening tasks is what puts an `all_done` change back to `ready`, so review
fixes go through the same gate and the same tick-after-tests rule as any task.

## Gate

Before changing any code, run `openspec instructions apply --change <id> --json`
and confirm `state` is `ready`. If it is not, stop and re-run the
readiness step.

Work task by task:
- take the tasks of the approved group in order (or, when fixing review
  findings, the reopened and added tasks)
- for each task: implement it, add or update its tests, then run build and tests
- tick the task in `tasks.md` (`- [ ]` → `- [x]`) only after its build and tests pass
- if a task cannot pass, leave it unticked, stop, and report why

Rules:
- if the current branch is `main`, `master`, `dev`, `develop`, or `development`,
  create a dedicated feature branch before making any changes; do not work
  directly on any of those branches
- work on the feature branch for this session; do not commit until after review
  and explicit user go-ahead
- implement only the approved task group; do not start the next group
- add tests together with meaningful logic; never ship logic without
  accompanying tests
- write tests at the seams named in `design.md`; if a TDD skill is available,
  use it at those seams; if the design names no seams, ask before choosing them
- run build and test suite after implementation and include the output
  in the report
- do not introduce new dependencies without an explicit decision
- do not edit generated `openspec-*` skills or commands
- if implementation shows that a spec delta, the design or a task is wrong,
  stop and propose updating the change; do not silently diverge from it
- before editing any arc42 section, check whether the project has an arc42
  helper skill available (e.g. `arc42-toolkit:arc42-section-NN`); if so,
  invoke it rather than editing arc42 docs directly
- update relevant arc42 docs and ADRs in the same change when architecture,
  persistence shape, or layer boundaries are affected
- preserve the architecture and layer boundaries defined in the project's
  AGENTS.md and ADRs (e.g. Clean Architecture: Domain → Application →
  Infrastructure → Presentation); do not introduce cross-layer dependencies
  that the project has not sanctioned
- if any required repository context or agent resource becomes inaccessible,
  stop and ask instead of guessing
- explain important decisions briefly and practically

When the group is done, run `openspec instructions apply --change <id> --json`
again and report the new `progress` and `state`.

At the end, provide:
1. the change id and the task group implemented, and, when fixing review
   findings, which tasks were reopened or added and for which finding
2. each task ticked in `tasks.md`, and any task left unticked with the reason
3. the new task progress and `state`
4. what tests were added or updated, at which seams
5. build and test output
6. which docs or ADRs were updated
7. any place where the change itself should be updated
