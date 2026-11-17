# Report Contract: ack-validate-agents-md

## File handling
- Write the report next to the validated file.
- Name it `[original-name].validation.md` (`AGENTS.validation.md` for `AGENTS.md`).
- Overwrite an existing report for the same target.

## Required report sections
- Header: file, mode (root or nested), validator, date, how phase 3 ran (`openspec list --json` or reading `openspec/`)
- Overall Status + Compliance Score, with the sum of the phase scores
- Phase 1: Structure And Core Sections
- Phase 2: Operational Contract
- Phase 3: Spec-Driven Workflow (root mode; "not scored" in nested mode)
- Phase 4: Project Context
- Phase 5: Clarity And Conciseness
- Phase 6: Portability, Links And Alignment
- Summary (Strengths / Critical / Warnings / Enhancements)
- Recommendations (Immediate + Suggested + Migration Path)
- Example Fixes for recurring failures

Each phase section gives its score out of its weight, its status and its findings.

## Severity classification
- `Critical Issues (Must Fix)` block acceptance and make the status FAIL.
- `Warnings (Should Fix)` are non-blocking but tracked.
- `Enhancements (Optional)` are advisory.
