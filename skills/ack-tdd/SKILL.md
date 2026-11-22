---
name: "ack-tdd"
description: "Test-driven implementation: agree the test seams with the user before any test, then work one vertical slice per cycle, failing test first, then the minimal code to pass, then refactor. Use when implementing a task that adds or changes behavior, such as a task group in ack-loop-02-implement."
version: "1.0.0"
allowed-tools: [Read, Write, Edit, Bash]
metadata:
  workflow_type: "implementation"
  invocation: "model"
  credits: "Adapted from mattpocock/skills tdd (MIT, Copyright (c) 2026 Matt Pocock), https://github.com/mattpocock/skills"
---

# Test-Driven Development

## Purpose
Make every behavior change arrive with a test that failed before the change and passes after it, written at a seam the user agreed to. This skill adapts Matt Pocock's tdd skill.

## When To Use
- Use when implementing a task that adds or changes behavior, for example inside `ack-loop-02-implement`.
- Do not use for changes with no behavior impact (documentation, formatting, a `skip_specs: true` change).

## Required Inputs
- The task and the behavior it must produce (from the OpenSpec change's tasks and spec deltas, when there is one).
- The test seams named in the change's `design.md`, if any.
- A way to run the project's tests.

## Workflow
1. **Agree the seams first.** Take the seams from `design.md`. If none are named, propose them with a recommended answer and get the user's agreement before writing any test.
2. **Pick one slice:** the smallest piece of behavior that is visible at a seam, cutting through every layer it needs (a vertical slice).
3. **Red:** write one test for that slice at the agreed seam. Run it and show that it fails, for the expected reason.
4. **Green:** write the minimal code that makes it pass. Run the tests and show they pass.
5. **Refactor:** clean up with all tests still passing.
6. Repeat from step 2 until the task's behavior is covered. Then report the slices, tests and runs.

## Output Expectations
- For each slice: the test, the failing run, the passing run.
- Tests only at agreed seams, each able to fail without the change.
- A short report listing slices, tests and seams, ready for the implementation report.

## Resources
- Cycle rules and anti-patterns: `references/cycle.md`

## Constraints And Safety
- No test before the seams are agreed; no code before a failing test.
- One slice per cycle; do not write a batch of tests first.
- Do not add test dependencies without an explicit decision.
- Do not commit; committing belongs to `ack-loop-05-commit`.
