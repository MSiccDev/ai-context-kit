---
name: "ack-interview-with-context"
description: "Interview the user about a planned change while building the project glossary: settle open decisions, challenge fuzzy terms, record terms with the synonyms to avoid, and offer an ADR only for decisions that pass the three-part test. Run before proposing an OpenSpec change."
version: "1.0.0"
allowed-tools: [Read, Write, Edit]
disable-model-invocation: true
metadata:
  workflow_type: "interview"
  invocation: "user"
  credits: "Adapted from mattpocock/skills grill-with-docs and domain-modeling (MIT, Copyright (c) 2026 Matt Pocock), https://github.com/mattpocock/skills"
---

# Interview With Context

## Purpose
Prepare a change by settling its decisions and its language at the same time, so the OpenSpec proposal that follows uses agreed terms and records only real architecture decisions. It combines the interview method of `ack-interview` with the glossary rules of ADR-007. This skill adapts Matt Pocock's grill-with-docs and domain-modeling skills (ADR-012).

## When To Use
- Use before `openspec-propose`, especially when the change touches domain language.
- Use when the team's terms are fuzzy or used inconsistently.
- Do not use for a change with no new decisions or terms; propose directly.

## Required Inputs
- The idea or problem the change addresses.
- The glossary: arc42 section 12 when `docs/arc42/` exists, otherwise `CONTEXT.md` at the repository root (created when the first term is recorded).
- The ADR index, `docs/adr/README.md`, and, when `docs/arc42/` exists, the arc42 section 9 decision log.

## Workflow
1. Read the glossary and the ADR index.
2. Interview the user with the method in `../ack-interview/references/method.md`.
3. Whenever a term is vague, overloaded or used with two meanings, stop and settle it with the rules in `references/glossary.md`.
4. When a decision passes the three-part test in `references/glossary.md`, offer to record it as an ADR in `docs/adr/`, indexed in `docs/adr/README.md` and, when arc42 exists, in the section 9 decision log. Write it only if the user agrees.
5. When nothing is left open, write the glossary changes the user approved, and summarise the decisions, the new or changed terms, and any ADR written.
6. Recommend `openspec-propose` as the next step, with the summary as its input.

## Output Expectations
- Settled decisions, each with its source.
- Glossary updates: each term with its definition and the synonyms to avoid.
- Any ADR written, linked from `docs/adr/README.md` and, when arc42 exists, from the section 9 decision log.
- A closing summary ready to feed into `openspec-propose`.

## Resources
- Glossary and ADR rules: `references/glossary.md`
- Interview method: `../ack-interview/references/method.md`
- Glossary home: ADR-007, `../../docs/adr/ADR-007-glossary-home.md`
- ADR home and test: ADR-006, `../../docs/adr/ADR-006-adr-home.md`

## Constraints And Safety
- Show every glossary or ADR change and get approval before writing it.
- When arc42 exists, write terms through the project's arc42 section 12 skill and ADR index entries through its section 9 skill, if available, rather than editing the files directly.
- Never create an ADR for a decision that fails the three-part test.
