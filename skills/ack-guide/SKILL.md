---
name: "ack-guide"
description: "Point to the right kit or OpenSpec skill for what you want to do next, and help choose between continuing, clearing, handing off, delegating or compacting at a phase boundary."
version: "1.1.0"
allowed-tools: [Read]
disable-model-invocation: true
metadata:
  workflow_type: "navigation"
  invocation: "user"
  credits: "Adapted from mattpocock/skills ask-matt router and phase-boundary tree (MIT, Copyright (c) 2026 Matt Pocock), https://github.com/mattpocock/skills"
---

# Guide

## Purpose
Answer "which skill do I run now?" for every flow the kit supports, from first setup through planning, implementing and archiving an OpenSpec change. At phase boundaries, apply the ordered choices of spec section 4.5.4. This skill adapts Matt Pocock's ask-matt router and phase-boundary tree.

## When To Use
- Use when you are unsure which skill fits the next step.
- Use at a phase boundary (a task group committed, a change archived, a topic switch) or when the session feels heavy.
- Do not use to run the work itself; this skill only recommends.

## Required Inputs
- What you want to do, in your own words.
- Optionally, where you are: the active OpenSpec change and its `state`, and the last skill run.

## Workflow
1. Match the request to a goal in `references/routes.md`. If two goals fit, ask which one.
2. Recommend the skill or skills for that goal, in order, with how to start each in the user's tool. Before recommending an `openspec-*` skill, start `ack-openspec-check`; unless it reports `OK` or `NEWER`, recommend its upgrade steps first.
3. At a phase boundary, walk the options in `references/phase-boundaries.md` in order and recommend the first that fits.
4. If no route fits, say so and list the closest goals.

## Output Expectations
- One recommendation: the skill to run next, why, and how to start it.
- For multi-step goals, the ordered list of skills, marking optional steps.
- At a phase boundary, the chosen option and the one-line reason the earlier options did not fit.

## Resources
- Goal-to-skill routes: `references/routes.md`
- Phase-boundary choices: `references/phase-boundaries.md`
- OpenSpec version check: the `ack-openspec-check` skill
- Spec section 4.5.4 and section 11: `../../specs/context_aware_ai_session_spec.md`

## Constraints And Safety
- Recommend only. The one skill this skill starts is the model-invoked `ack-openspec-check`; every user-invoked skill is started by the user.
- Recommend only skills that exist in the repository or that OpenSpec installed; do not invent skill names.
- Compaction is always the last option, and every option except Continue needs the user's confirmation.
