---
name: "validate-usercontext-instructions"
description: "Validate user-context instruction files against schema, section completeness, quality checks, and scoring criteria."
metadata:
  source_prompt: "prompts/validate-usercontext-instructions.prompt.md"
  workflow_type: "validation"
---

# Validate User Context Instructions

## Purpose
Validate user-context instruction files and produce deterministic reports with issues, recommendations, and a compliance score.

## When To Use
- Use this skill to validate `*_usercontext.instructions.md` files.
- Use this skill before publishing or reusing a user-context file.
- Do not use this skill for project instructions or AGENTS files.

## Required Inputs
- Target file path.
- Expected spec version and required sections.
- Validation strictness expectations (if any).

## Workflow
1. Validate YAML frontmatter and supported attributes.
2. Verify all required user-context sections and heading structure.
3. Evaluate content completeness, formatting quality, and constraints.
4. Evaluate portability and instruction-based architecture compliance.
5. Generate structured report with phase status and score.

## Output Expectations
- A markdown validation report with phase-by-phase findings.
- Overall PASS/WARN/FAIL state and numeric score.
- Actionable fixes for critical and warning issues.
- Migration guidance when relevant.

## Resources
- Primary source: `../../prompts/validate-usercontext-instructions.prompt.md`
- Example target: `../../usercontexts/sample_usercontext.instructions.md`
- Example report: `../../usercontexts/sample_usercontext.validation.md`

## Constraints And Safety
- Preserve privacy boundaries in findings and examples.
- Keep recommendations implementation-ready and non-ambiguous.
- Use provider-neutral language.
- Do not modify validated source files automatically.
