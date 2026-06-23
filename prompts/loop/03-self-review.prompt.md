---
description: 'Self-review — review the completed implementation and emit a STATUS: PASS or STATUS: BLOCKED report before proceeding.'
---

# Self-Review

Do not make further changes yet.

Tool preference:
- prefer MCP tools over command line tools for repository actions when available in the current session
- use shell commands as a fallback and state the reason briefly

Review the implementation that was just completed.

Purpose:
- review the change
- find concrete issues or confirm that none were found

Primary inputs:
- the implementation report from the previous step
- the changed files and their diffs
- the tests and docs touched by the change
- build and test output if available

Use the context already read in the readiness step — ADRs, use cases, and
architecture files are already loaded.
Do not redo the readiness step or perform broad repository discovery.
Read only files that were not part of the original readiness context and are
needed to judge the touched code correctly.

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

Reply with a short review report.

Open the report with one of these two status lines — nothing before it:

  STATUS: BLOCKED — critical findings must be resolved before proceeding
  STATUS: PASS — no blocking findings

If status is BLOCKED, list findings immediately after, in severity order.
For each finding include:
- priority
- affected file and line if available
- the concrete problem
- why it matters
- the expected correction

If status is PASS, confirm that explicitly.

Then include:
1. which files, tests, and docs you reviewed
2. what build and test output you considered
3. any context or diff limitation that reduced review confidence
4. any residual risk or testing gap even if no finding was raised

Stop and wait for explicit next instruction before making any changes.