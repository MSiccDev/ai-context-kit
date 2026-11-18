---
name: "ack-interview"
description: "Interview the user in rounds to settle open decisions: look up every fact first, ask only about decisions whose prerequisites are settled, and give a recommended answer with each question. Use whenever a skill or task needs decisions from the user, such as create-* discovery phases."
version: "1.0.0"
allowed-tools: [Read]
metadata:
  workflow_type: "interview"
  invocation: "model"
  credits: "Adapted from mattpocock/skills grilling (MIT, Copyright (c) 2026 Matt Pocock), https://github.com/mattpocock/skills"
---

# Interview

## Purpose
Turn an open-ended request into settled decisions with as few, as good questions as possible. Facts are the assistant's job; decisions are the user's. This skill adapts Matt Pocock's grilling skill (ADR-012).

## When To Use
- Use when a task needs decisions only the user can make, for example the discovery phases of `ack-create-agents-md`, `ack-create-user-context` and `ack-create-skill`.
- Use when a request is ambiguous and the AGENTS.md ambiguity rule applies.
- Do not use for facts the repository, the user context or the session can answer; look those up.
- For decisions that touch domain language, the user can run `ack-interview-with-context` instead.

## Required Inputs
- The list of decisions the calling skill or task needs (its required fields).
- Access to the repository, user context and session, to look up facts.

## Workflow
1. List every open item the task needs, and look up each one that is a fact. Close those without asking.
2. From the remaining decisions, take the frontier: those whose prerequisites are already settled.
3. Ask one round about the frontier, following `references/method.md`: each question names the decision, gives a recommended answer and why, and lists the main alternatives.
4. Record the answers, then repeat from step 2 with the new frontier.
5. Stop only when nothing is left open, then summarise every decision and its source (looked up, answered, or default accepted).

## Output Expectations
- Rounds of focused questions, each with a recommended answer.
- A final summary: each decision, its value, and whether it was looked up or decided by the user.
- No open item left unmentioned; anything the user deferred is listed as deferred.

## Resources
- Question method and done criteria: `references/method.md`

## Constraints And Safety
- Never ask the user for something you could look up.
- Never decide on the user's behalf; a recommended answer is a proposal until the user accepts it.
- Do not change files; the calling skill writes the result.
