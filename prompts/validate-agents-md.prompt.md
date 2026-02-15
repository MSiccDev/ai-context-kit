---
description: 'Validate AGENTS.md files for completeness, actionability, portability, and operational clarity'
---

# Validate AGENTS.md File

## Mission

Validate an existing `AGENTS.md` file to ensure it is complete, actionable, portable, and aligned with repository structure and operating rules without duplicating full specifications.

## Scope & Preconditions

**Prerequisites:**
- User has an `AGENTS.md` file to validate
- Repository files referenced by `AGENTS.md` are accessible

**Target Output:**
- Comprehensive validation report with pass/fail status
- Specific issues with section references
- Actionable recommendations and example fixes
- Compliance score out of 100

## Validation Workflow

Execute validation in five phases:

### Phase 1: Core Presence & Structure Validation

**Check:**
1. `AGENTS.md` exists at the expected path (typically repository root unless explicitly validating a nested file)
2. Purpose and model are explicit:
   - what repository this applies to
   - instructions vs prompts distinction
3. Source-of-truth precedence is present (spec/templates/prompts/samples)
4. Repository map is present and aligned with real paths
5. File is scannable (clear headings, compact sections, no giant unstructured prose)

**Pass Criteria:**
- ✅ File is present and structurally readable
- ✅ Core orientation sections exist
- ✅ Content is repository-specific, not generic filler

**Common Issues:**
- Missing clear purpose
- Missing instructions-vs-prompts distinction
- Repository map missing or outdated

---

### Phase 2: Operational Contract Completeness Validation

**Check required operational elements:**
1. Session-state summary (Project, Role/Mode, Phase, Output Style, Tone, Interaction Mode)
2. Explicit no-silent-transitions rule
3. Ambiguity rule (ask before switching assumptions/state)
4. Command namespace policy (`/<tag>.*`) and command reference
5. Default state values (if defined by repo/project)
6. Formatting/path stability rules
7. Drift-control/update rule for spec changes
8. Scoping/precedence policy for nested `AGENTS.md` files

**Scoping guidance check:**
- If nested `AGENTS.md` files are in use, root policy must describe subtree scope and closest-wins precedence
- If nested files are not in use, policy may still be documented for future use

**Pass Criteria:**
- ✅ Operational contract is complete and directly usable
- ✅ Rules are explicit enough to guide behavior deterministically

**Common Issues:**
- Missing transition/ambiguity safeguards
- Missing command namespace details
- Missing nested-file precedence policy

---

### Phase 3: Clarity, Actionability & Conciseness Validation

**Check:**
1. Guidance is directive and testable (not vague principles only)
2. Statements can be acted on without guessing
3. Sections are concise; no overstuffed spec duplication
4. Redundant or conflicting instructions are absent
5. Commands and defaults are internally consistent

**Pass Criteria:**
- ✅ Practical, clear, and immediately actionable
- ✅ No excessive duplication of deeper specs
- ✅ Minimal ambiguity in operational behavior

**Common Issues:**
- Overly abstract text with no concrete behavior
- Overlong copied spec sections
- Conflicting alias/namespace rules

---

### Phase 4: Portability & Neutrality Validation

**Check:**
1. Provider-agnostic language (no single-vendor lock-in)
2. References are repository-relative and tool-neutral
3. No runtime-specific assumptions are mandatory unless clearly marked optional
4. Commands/policies remain understandable outside one IDE integration

**Pass Criteria:**
- ✅ Portable across assistant platforms
- ✅ No hard coupling to one provider/runtime

**Common Issues:**
- IDE-specific workflow presented as mandatory
- Platform-specific syntax without neutral alternative

---

### Phase 5: Link Integrity & Repository Alignment Validation

**Check:**
1. All relative links resolve
2. Referenced files/paths exist
3. Canonical paths in guidance match actual repository layout
4. Plan location policy is consistent (if plans are used)
5. No circular “read X to understand Y” loops without embedded essentials

**Pass Criteria:**
- ✅ Links valid and paths accurate
- ✅ Guidance matches repository reality

**Common Issues:**
- Broken relative links
- References to moved/legacy paths
- Canonical path mismatch

---

## Validation Report Format

### Step 1: Create/Overwrite Validation Summary File

Before generating the report:

1. **Determine location:** same directory as validated `AGENTS.md`
2. **Generate filename:** `[original-filename-without-extension].validation.md`
   - Example: `AGENTS.validation.md`
3. **Overwrite rule:** replace existing report for the same file
4. **Purpose:** keep a persistent, reviewable record for humans and LLM workflows

### Step 2: Generate Comprehensive Validation Report

Write this structure to the validation summary file:

```markdown
# AGENTS.md Validation Report

**File:** `{filename}`
**Validated:** {date}
**Repository:** {repo-name}

---

## Overall Status: ✅ PASS | ⚠️ PASS WITH WARNINGS | ❌ FAIL

**Compliance Score:** {score}/100

---

## Phase 1: Core Presence & Structure
**Status:** ✅ PASS | ⚠️ WARNING | ❌ FAIL

### Issues Found:
- Issue 1
- Issue 2

### Recommendations:
- Recommendation 1
- Recommendation 2

---

## Phase 2: Operational Contract Completeness
**Status:** ✅ PASS | ⚠️ WARNING | ❌ FAIL

### Required Elements:
- ✅ Session-state summary
- ✅ No-silent-transitions rule
- ❌ Ambiguity rule (missing)
- ✅ Command namespace policy
- ✅ Default state values
- ✅ Formatting/path stability rules
- ✅ Drift-control update rule
- ⚠️ Nested AGENTS precedence policy (partial)

### Notes:
- Details on missing/partial elements

---

## Phase 3: Clarity, Actionability & Conciseness
**Status:** ✅ PASS | ⚠️ WARNING | ❌ FAIL

### Findings:
- Concrete findings here

---

## Phase 4: Portability & Neutrality
**Status:** ✅ PASS | ⚠️ WARNING | ❌ FAIL

### Findings:
- Concrete findings here

---

## Phase 5: Link Integrity & Repository Alignment
**Status:** ✅ PASS | ⚠️ WARNING | ❌ FAIL

### Link Check:
- ✅ Link 1
- ❌ Link 2 (broken)

### Path Alignment:
- Notes on canonical path correctness

---

## Summary

### Strengths:
- What is done well

### Critical Issues (Must Fix):
- Blocking issues

### Warnings (Should Fix):
- Non-blocking issues

### Enhancements (Optional):
- Nice-to-have improvements

---

## Recommendations

### Immediate Actions:
1. Action 1
2. Action 2

### Suggested Improvements:
1. Improvement 1
2. Improvement 2

---

## Example Fixes

### Issue: Missing ambiguity rule
```markdown
## Ambiguity Rule
- If assumptions, state, or intent are ambiguous, ask clarifying questions before acting.
```

### Issue: Overstuffed AGENTS.md (spec copied inline)
```markdown
## Source Of Truth And Precedence
1. Specification: `specs/context_aware_ai_session_spec.md`
2. Templates: `templates/*.instructions.md`
3. Prompts: `prompts/*.prompt.md`
4. Samples: `projects/`, `usercontexts/`

See the specification for full details instead of duplicating it here.
```

### Issue: Missing nested AGENTS precedence policy
```markdown
## Scope And Precedence For AGENTS.md Files
- An `AGENTS.md` file applies to its directory and subdirectories.
- If multiple apply, the closest (deepest) one wins.
- If instructions still conflict or are unclear, ask before proceeding.
```

### Issue: Provider-coupled language
```markdown
# Replace
"This file is only for one assistant integration."

# With
"This file defines repository agent behavior using provider-agnostic guidance."
```

---

**Validation completed successfully.**
```

---

## Scoring System

**Core Presence & Structure (20 points):**
- Purpose + model clarity: 8 points
- Precedence and repo map: 12 points

**Operational Contract Completeness (35 points):**
- Session-state + transition rules: 10 points
- Ambiguity + command namespace policy: 10 points
- Default state + stability/drift rules: 10 points
- Nested scoping/precedence guidance: 5 points

**Clarity, Actionability & Conciseness (20 points):**
- Actionable guidance quality: 10 points
- Brevity / no overstuffing: 10 points

**Portability & Neutrality (15 points):**
- Provider-agnostic language: 8 points
- Tool/runtime neutrality: 7 points

**Link Integrity & Repo Alignment (10 points):**
- Link validity: 5 points
- Path/repo alignment: 5 points

**Total: 100 points**

**Grading:**
- 90-100: ✅ PASS (Excellent)
- 75-89: ⚠️ PASS WITH WARNINGS (Good)
- 60-74: ⚠️ PASS WITH WARNINGS (Needs Improvement)
- Below 60: ❌ FAIL (Major Issues)

---

## Best Practices For Validation

1. Read the full file before scoring any section
2. Prioritize deterministic behavior over stylistic preference
3. Flag missing operational safeguards as high severity
4. Keep recommendations concrete and minimal
5. Validate links against current repository state, not assumptions
6. Penalize spec duplication when it reduces scannability
7. Preserve provider-agnostic wording
8. Distinguish missing essentials from optional enhancements

---

© 2026 – AI Context Kit contributors
