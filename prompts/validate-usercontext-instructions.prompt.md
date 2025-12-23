---
description: 'Validate user context instruction files for spec v1.2 compliance, completeness, and quality'
agent: 'agent'
---

# Validate User Context Instructions File

## Mission

Validate an existing user context instruction file (`.instructions.md`) to ensure it meets all requirements of the **Context-Aware AI Session Flow Specification v1.2**, is complete, properly formatted, and follows best practices.

## Scope & Preconditions

**Prerequisites:**
- User has an existing user context instruction file to validate
- File should be accessible for reading and analysis

**Target Output:**
- Comprehensive validation report with pass/fail status
- Specific issues identified with line numbers or section references
- Actionable recommendations for improvements
- Migration guidance if upgrading from older format

## Validation Workflow

Execute validation in five phases:

### Phase 1: YAML Frontmatter Validation

**Check:**
1. YAML frontmatter block exists and is properly formatted
2. Required attribute `applyTo` is present (must be `"**/*"`)
3. Required attribute `description` is present and descriptive
4. No unsupported attributes (e.g., `version`, `last_updated`, `persona_type`, `scope`, `name`)
5. Description format follows convention: `'Personal AI collaboration context for {Name/Role} - {Focus} ({Ecosystem})'`

**Pass Criteria:**
- ✅ Valid YAML syntax
- ✅ Only supported attributes present
- ✅ `applyTo: "**/*"` specified
- ✅ Description is clear and contextual

**Common Issues:**
- Using `version` or `last_updated` as separate fields (should be in description)
- Missing `applyTo` attribute
- Using `name` attribute (not supported for user context files)

---

### Phase 2: Required Sections Validation

**Check all 15 required sections are present:**

1. **User Context – {Name/Role}** (H1 heading)
2. **Professional Background** (H2) - Role, company, location, focus
3. **Technical Expertise** (H2) - Languages, frameworks, tools, architecture
4. **Current Projects** (H2) - Active projects with context
5. **Professional Goals** (H2) - Objectives and aspirations
6. **Working Style** (H2) - Workflow, process, problem-solving
7. **Format Preferences** (H2) - Documentation, code, diagrams
8. **Quality Standards** (H2) - Testing, code review, expectations
9. **Documentation Preferences** (H2) - Comments, README, API docs
10. **Communication Style** (H2) - Tone, explanation depth, terminology
11. **Context Handling** (H2) - Ambiguity resolution, prioritization
12. **Time & Schedule** (H2) - Working constraints, availability
13. **Resource Constraints** (H2) - Team, budget, technology limitations
14. **Technical Constraints** (H2) - Platform, performance, security requirements
15. **Exclusions & Prohibitions** (H2) - What to avoid

**Pass Criteria:**
- ✅ All 15 sections present with correct heading levels
- ✅ Sections appear in logical order
- ✅ Each section has substantive content (not just placeholders)

**Common Issues:**
- Missing newer sections (Context Handling, Exclusions & Prohibitions)
- Using wrong heading levels (H3 instead of H2)
- Empty placeholder sections like "[To be completed]"

---

### Phase 3: Content Completeness Validation

**Professional Background:**
- [ ] Professional role/title specified
- [ ] Company/organization mentioned (or placeholder used)
- [ ] Location or timezone indicated
- [ ] Primary technical focus defined
- [ ] Technology ecosystem specified
- [ ] Optional: Independent/side work documented
- [ ] Optional: Content creation activities noted

**Technical Expertise:**
- [ ] Programming languages listed (ideally 3-5)
- [ ] Frameworks and tools specified
- [ ] Architectural patterns mentioned
- [ ] Learning areas identified with skill levels
- [ ] Optional: Certifications with dates and scores
- [ ] Optional: Human language proficiency

**Current Projects:**
- [ ] At least 2 active projects documented
- [ ] Each project includes: name, description, tech stack, platforms, status
- [ ] Optional: Open source projects flagged
- [ ] Optional: Family use case considerations noted

**Professional Goals:**
- [ ] Goals categorized (Technical Mastery, Project Completion, Professional Development, etc.)
- [ ] Specific and measurable objectives
- [ ] Time-bound (e.g., "next 6-12 months")

**Working Style:**
- [ ] Workflow process described
- [ ] Problem-solving approach specified
- [ ] Optional: Commit preferences documented

**Communication Style:**
- [ ] Preferred tone specified
- [ ] Explanation depth preference indicated
- [ ] Terminology level defined
- [ ] Language preferences (technical vs. non-technical)

**Constraints:**
- [ ] Time constraints documented
- [ ] Resource limitations specified
- [ ] Technical constraints listed
- [ ] Exclusions clearly stated

**Pass Criteria:**
- ✅ All required subsections have meaningful content
- ✅ Optional sections included where applicable
- ✅ Content is specific, not generic

---

### Phase 4: Format & Quality Validation

**Markdown Formatting:**
- [ ] Proper heading hierarchy (H1 for title, H2 for sections, H3 for subsections)
- [ ] Consistent use of bold for emphasis
- [ ] Code blocks use language tags where appropriate
- [ ] Lists are properly formatted (bullet or numbered)
- [ ] Horizontal rules (`---`) separate major sections
- [ ] No excessive blank lines or formatting inconsistencies

**Privacy & Placeholders:**
- [ ] Placeholders are consistent (e.g., always `[Your Name]` not mixed with `{Your Name}`)
- [ ] Sensitive information protected or anonymized
- [ ] Optional: Privacy notice included if using placeholders

**JSON Metadata (if present):**
- [ ] Valid JSON syntax
- [ ] Includes key sections: user_context, technical, projects, preferences, communication, goals, constraints, exclusions
- [ ] Data matches markdown content
- [ ] No syntax errors or missing commas

**Pass Criteria:**
- ✅ Clean, professional formatting
- ✅ Consistent markdown conventions
- ✅ Valid JSON if metadata block present
- ✅ Privacy considerations addressed

---

### Phase 5: Spec v1.2 Compliance Validation

**Instruction-Based Architecture:**
- [ ] File clearly defines WHO the user is (identity, background)
- [ ] File defines WHAT they work on (projects, focus areas)
- [ ] File defines HOW AI should behave (communication, preferences)
- [ ] Persistent context suitable for long-term AI collaboration
- [ ] Not just a one-time prompt but reusable instruction set

**Portability:**
- [ ] No provider-specific syntax or limitations
- [ ] Works across Claude, GPT, Gemini, Mistral, LM Studio, Ollama
- [ ] Self-contained (doesn't rely on external files to be meaningful)

**Completeness for Context-Aware Collaboration:**
- [ ] Enough detail for AI to understand user's expertise level
- [ ] Clear constraints to prevent unwanted suggestions
- [ ] Explicit communication preferences to avoid misalignment
- [ ] Project context to enable focused assistance

**Pass Criteria:**
- ✅ Follows instruction-based paradigm (not just prompts/queries)
- ✅ Provider-agnostic and portable
- ✅ Comprehensive enough for effective AI collaboration

---

## Validation Report Format

### Step 1: Create/Overwrite Validation Summary File

Before generating the report:

1. **Determine file location**: Same directory as the validated user context file
2. **Generate filename**: `[original-filename-without-extension].validation.md`
   - Example: For `name_surname_usercontext.instructions.md`, create `name_surname_usercontext.validation.md`
3. **Overwrite rule**: If a `.validation.md` file for this user context already exists, delete it first
4. **Purpose**: Provides a persistent, chunk-friendly record that both humans and LLMs can easily reference

### Step 2: Generate Comprehensive Validation Report

Write the following structured validation report to the validation summary file:

```markdown
# User Context Instruction Validation Report

**File:** `{filename}`
**Validated:** {date}
**Spec Version:** v1.2

---

## Overall Status: ✅ PASS | ⚠️ PASS WITH WARNINGS | ❌ FAIL

**Compliance Score:** {score}/100

---

## Phase 1: YAML Frontmatter
**Status:** ✅ PASS | ❌ FAIL

### Issues Found:
- Issue 1 description
- Issue 2 description

### Recommendations:
- Recommendation 1
- Recommendation 2

---

## Phase 2: Required Sections
**Status:** ✅ PASS | ❌ FAIL

### Missing Sections:
- Section name (expected at H2 level)

### Present Sections:
- ✅ Section 1
- ✅ Section 2
- ❌ Section 3 (missing)

---

## Phase 3: Content Completeness
**Status:** ✅ PASS | ⚠️ WARNING | ❌ FAIL

### Professional Background: ✅ Complete | ⚠️ Incomplete | ❌ Missing
- Detail on what's present or missing

### Technical Expertise: ✅ Complete | ⚠️ Incomplete | ❌ Missing
- Detail on what's present or missing

### Current Projects: ✅ Complete | ⚠️ Incomplete | ❌ Missing
- Detail on what's present or missing

### Professional Goals: ✅ Complete | ⚠️ Incomplete | ❌ Missing
- Detail on what's present or missing

### Working Style: ✅ Complete | ⚠️ Incomplete | ❌ Missing
- Detail on what's present or missing

### Communication Style: ✅ Complete | ⚠️ Incomplete | ❌ Missing
- Detail on what's present or missing

### Constraints: ✅ Complete | ⚠️ Incomplete | ❌ Missing
- Detail on what's present or missing

---

## Phase 4: Format & Quality
**Status:** ✅ PASS | ⚠️ WARNING | ❌ FAIL

### Markdown Formatting:
- List issues found

### Privacy & Placeholders:
- Assessment of privacy handling

### JSON Metadata:
- Validation results if present

---

## Phase 5: Spec v1.2 Compliance
**Status:** ✅ PASS | ⚠️ WARNING | ❌ FAIL

### Instruction-Based Architecture:
- Assessment

### Portability:
- Assessment

### Completeness:
- Assessment

---

## Summary

### Strengths:
- List what's done well

### Critical Issues (Must Fix):
- List blocking issues

### Warnings (Should Fix):
- List non-blocking issues

### Enhancements (Optional):
- List nice-to-have improvements

---

## Recommendations

### Immediate Actions:
1. Fix critical issue 1
2. Fix critical issue 2

### Suggested Improvements:
1. Enhancement 1
2. Enhancement 2

### Migration Path (if upgrading from v1):
1. Step 1
2. Step 2

---

## Example Fixes

### Issue: Missing `applyTo` attribute
```yaml
# Current (incorrect):
---
description: 'Personal context for John Doe'
---

# Fixed:
---
description: 'Personal AI collaboration context for John Doe - Software Engineer (Web/JavaScript)'
applyTo: "**/*"
---
```

### Issue: Missing "Context Handling" section
```markdown
## Context Handling

### Ambiguity Resolution
When requests are unclear, ask clarifying questions immediately rather than making assumptions.

### Context Prioritization
Always prioritize:
1. Current project focus
2. Quality standards (TDD, test coverage)
3. Learning goals (new frameworks or patterns)

### Session Continuity
Build on prior context without requiring re-explanation of background or preferences.
```

---

**Validation completed successfully.**
```

---

## Scoring System

**YAML Frontmatter (10 points):**
- Valid YAML syntax: 3 points
- Required attributes present: 4 points
- No unsupported attributes: 3 points

**Required Sections (30 points):**
- All 15 sections present: 20 points
- Correct heading levels: 5 points
- Logical order: 5 points

**Content Completeness (30 points):**
- Professional Background complete: 5 points
- Technical Expertise complete: 5 points
- Current Projects complete: 5 points
- Professional Goals complete: 3 points
- Working Style complete: 3 points
- Communication Style complete: 3 points
- Constraints complete: 6 points

**Format & Quality (15 points):**
- Markdown formatting: 5 points
- Privacy handling: 5 points
- JSON metadata (if present): 5 points

**Spec v1.2 Compliance (15 points):**
- Instruction-based architecture: 5 points
- Portability: 5 points
- Completeness for collaboration: 5 points

**Total: 100 points**

**Grading:**
- 90-100: ✅ PASS (Excellent)
- 75-89: ⚠️ PASS WITH WARNINGS (Good)
- 60-74: ⚠️ PASS WITH WARNINGS (Needs Improvement)
- Below 60: ❌ FAIL (Major Issues)

---

## Best Practices for Validation

1. **Read the entire file first** - Get full context before flagging issues
2. **Be specific** - Provide line numbers or section names for issues
3. **Prioritize issues** - Critical (blocking) vs. warnings (nice-to-have)
4. **Provide examples** - Show correct implementation for each issue
5. **Consider privacy** - Don't expose sensitive information in validation report
6. **Be constructive** - Frame feedback as improvements, not criticism
7. **Check for consistency** - Ensure placeholders, terminology, and style are uniform
8. **Validate JSON carefully** - One syntax error breaks the entire metadata block
9. **Respect user's choices** - Some optional fields are genuinely optional
10. **Suggest migration paths** - If upgrading from v1, provide clear steps

---

© 2025 – MSiccDev Software Development – User Context Instructions Validator
