---
description: "Generate spec-aligned SKILL.md files for reusable, provider-neutral agent skills."
---

# Generate Skill File

## Mission

Generate a complete `SKILL.md` file for a single skill folder, aligned with repository conventions and Agent Skills guidance.

## Scope & Preconditions

**Prerequisites:**
- The user wants to create a new skill.
- The output must be provider-neutral.
- The skill should be reusable and concise.

**Target Output:**
- One complete `SKILL.md` file.
- Parent folder name and `name` frontmatter are aligned.
- Optional resource references are relative to the skill folder.

## Inputs

Gather or confirm:
- Skill name (slug).
- Skill purpose and when to use it.
- Required inputs and expected outputs.
- Safety constraints.
- Optional compatibility constraints.
- Optional metadata.
- Whether `allowed-tools` should be included (default: no).

## Workflow

Execute in six phases.

### Phase 1: Identify skill intent
Determine:
1. What capability this skill provides.
2. Which tasks it should handle.
3. Which tasks are explicitly out of scope.

### Phase 2: Lock naming and location
Determine:
1. Skill directory slug.
2. Frontmatter `name` value.
3. Target file path: `skills/<name>/SKILL.md`.

### Phase 3: Define operational behavior
Determine:
1. Required inputs.
2. Ordered workflow steps.
3. Output expectations and acceptance checks.
4. Failure/edge-case handling.

### Phase 4: Define resource strategy
Determine:
1. What stays in `SKILL.md` (high-signal instructions only).
2. What is deferred to `references/`, `scripts/`, `assets/`.
3. Which relative paths should be included.

### Phase 5: Define safety and policy
Determine:
1. Risky operations that require confirmation.
2. Any compatibility requirements.
3. Whether `allowed-tools` is needed (default disabled).

### Phase 6: Assemble final file
Produce one complete `SKILL.md` with:
- Valid frontmatter.
- Clear usage conditions.
- Explicit constraints.
- Concise body with actionable steps.

## Generation Rules

### Frontmatter
Required:
- `name`
- `description`

Optional:
- `license`
- `compatibility`
- `metadata`
- `allowed-tools` (optional/experimental; default disabled)

### Field constraints
- `name`:
- 1-64 chars.
- Lowercase alphanumeric + hyphen only.
- No leading/trailing hyphen.
- No consecutive hyphens.
- Must match parent directory name.
- `description`:
- 1-1024 chars.
- Must state what the skill does and when to use it.
- `compatibility`:
- Optional, 1-500 chars.
- `metadata`:
- Optional map of string keys to string values.

### Body requirements
Include these sections:
1. Purpose
2. When To Use
3. Required Inputs
4. Workflow
5. Output Expectations
6. Resources
7. Constraints And Safety

### Content quality
- Keep instructions concise and directly actionable.
- Avoid provider-specific assumptions.
- Prefer explicit, testable statements.
- Use relative paths for skill-local resources.
- Defer long references to `references/`.

## Output Format

Return one Markdown code block containing the complete `SKILL.md`.

````markdown
```markdown
<!-- Full SKILL.md content -->
```

**Filename:** `skills/{name}/SKILL.md`
````

Then provide a short summary:
- Skill name
- Main use-case
- Optional fields used
- Any assumptions made

## Validation Checklist

Before returning:
- [ ] `name` and directory slug match.
- [ ] Required frontmatter fields exist.
- [ ] Optional fields, if used, follow constraints.
- [ ] Body includes all required sections.
- [ ] Resource paths are relative.
- [ ] Safety notes are present for risky actions.
- [ ] Language is provider-neutral.

## Example Reference

If an example is requested, reference:
- `templates/skill_template/SKILL.md`
