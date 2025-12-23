---
description: 'Validate project instruction files for spec v1.2 compliance, completeness, and quality'
agent: 'agent'
---

# Validate Project Instructions File

## Mission

Validate an existing project instruction file (`.instructions.md`) to ensure it meets all requirements of the **Context-Aware AI Session Flow Specification v1.2**, is complete, properly formatted, and follows best practices.

## Scope & Preconditions

**Prerequisites:**
- User has an existing project instruction file to validate
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
2. Required attribute `name` is present (lowercase, hyphens/underscores/periods only)
3. Required attribute `description` is present and descriptive
4. Required attribute `applyTo` is present (must be `"**/*"`)
5. No unsupported attributes
6. Description format follows convention: `'Project-specific instructions for {Project Name} (v{version}, spec v1.2, updated {date})'`

**Pass Criteria:**
- ✅ Valid YAML syntax
- ✅ All required attributes present
- ✅ `name` uses valid characters only
- ✅ `applyTo: "**/*"` specified
- ✅ Description is clear and includes version/date

**Common Issues:**
- `name` using uppercase letters or spaces
- Missing `applyTo` attribute
- Using unsupported attributes from older specs

---

### Phase 2: Required Sections Validation

**Check all 17 required sections are present:**

1. **Project Context – {Project Name}** (H1 heading)
2. **Session Prerequisites** (H2) - Context hierarchy and spec reference
3. **Overview** (H2) - Project description and current status
4. **Default Session State** (H2) - Table with all session elements
5. **State Management & Control** (H2) - Context visibility, transitions, commands, namespace
6. **Role Definitions** (H2) - Table with roles, use cases, behaviors, outputs
7. **Tech Stack** (H2) - Languages, frameworks, architecture, repo structure
8. **Current Objectives** (H2) - Phase-aligned goals
9. **Development Principles** (H2) - Core practices and standards
10. **Repository Context** (H2) - Branch info, paths, configuration
11. **Working Together** (H2) - Task patterns for each role with examples
12. **Key Components** (H2) - Major modules/services with details
13. **Testing Strategy** (H2) - Approach, organization, coverage
14. **Documentation Standards** (H2) - Types and formats
15. **Testing Commands** (H2) - Practical command examples
16. **Related Files** (H2) - Cross-references
17. **Future Roadmap** (H2) - Planned features and maintenance

**Pass Criteria:**
- ✅ All 17 sections present with correct heading levels
- ✅ Sections appear in correct order
- ✅ Each section has substantive content (not just placeholders)

**Common Issues:**
- Missing newer sections (State Management & Control, Future Roadmap)
- Wrong heading levels (H3 instead of H2)
- Sections out of order
- Empty placeholder sections

---

### Phase 3: Session State Model Validation

**Default Session State Table:**
Must include all 6 elements:
1. **Project** - Project name or identifier
2. **Role** - Default role when starting work
3. **Phase** - Current work phase (Planning, Active Development, Maintenance, etc.)
4. **Output Style** - Default formatting preference (Structured, Minimal, Detailed, Annotated)
5. **Tone** - Communication style (Professional & Technical, Direct, Detailed, Friendly)
6. **Interaction Mode** - Collaboration approach (Advisory, Pair Programming, Driver)

**Pass Criteria:**
- ✅ Table format with all 6 elements
- ✅ Each element has a defined default value
- ✅ Values are appropriate for the project

**Command Reference Table:**
Must include standard commands:
- `/tag.context` - Display current session state
- `/tag.mode [role]` - Switch assistant role
- `/tag.phase [name]` - Update work phase
- `/tag.style [type]` - Change output verbosity
- `/tag.tone [style]` - Adjust communication tone
- `/tag.interact [mode]` - Set collaboration style
- `/tag.reset` - Clear session state

**Pass Criteria:**
- ✅ All 7 standard commands present (namespaced)
- ✅ Table format with columns: Command, Parameters, Description, Example
- ✅ Examples provided for each command

**Common Issues:**
- Missing session elements (often Interaction Mode)
- Command table incomplete or missing
- Default values too generic ("TBD", "None")
- Command namespace missing in multi-instruction environments

---

### Phase 4: Role Definitions Validation

**Role Definitions Table:**
Must include:
- At least 3 roles defined
- Each role has: Role Name, When to Use, Assistant Behavior, Typical Outputs
- Roles appropriate for the project's tech stack and objectives

**Example Task Patterns:**
For each defined role:
- 3-5 example natural language requests
- Examples specific to the project (not generic)
- Use italics for example requests

**Role Transition Examples:**
- Shows both natural language ("Switch to Developer Mode") and command (`/tag.mode developer`)
- Explains when/why to switch roles

**Pass Criteria:**
- ✅ At least 3 roles defined with complete details
- ✅ Role definitions table properly formatted
- ✅ Example task patterns provided for each role
- ✅ Role transitions explained

**Common Issues:**
- Generic roles without project-specific context
- Missing example task patterns
- No explanation of when to use each role
- Roles don't match project tech stack

---

### Phase 5: Content Completeness & Quality Validation

**Session Prerequisites:**
- [ ] Mentions spec v1.2
- [ ] Explains context hierarchy (persona + project)
- [ ] References specification location

**Overview:**
- [ ] Project description (what it does, who it's for)
- [ ] Current status (phase, version)
- [ ] Primary objectives listed

**Tech Stack:**
- [ ] Programming languages specified
- [ ] Frameworks and libraries listed
- [ ] Architecture pattern documented
- [ ] Repository structure explained
- [ ] Testing frameworks mentioned

**Current Objectives:**
- [ ] 3-5 specific goals listed
- [ ] Aligned with current phase
- [ ] Measurable and achievable

**Development Principles:**
- [ ] Core practices documented (e.g., TDD, Clean Architecture)
- [ ] Coding standards specified
- [ ] Quality standards defined
- [ ] Anti-patterns to avoid listed

**Repository Context:**
- [ ] Default branch specified
- [ ] Key directories and paths listed
- [ ] Configuration files mentioned

**Working Together:**
- [ ] Task patterns for each role
- [ ] Examples use italics
- [ ] Examples are project-specific

**Key Components:**
- [ ] Major modules/services described
- [ ] Component interactions explained
- [ ] At least 2-3 components documented

**Testing Strategy:**
- [ ] Testing approach defined (unit, integration, e2e)
- [ ] Test organization explained
- [ ] Coverage targets specified

**Documentation Standards:**
- [ ] Documentation types listed (README, API docs, inline comments)
- [ ] Format preferences specified

**Testing Commands:**
- [ ] Build command provided
- [ ] Test command provided
- [ ] Run command provided
- [ ] Commands are executable (no placeholders)

**Related Files:**
- [ ] Links to spec, README, architecture docs
- [ ] Links use correct paths

**Future Roadmap:**
- [ ] Planned features documented
- [ ] Maintenance priorities listed
- [ ] Technical debt tracked

**Pass Criteria:**
- ✅ All required subsections complete
- ✅ Content is specific to the project, not generic
- ✅ Commands are practical and executable
- ✅ Links and references are valid

---

## Validation Report Format

### Step 1: Create/Overwrite Validation Summary File

Before generating the report:

1. **Determine file location**: Same directory as the validated project file
2. **Generate filename**: `[original-filename-without-extension].validation.md`
   - Example: For `nextjs_app_project.instructions.md`, create `nextjs_app_project.validation.md`
3. **Overwrite rule**: If a `.validation.md` file for this project already exists, delete it first
4. **Purpose**: Provides a persistent, chunk-friendly record that both humans and LLMs can easily reference

### Step 2: Generate Comprehensive Validation Report

Write the following structured validation report to the validation summary file:

```markdown
# Project Instruction Validation Report

**File:** `{filename}`
**Project:** {project-name}
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

## Phase 3: Session State Model
**Status:** ✅ PASS | ⚠️ WARNING | ❌ FAIL

### Default Session State Table:
- ✅ Project: {value}
- ✅ Role: {value}
- ✅ Phase: {value}
- ✅ Output Style: {value}
- ✅ Tone: {value}
- ❌ Interaction Mode: Missing

### Command Reference Table:
- List missing commands or issues

---

## Phase 4: Role Definitions
**Status:** ✅ PASS | ⚠️ WARNING | ❌ FAIL

### Roles Defined: {count}
- Role 1 name: ✅ Complete | ⚠️ Incomplete
- Role 2 name: ✅ Complete | ⚠️ Incomplete

### Example Task Patterns:
- Role 1: {count} examples provided
- Role 2: {count} examples provided

### Issues:
- List any issues with roles

---

## Phase 5: Content Completeness & Quality
**Status:** ✅ PASS | ⚠️ WARNING | ❌ FAIL

### Session Prerequisites: ✅ Complete | ⚠️ Incomplete | ❌ Missing
### Overview: ✅ Complete | ⚠️ Incomplete | ❌ Missing
### Tech Stack: ✅ Complete | ⚠️ Incomplete | ❌ Missing
### Current Objectives: ✅ Complete | ⚠️ Incomplete | ❌ Missing
### Development Principles: ✅ Complete | ⚠️ Incomplete | ❌ Missing
### Repository Context: ✅ Complete | ⚠️ Incomplete | ❌ Missing
### Working Together: ✅ Complete | ⚠️ Incomplete | ❌ Missing
### Key Components: ✅ Complete | ⚠️ Incomplete | ❌ Missing
### Testing Strategy: ✅ Complete | ⚠️ Incomplete | ❌ Missing
### Documentation Standards: ✅ Complete | ⚠️ Incomplete | ❌ Missing
### Testing Commands: ✅ Complete | ⚠️ Incomplete | ❌ Missing
### Related Files: ✅ Complete | ⚠️ Incomplete | ❌ Missing
### Future Roadmap: ✅ Complete | ⚠️ Incomplete | ❌ Missing

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

### Migration Path (if upgrading from older spec):
1. Step 1
2. Step 2

---

## Example Fixes

### Issue: Missing Interaction Mode in Session State
```markdown
| Element | Default Value | How to Change |
|---------|--------------|---------------|
| Project | MyProject | Cannot change (fixed per file) |
| Role | Developer | "Switch to Architect Mode" or `/tag.mode architect` |
| Phase | Active Development | `/tag.phase testing` when starting QA |
| Output Style | Structured Technical | `/tag.style minimal` for code-only responses |
| Tone | Professional & Technical | `/tag.tone concise` for brief answers |
| Interaction Mode | Pair Programming | `/tag.interact driver` for autonomous execution |
```

### Issue: Generic role without project context
```markdown
# Current (too generic):
| Role | When to Use | Assistant Behavior | Typical Outputs |
|------|-------------|-------------------|-----------------|
| **Developer** | Writing code | Implements features | Code |

# Fixed (project-specific):
| Role | When to Use | Assistant Behavior | Typical Outputs |
|------|-------------|-------------------|-----------------|
| **Swift Developer** | Implementing iOS features, refactoring SwiftUI views, writing unit tests | Follows MVVM pattern, writes tests first (TDD), uses SwiftData for persistence, adheres to Swift style guide | Swift code with XCTest tests, SwiftUI views, data models, inline documentation |
```

---

**Validation completed successfully.**
```

---

## Scoring System

**YAML Frontmatter (10 points):**
- Valid YAML syntax: 2 points
- Required attributes present: 6 points
- `name` uses valid characters: 2 points

**Required Sections (25 points):**
- All 17 sections present: 15 points
- Correct heading levels: 5 points
- Correct order: 5 points

**Session State Model (20 points):**
- Default Session State table complete (6 elements): 10 points
- Command Reference table complete (7 commands): 10 points

**Role Definitions (15 points):**
- At least 3 roles defined: 8 points
- Role definitions table complete: 4 points
- Example task patterns provided: 3 points

**Content Completeness & Quality (30 points):**
- Session Prerequisites: 2 points
- Overview: 2 points
- Tech Stack: 3 points
- Current Objectives: 2 points
- Development Principles: 3 points
- Repository Context: 2 points
- Working Together: 3 points
- Key Components: 3 points
- Testing Strategy: 2 points
- Documentation Standards: 2 points
- Testing Commands: 3 points
- Related Files: 1 point
- Future Roadmap: 2 points

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
5. **Check role alignment** - Roles should match project tech stack and objectives
6. **Validate commands** - Ensure testing commands are executable, not placeholders
7. **Check consistency** - Session state elements should align with project reality
8. **Be constructive** - Frame feedback as improvements, not criticism
9. **Consider context** - Some projects may have valid reasons for variations
10. **Suggest migration paths** - If upgrading from older spec, provide clear steps

---

## Common Validation Scenarios

### Scenario 1: Missing Session State Element
**Issue:** Default Session State table missing "Interaction Mode"
**Impact:** AI won't know default collaboration style (Advisory, Pair, Driver)
**Fix:** Add row to table with appropriate default for the project

### Scenario 2: Generic Role Definitions
**Issue:** Roles are too generic ("Developer", "Tester") without project context
**Impact:** AI can't provide project-specific assistance
**Fix:** Make roles specific to tech stack ("Swift Developer", "React Developer")

### Scenario 3: Placeholder Commands
**Issue:** Testing commands contain placeholders like `[run your tests here]`
**Impact:** AI can't provide actual executable commands
**Fix:** Replace with real commands: `dotnet test`, `swift test`, `npm test`

### Scenario 4: Missing Command Reference
**Issue:** No command table for session state control
**Impact:** Users don't know how to switch roles or phases
**Fix:** Add complete command table with all 7 standard commands

### Scenario 5: Incomplete Tech Stack
**Issue:** Tech stack section lists languages but no frameworks or architecture
**Impact:** AI lacks context for technical decisions
**Fix:** Add frameworks, architecture pattern, testing approach, repo structure

---

© 2025 – MSiccDev Software Development – Project Instructions Validator
