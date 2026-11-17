# Self-Review

Do not make further changes yet.

Tool preference:
- prefer MCP tools over command line tools for repository actions when available in the current session
- use shell commands as a fallback and state the reason briefly

Review the task group that was just implemented.

Purpose:
- review the change
- find concrete issues or confirm that none were found

Primary inputs:
- the implementation report from the previous step
- the OpenSpec change: `proposal.md`, `design.md`, `tasks.md` and its spec deltas
- the changed files and their diffs
- the tests and docs touched by the change
- build and test output if available

Use the context already read in the readiness step — the change, ADRs, use cases,
and architecture files are already loaded.
Do not redo the readiness step or perform broad repository discovery.
Read only files that were not part of the original readiness context and are
needed to judge the touched code correctly.

## Two axes

Review the change on two separate axes. If sub-agents are available, run each
axis in its own sub-agent in parallel; otherwise run them one after the other.
Keep each axis's findings in its own section. Do not merge the two lists or
re-rank findings across axes.

### Spec axis: does the code do what the change says?

- Run `openspec validate <id> --strict --json`. Any item with `valid: false` is
  a blocking finding; quote its issues.
- Every task ticked in `tasks.md` is actually implemented and tested.
- Every requirement and scenario in the spec deltas that this task group covers
  is implemented and has a test that would fail without it.
- Nothing was implemented outside the change's scope.
- A change with `skip_specs: true` has no behavior change in the diff.

### Standards axis: is the code sound?

Prioritize findings in this order:
- bugs and behavioral regressions
- architecture or layer boundary violations as defined in the project's
  AGENTS.md and ADRs (e.g. Clean Architecture: Domain → Application →
  Infrastructure → Presentation)
- missing or weak tests
- documentation or ADR drift relative to the implementation
- other risks introduced by the change

Do not make code changes in this step.
Do not turn the review into a redesign discussion unless needed to explain
a concrete issue.

## Report

Reply with a short review report.

Open the report with one of these two status lines — nothing before it:

  STATUS: BLOCKED — critical findings must be resolved before proceeding
  STATUS: PASS — no blocking findings

The status is BLOCKED if either axis has a blocking finding, including a
failed `openspec validate --strict`.

Then give the findings in two sections, **Spec** and **Standards**, each in
severity order. For each finding include:
- priority
- affected file and line if available
- the concrete problem
- why it matters
- the expected correction

If an axis has no findings, say so explicitly for that axis.

Then include:
1. the `openspec validate --strict` result
2. which files, tests, and docs you reviewed
3. what build and test output you considered
4. whether the axes ran in parallel sub-agents or one after the other
5. any context or diff limitation that reduced review confidence
6. any residual risk or testing gap even if no finding was raised

Stop and wait for explicit next instruction before making any changes.
