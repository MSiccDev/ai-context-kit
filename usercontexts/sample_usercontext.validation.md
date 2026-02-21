# User Context Instruction Validation Report

**File:** `usercontexts/sample_usercontext.instructions.md`
**Validated:** 2026-02-20
**Spec Version:** v1.3.1
**Validator:** `skills/validate-usercontext-instructions`

---

## Overall Status + Compliance Score
- **Status:** PASS
- **Compliance Score:** 98/100

---

## Phase 1: YAML Frontmatter
**Status:** PASS

### Findings
- Valid YAML frontmatter detected.
- Required attributes `description` and `applyTo` are present.
- No unsupported frontmatter attributes detected.

### Recommendations
- None.

---

## Phase 2: Required Sections
**Status:** PASS

### Findings
- All required sections are present and ordered consistently.
- Heading levels are coherent and readable.
- Sections are substantive and not placeholder-only.

### Recommendations
- None.

---

## Phase 3: Content Completeness
**Status:** PASS

### Findings
- Professional background includes role, organization, location/timezone, focus, and ecosystem.
- Technical expertise includes languages, frameworks, tooling, architecture, and learning status.
- Current projects include descriptions, stack/platform details, and status.
- Professional goals and current focus are documented.
- Working style, communication style, and constraints are complete and actionable.

### Recommendations
- None.

---

## Phase 4: Format & Quality
**Status:** PASS

### Findings
- Markdown structure is consistent and scannable.
- Privacy boundaries are appropriate for a public sample artifact.
- JSON metadata block is present and structurally valid.

### Recommendations
- None.

---

## Phase 5: Spec Compliance
**Status:** PASS

### Findings
- Instruction-based architecture is explicit (WHO/WHAT/HOW).
- Provider-neutral and portable wording is preserved.
- Content is complete for context-aware collaboration use.
- Spec-version references are aligned to v1.3.1.

### Recommendations
- None.

---

## Summary (Strengths/Critical/Warnings/Enhancements)

### Strengths
- Complete section coverage with clear operational guidance.
- Strong technical profile and constraints coverage in both markdown and JSON metadata.
- Stable formatting and high portability across tools.

### Critical Issues (Must Fix)
- None.

### Warnings (Should Fix)
- None.

### Enhancements (Optional)
- Consider adding one more project sample for broader scenario coverage.

---

## Recommendations (Immediate + Suggested + Migration Path when relevant)

### Immediate
1. No blocking changes required.

### Suggested
1. Re-run validation whenever the canonical usercontext template or spec version changes.

### Migration Path (when relevant)
1. Not applicable; artifact is aligned with spec v1.3.1.
