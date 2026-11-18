# Third-Party Notices

AI Context Kit adapts ideas and passages from the projects below (ADR-014). Each adapted skill names its source in a `credits` metadata entry and once in its body. This file lists every adapted skill and the full license of each source.

## mattpocock/skills

- Source: https://github.com/mattpocock/skills
- License: MIT, Copyright (c) 2026 Matt Pocock

| Kit skill | Adapts |
| --- | --- |
| `ack-guide` | The ask-matt router and the phase-boundary tree (continue, clear, handoff, subagent, compact) |
| `ack-interview` | grilling: rounds over the decision frontier, a recommended answer per question, facts looked up rather than asked |
| `ack-interview-with-context` | grill-with-docs and domain-modeling: the interview combined with a glossary of terms and synonyms to avoid, and the three-part ADR test |
| `ack-tdd` | tdd: seams agreed before tests, red before green, one vertical slice per cycle, and the named anti-patterns |
| `ack-validate-agents-md` | writing-for-agents: the phase 5 writing checks (no-ops, sediment, one home per rule, pointers, positive instructions) |
| `ack-validate-skill` | writing-for-agents: the writing checks in `references/writing-for-agents.md` (description as pointer, a completion criterion per step, no-ops, sediment, positive instructions) |

```
MIT License

Copyright (c) 2026 Matt Pocock

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Keeping this file current

- Add a row whenever a skill gains a `credits` entry, and add the source's license when a new source appears.
- `ack-validate-skill` flags a skill that adapts external material without a `credits` entry.
