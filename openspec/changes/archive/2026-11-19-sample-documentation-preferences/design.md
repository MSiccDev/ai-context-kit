# Design

## Context

The template's Documentation Preferences section covers READMEs, inline comments and recorded architecture decisions. The sample's Format Preferences already says "Markdown; inline docs for public APIs only", and its JSON metadata has a `preferences` object.

## Goals / Non-Goals

**Goals:**
- The sample has all fifteen required sections, in template order.

**Non-Goals:**
- Rewriting other sample sections.

## Decisions

- **Content follows the persona.** Short bullets for a senior iOS developer: README per project, DocC for public APIs, decisions recorded as ADRs, comments only where intent is non-obvious. The documentation line stays in Format Preferences, because the template has it there too.
- **JSON metadata stays consistent.** If the metadata block has a documentation field, it is updated to match; nothing new is added to the JSON that the markdown does not state.

## Test Seams

Agreed with the user before tasks were written:
- `usercontexts/sample_usercontext.validation.md`, re-run: 100/100, with phase scores that add up.
- `openspec validate sample-documentation-preferences --strict` passes before the change is archived.

## Risks / Trade-offs

- None beyond keeping the fictional persona consistent.
