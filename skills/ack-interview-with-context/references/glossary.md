# Glossary And ADR Rules: ack-interview-with-context

## Where terms live (ADR-007)
- **arc42 present** (`docs/arc42/` exists): section 12 holds the terms. Its alias column is the "avoid" list. `CONTEXT.md`, if present, only points to section 12.
- **No arc42:** `CONTEXT.md` at the repository root holds the terms. Create it when the first term is recorded, not before.

## Entry shape
| Term | Definition | Avoid |
| --- | --- | --- |
| The preferred word | One or two sentences in the project's own language | Synonyms that must not be used for this concept |

## Challenging a term
Stop and settle a term when:
- the user or the code uses two words for one concept;
- one word is used for two concepts;
- a word is so generic it hides a decision (for example "handle", "process", "data").

Propose the preferred term with a recommended answer, as in any interview question, and add the rejected words to "Avoid".

## When to offer an ADR
Offer an ADR only when the decision passes all three tests:
1. **Hard to reverse:** undoing it later would be costly.
2. **Surprising:** a newcomer would not expect it without an explanation.
3. **A real trade-off:** there were reasonable alternatives with different costs.

A decision that fails any test belongs in the OpenSpec change's `design.md`, not in an ADR. ADRs go in `docs/adr/` with the next free `ADR-NNN` id and a row in `docs/adr/README.md` (ADR-006).
