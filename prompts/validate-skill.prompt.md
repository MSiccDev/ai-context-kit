---
description: "Validate SKILL.md files for schema compliance, quality, neutrality, and operational safety."
---

# Validate Skill File

## Mission

Validate an existing `SKILL.md` file to ensure it is structurally valid, actionable, provider-neutral, and aligned with repository skill conventions.

## Scope & Preconditions

**Prerequisites:**
- A target skill folder exists (expected: `skills/<skill-name>/`).
- A `SKILL.md` file is available for validation.

**Target Output:**
- Comprehensive validation report with phase statuses.
- Compliance score out of 100.
- Actionable issue list with clear fixes.

## Validation Workflow

Execute validation in five phases.

### Phase 1: Presence, Structure, And Frontmatter

**Check:**
1. `SKILL.md` exists in the target folder.
2. YAML frontmatter exists and is valid.
3. Required fields exist:
   - `name`
   - `description`
4. Optional fields, if present, are recognized:
   - `license`
   - `compatibility`
   - `metadata`
   - `allowed-tools` (optional/experimental)

**Pass Criteria:**
- `SKILL.md` exists.
- Valid YAML frontmatter.
- Required fields present and non-empty.

---

### Phase 2: Field Constraints And Naming Parity

**Check:**
1. `name` constraints:
   - 1-64 characters.
   - Lowercase alphanumeric + hyphen only.
   - No leading/trailing hyphen.
   - No consecutive hyphens.
2. `name` equals parent directory name.
3. `description` constraints:
   - 1-1024 characters.
   - Clearly states what the skill does and when to use it.
4. `compatibility` constraints (if present):
   - 1-500 characters.
5. `metadata` constraints (if present):
   - Map of string keys to string values.
6. `allowed-tools` handling:
   - Treated as optional/experimental.
   - Not assumed active by default.

**Pass Criteria:**
- Naming and schema constraints are satisfied.
- No unsupported type/shape violations.

---

### Phase 3: Instruction Quality And Completeness

**Check:**
1. Skill body contains clear operational guidance.
2. Includes practical sections (or equivalent):
   - Purpose
   - When To Use
   - Required Inputs
   - Workflow
   - Output Expectations
   - Resources
   - Constraints And Safety
3. Steps are actionable and testable.
4. Scope boundaries are explicit (in-scope vs out-of-scope behavior).
5. Progressive disclosure is respected:
   - `SKILL.md` stays concise.
   - Heavy details are deferred to `references/` when needed.

**Pass Criteria:**
- Skill is directly usable without major ambiguity.
- Content is concise and execution-oriented.

---

### Phase 4: Resource References And Safety

**Check:**
1. Referenced paths are relative and resolve from skill root.
2. No deep or circular reference chains.
3. Script/resource usage is explicit and minimal.
4. Risky operations are called out with confirmation requirements.
5. Safety posture is clear when automation/scripts are referenced.

**Pass Criteria:**
- References are valid and maintainable.
- Safety guidance is present for risky actions.

---

### Phase 5: Neutrality And Portability

**Check:**
1. No provider-specific lock-in wording.
2. Guidance is portable across hosted and local assistant environments.
3. No mandatory runtime-specific assumptions unless clearly documented as optional compatibility.
4. Terminology is stable and implementation-neutral.

**Pass Criteria:**
- Skill remains provider-neutral and portable.

## Validation Report Format

### Step 1: Create/Overwrite Validation Summary File

Before generating the report:
1. Use the same directory as the validated `SKILL.md`.
2. Create filename: `SKILL.validation.md`.
3. Overwrite any existing report for the same skill.

### Step 2: Generate Report

Write this structure:

```markdown
# Skill Validation Report

**File:** `{path-to-SKILL.md}`
**Skill:** `{skill-name}`
**Validated:** {date}

---

## Overall Status: ✅ PASS | ⚠️ PASS WITH WARNINGS | ❌ FAIL

**Compliance Score:** {score}/100

---

## Phase 1: Presence, Structure, And Frontmatter
**Status:** ✅ PASS | ⚠️ WARNING | ❌ FAIL

### Findings:
- Itemized findings

### Recommendations:
- Actionable recommendations

---

## Phase 2: Field Constraints And Naming Parity
**Status:** ✅ PASS | ⚠️ WARNING | ❌ FAIL

### Findings:
- Itemized findings

---

## Phase 3: Instruction Quality And Completeness
**Status:** ✅ PASS | ⚠️ WARNING | ❌ FAIL

### Findings:
- Itemized findings

---

## Phase 4: Resource References And Safety
**Status:** ✅ PASS | ⚠️ WARNING | ❌ FAIL

### Findings:
- Itemized findings

---

## Phase 5: Neutrality And Portability
**Status:** ✅ PASS | ⚠️ WARNING | ❌ FAIL

### Findings:
- Itemized findings

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

### Issue: Name does not match directory
```yaml
# Directory: skills/git-review
# Current (incorrect):
name: "review-helper"

# Fixed:
name: "git-review"
```

### Issue: Missing required field
```yaml
# Current (incorrect):
name: "git-review"

# Fixed:
name: "git-review"
description: "Review repository changes and report risks before merge."
```

### Issue: Provider-specific lock-in wording
```markdown
# Replace
"Use this skill only in one specific assistant runtime."

# With
"Use this skill in any compatible assistant environment."
```

---

**Validation completed successfully.**
```

## Scoring System

**Phase 1: Presence, Structure, And Frontmatter (20 points)**
- File presence and YAML validity: 10
- Required field presence: 10

**Phase 2: Field Constraints And Naming Parity (25 points)**
- Name constraints and folder parity: 15
- Optional field constraints/types: 10

**Phase 3: Instruction Quality And Completeness (25 points)**
- Required operational coverage: 15
- Actionability and clarity: 10

**Phase 4: Resource References And Safety (15 points)**
- Reference hygiene: 8
- Safety guardrails: 7

**Phase 5: Neutrality And Portability (15 points)**
- Provider neutrality: 8
- Runtime portability: 7

**Total: 100 points**

**Grading:**
- 90-100: ✅ PASS
- 75-89: ⚠️ PASS WITH WARNINGS
- 60-74: ⚠️ PASS WITH WARNINGS (Needs Improvement)
- Below 60: ❌ FAIL

## Best Practices

1. Validate structure before style.
2. Treat missing required fields as high severity.
3. Report findings with concrete fixes.
4. Keep recommendations concise and implementation-ready.
5. Validate neutrality and safety as first-class checks.
