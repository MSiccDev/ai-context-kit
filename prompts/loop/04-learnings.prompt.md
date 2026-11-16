---
description: 'Learnings — capture and teach the key lessons from the implemented task group of an OpenSpec change and its two-axis review; optional but recommended.'
---

# Learnings

Do not make further changes yet.

Tool preference:
- prefer MCP tools over command line tools for repository actions
  when available in the current session
- use shell commands as a fallback and state the reason briefly

## Stack Context

The learnings below refer to five stack values by name. Resolve them from the
session; do not require the user to edit this prompt.

Sources, in order:
1. user context instructions and `AGENTS.md` (Tech Stack, Architecture, and
   user background sections)
2. the implementation and self-review output in this session

Values:
- `[PRIMARY_STACK]` — primary language / framework, e.g. React, SwiftUI, Blazor
- `[SECONDARY_STACK]` — secondary language / framework, e.g. ASP.NET Core
- `[ARCHITECTURE_PATTERN]` — e.g. Clean Architecture, MVVM
- `[USER_BACKGROUND]` — the user's reference background, e.g. .NET / C#
- `[LEARNING_FOCUS]` — focus areas (optional)

Before doing anything else, run two checks in order:

**1. Stack context check**
Resolve each value from the sources above. If a required value (every value
except `[LEARNING_FOCUS]`) cannot be determined, ask the user for exactly those
values and wait for the answer. Do not guess. Wherever `[PRIMARY_STACK]`,
`[SECONDARY_STACK]`, `[ARCHITECTURE_PATTERN]`, `[USER_BACKGROUND]`, or
`[LEARNING_FOCUS]` appears below, use the resolved value.

**2. Self-review status check**
Check the self-review report for its status line:
- If the report opens with `STATUS: BLOCKED`, stop immediately. Do not produce
  a learning report. Tell the user: "The self-review is blocked. Resolve the
  findings listed in the review report, then re-run the implementation step
  before continuing to learnings."
- If the report opens with `STATUS: PASS`, proceed.

Capture the learnings from the task group just implemented for the OpenSpec
change, and from the review that followed.

Purpose:
- teach the user what was learned from this step
- explain the reasoning behind the change
- highlight [PRIMARY_STACK] and [SECONDARY_STACK] lessons when relevant
- map each extracted learning to the user's [USER_BACKGROUND] background
  when that comparison would help transfer understanding
- prioritize [LEARNING_FOCUS] given the user's stated focus areas

Primary inputs:
- the implementation report (change id, task group, ticked tasks)
- the review report, with its Spec and Standards findings
- the change's `proposal.md` and `design.md`, as the source of why the change
  exists and which decisions and test seams it chose
- the most relevant changed files
- the most relevant tests
- the most relevant docs, if any

Do not redo the readiness step.
Do not redo the review.
Do not search broadly for extra scope.
If the review found issues, use them as teaching material rather than
turning this into another review. Keep the two kinds apart: Spec findings
teach how the code drifted from what the change asked for; Standards findings
teach code quality.

Read only the minimum repository guidance needed to explain the touched
code correctly.
Use concrete references to the code and tests from this step.
When presenting learnings, connect them to familiar [USER_BACKGROUND]
concepts, patterns, or mental models where that helps transfer understanding
without forcing weak analogies.

Focus on:
- what changed and why this task group was the right step now, in terms of
  the change's proposal and design
- how the code meets the requirements and scenarios in the change's spec deltas
- the most important abstraction points or testable boundaries
- what the tests are proving
- the most relevant [PRIMARY_STACK] patterns or pitfalls
- the most relevant [SECONDARY_STACK] details
- the most relevant [ARCHITECTURE_PATTERN] decisions and their rationale
- the most instructive tradeoffs, risks, or mistakes
- what the user should study next

Do not make code changes in this step.

Reply with a short learning report:
1. a short explanation of what was implemented (change id and task group)
   and why it mattered, grounded in the change's proposal and design
2. the 3 to 5 most important learnings, each mapped to the user's
   [USER_BACKGROUND] background where useful
3. which [PRIMARY_STACK] patterns or pitfalls are most worth studying
4. which [SECONDARY_STACK] details are most worth studying
5. which [ARCHITECTURE_PATTERN] decisions are most worth reflecting on
6. which abstraction points or testable boundaries are most worth studying
7. which tests are most worth reading and what they prove
8. which risks, mistakes, or tradeoffs were most instructive, keeping lessons
   from Spec findings separate from lessons from Standards findings
9. which files the user should read next, in order
10. one small follow-up exercise or reflection question for the user
11. any limitation in the available context or evidence for this
    learning step

Stop and wait for explicit next instruction before making any changes.