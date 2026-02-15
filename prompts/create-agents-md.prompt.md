---
description: 'Generate a concise, repo-specific AGENTS.md entrypoint with source hierarchy, session controls, and operational guidance'
---

# Generate AGENTS.md File

## Mission

Generate a complete, repo-specific `AGENTS.md` file that acts as the primary agent entrypoint while staying aligned with the repository's existing specification, templates, prompts, and examples.

## Scope & Preconditions

**Prerequisites:**
- User wants to add or refresh a root `AGENTS.md` file
- Repository has an existing structure that the file must describe accurately
- Existing standards and terminology must be preserved

**Target Output:**
- One `AGENTS.md` file at repository root
- Concise and scannable operational guide
- Source-of-truth hierarchy and repository map included
- Session-state and command-namespace expectations documented

## Inputs

**Required Information:**
- Repository purpose and intended agent behavior
- Canonical paths and where authoritative guidance lives
- Default session state and command namespace (if already defined)
- Formatting, path-stability, and update/drift-control expectations

**Context Variables:**
- Specification documents under `specs/`
- Canonical templates under `templates/`
- Operational prompts under `prompts/`
- Example instruction files under `projects/` and `usercontexts/`
- Existing planning prompts under `plans/`

## Workflow

Execute discovery in seven phases. Complete each phase before proceeding to the next.

### Phase 1: Project Identity And Purpose

Determine:
1. What the repository is for
2. The difference between instructions and prompts in this repository
3. Intended portability constraints (provider-agnostic language)

Capture:
- One concise repository purpose statement
- One clear instructions-vs-prompts distinction

---

### Phase 2: Repository Layout And Canonical Paths

Determine:
1. Which directories are canonical and must remain stable
2. Which directories contain operational examples versus normative definitions
3. Whether legacy paths (for planning prompts) should be mentioned

Capture:
- A short repo map
- Canonical path set

---

### Phase 3: Source Hierarchy And References

Determine:
1. Which file is authoritative (spec)
2. Which files are canonical templates
3. Which prompts define workflows
4. Which files are samples only

Capture:
- Ordered precedence list
- Relative links to key references

---

### Phase 4: Roles, Phases, And Session-State Expectations

Determine:
1. Session-state elements that must be visible to agents
2. Default state values currently used by the repository
3. Transition policy (including explicit confirmations)

Capture:
- Session-state summary model
- Default-state table or equivalent concise representation

---

### Phase 5: Command Namespace And Control Surface

Determine:
1. Active command namespace prefix (if defined)
2. Required command set for state visibility/control
3. Alias policy and collision handling expectations

Capture:
- Command reference list with short descriptions
- Namespace policy statement

---

### Phase 6: Standards, Tooling, And Validation Hooks

Determine:
1. Formatting requirements for docs and headings
2. Path/link stability rules
3. Any testing or validation touchpoints to mention briefly

Capture:
- Formatting and path-stability rules
- Minimal standards/tooling summary

---

### Phase 7: Contribution And Drift-Control Workflow

Determine:
1. What must be updated when the spec changes
2. Which files require coordinated updates to avoid drift
3. How to keep `AGENTS.md` synchronized with repository reality

Capture:
- Drift-control/update rule covering spec, templates, prompts, samples, and README

---

## Generation Rules

After discovery, generate `AGENTS.md` using these rules:

1. Keep it repo-specific and operational
- Describe the current repository as it exists
- Do not produce a generic policy file detached from the repo context

2. Embed essentials and link deeper docs
- Include only high-signal operational guidance in `AGENTS.md`
- Link to detailed references (spec/templates/prompts/samples) using relative paths
- Do not copy full specifications into `AGENTS.md`

3. Keep it concise and scannable
- Prefer short sections, tables, and direct statements
- Avoid long prose blocks and repeated content
- Avoid overstuffing with low-value detail

4. Preserve portability and neutrality
- Keep language provider-agnostic
- Avoid assumptions tied to one IDE or one assistant runtime

5. Preserve repository conventions
- Keep canonical paths stable
- Match existing naming conventions
- Follow repository formatting guidance (no decorative icons/emojis in headings)

6. Model the operational contract
- Include session-state expectations and explicit transition behavior
- Include command namespace policy and command reference if the repo defines one
- Include ambiguity handling ("ask before switching assumptions/state")

7. Support drift control
- Include an update rule describing what must be audited if the spec changes
- If the repository uses planning prompts, reference `plans/` as the plan location

---

## Output Format

Return the generated file as a single Markdown code block containing a complete root `AGENTS.md`.

````markdown
```markdown
<!-- Full AGENTS.md content -->
```

**Filename:** `AGENTS.md`
````

Then provide a short completion summary:
- What was included
- Which key references were linked
- Any assumptions made due to missing repository information

---

## Validation Checklist

Before returning output, verify:
- [ ] File is repo-specific and actionable
- [ ] Includes purpose and instructions-vs-prompts distinction
- [ ] Includes source-of-truth precedence (spec/templates/prompts/samples)
- [ ] Includes repository map with stable canonical paths
- [ ] Includes scoping/precedence policy for nested `AGENTS.md`
- [ ] Includes session-state expectations and no-silent-transitions behavior
- [ ] Includes ambiguity rule (ask before switching assumptions/state)
- [ ] Includes command namespace policy and command list (if defined by repo)
- [ ] Includes explicit default state values (if defined by repo)
- [ ] Includes formatting/path stability rules
- [ ] Includes drift-control/update rule for spec changes
- [ ] Uses relative links and all links resolve
- [ ] Uses provider-agnostic language
- [ ] Is concise and not overstuffed

---

## Example Reference

If examples are requested, use:
- `AGENTS.md` (repo-specific sample)
- `templates/AGENTS_template.md` (general starting template)
