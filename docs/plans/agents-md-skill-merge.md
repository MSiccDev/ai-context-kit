# Outline: merging the AGENTS.md skills

Nov 17, 2026 · Status: **implemented** (Nov 17, 2026). Decisions A to D accepted; all three gaps in section 6 are closed. The merged skills are in `skills/ack-create-agents-md/` and `skills/ack-validate-agents-md/`.

Part 2 rollout step 4 of the [2.0 adoption plan](2.0-adoption-plan.md), second pull request. It carries out [ADR-009](../adr/ADR-009-merge-agents-md-skills.md):

- Merge `create-agents-md` and `create-project-instructions` into **`ack-create-agents-md`**, with **root** and **nested** modes.
- Merge `validate-agents-md` and `validate-project-instructions` into **`ack-validate-agents-md`**, with one combined scoring rubric.

Section 1 compares what exists today. Sections 2 and 3 propose the two merged skills, section 4 the migration, and section 5 the decisions that need your answer. Gaps found while comparing are in section 6.

## 1. What exists today

Both pairs write or check the same file, `AGENTS.md`, but each covers only part of what the template requires.

### The two creators

| | `create-agents-md` | `create-project-instructions` |
| --- | --- | --- |
| Writes | The entry-point half: purpose, precedence, repository map, nested-scope rules, session state, ambiguity rule, command namespace, formatting, drift control | A full file of 9 sections, including `Repository Project Context` with 12 required subsections |
| Discovery | 7 phases: identity, layout, source hierarchy, session state, command namespace, standards, drift control | 7 phases: identity, stack and architecture, roles, default session state, principles, objectives, components and docs |
| Extra references | `required-elements.md` | `output-schema.md`, `command-template.md`, `role-template.md` |
| Nested files | Not covered | Mentioned once (`<scope>/AGENTS.md` as a target path), with no rules |
| `Scope And Precedence For AGENTS.md Files` section | Required | Missing from its 9-section schema |
| `Spec-Driven Change Workflow` section | Missing | Missing |

Both creators ask about session state and the command namespace, each in its own phase.

### The two validators

| | `validate-agents-md` | `validate-project-instructions` |
| --- | --- | --- |
| Phases (points) | Core presence and structure (20), operational contract (35), clarity and conciseness (20), portability and neutrality (15), links and repository alignment (10) | File structure and core sections (20), session state and command policy (20), repository project context (25), reference integrity and safety (15), clarity and operational quality (20) |
| Checks project context | No | Yes: at least 3 roles, complete role table, all 12 subsections |
| Checks nested-scope rules | Yes | No |
| Checks the OpenSpec section | No | No |
| Grade bands | Identical: 90+ PASS, 75-89 PASS WITH WARNINGS, 60-74 PASS WITH WARNINGS (Needs Improvement), under 60 FAIL | Same |
| Report file | `[original-name].validation.md` | `AGENTS.validation.md` |

Today a file can score 100 on one validator and fail the other. The kit's own `AGENTS.validation.md` came from `validate-agents-md` only.

## 2. Proposed `ack-create-agents-md`

### Modes

| Mode | Target | Writes |
| --- | --- | --- |
| **root** | `AGENTS.md` at the repository root | The full template, every section |
| **nested** | `<folder>/AGENTS.md` below the root | Only what is local to that folder, plus a pointer to the root file |

The mode is chosen from the target path: the repository root means root mode, anything deeper means nested. The user can override it. Nested mode requires a root `AGENTS.md` to exist first; if there is none, the skill stops and offers root mode.

### Discovery (one sequence, replacing both sets of seven phases)

Root mode runs all phases. Nested mode runs phases 1, 2, 7 and 8, scoped to the folder.

1. **Identity and purpose:** what the repository or folder is for, and the instructions-versus-prompts distinction.
2. **Layout and canonical paths:** directories, normative versus sample paths, legacy structure.
3. **Source precedence and key references.**
4. **Session state:** the six elements with defaults, and the no-silent-transitions rule.
5. **Command namespace:** prefix, command set, alias policy.
6. **Spec-driven workflow (new):** run `openspec list --json`. If it finds an OpenSpec root, record the root, the active change, the minimum version and each tool's invocation spelling. If it doesn't, record that the repository isn't set up yet and offer `openspec init` (spec section 11.1).
7. **Project context:** stack and architecture, roles (3 to 5), principles, objectives, key components, testing strategy and commands, documentation standards, roadmap.
8. **Standards and drift control:** formatting rules, path stability, which artifacts must change together.

Questions follow one style throughout: each comes with a recommended answer, and anything the agent can look up in the repository is looked up rather than asked. This matches the interview method planned for `ack-interview` ([ADR-012](../adr/ADR-012-interview-primitive.md)), which can replace these phases once it exists.

### Required sections

**Root mode** follows `templates/AGENTS_template.md` exactly, in its order:

Purpose · Source Of Truth And Precedence · Repository Map · Scope And Precedence For AGENTS.md Files · Session-State Contract · Command Namespace Policy · **Spec-Driven Change Workflow** · Repository Project Context (all 12 subsections) · Formatting And Path Stability Rules · Update And Drift-Control Rule · Key References

**Nested mode** writes:

| Section | Content |
| --- | --- |
| Scope | Which folder this file governs, and that the root `AGENTS.md` applies everywhere else |
| What This Folder Overrides | Only the rules that differ from the root file, each naming the root rule it refines |
| Local Map | The folder's own paths and their purpose |
| Local Commands | Build and test commands that run from this folder, if different |
| Key References | The root `AGENTS.md`, plus local references |

Nested files don't repeat session state, the command namespace, drift control or the spec-driven section. If a nested file needs to change one of those, it says so under "What This Folder Overrides".

### References (merged)

| New reference | Built from |
| --- | --- |
| `references/discovery-phases.md` | Both discovery files, merged as above |
| `references/root-schema.md` | `create-project-instructions/references/output-schema.md` plus `create-agents-md/references/required-elements.md`, aligned to the template, with the spec-driven section added |
| `references/nested-schema.md` | New |
| `references/command-template.md` | Moved as is |
| `references/role-template.md` | Moved as is |
| `references/output-format.md` | Both output formats; the completion summary covers both modes |
| `references/quality-checklist.md` | Both checklists, split by mode |

Unchanged rules: stamp `<!-- spec_version: 2.0.0-beta.1 -->`, use relative paths only, keep the wording provider-neutral, and don't copy normative spec text.

## 3. Proposed `ack-validate-agents-md`

### Combined rubric (100 points)

| Phase | Root | Nested | Checks |
| --- | --- | --- | --- |
| 1. Structure and core sections | 15 | 20 | File exists. Required sections for the mode are present and in template order. Headings are scannable. |
| 2. Operational contract | 25 | 15 | Root: session state with all six defaults, no silent transitions, ambiguity rule, full namespaced command list, nested-scope rules, drift control. Nested: scope statement, a pointer to the root file, every override names the root rule it refines. |
| 3. Spec-driven workflow | 10 | 0 | The section is present. It names the OpenSpec root, active change, minimum version and invocation. It matches `openspec list --json` and `openspec/config.yaml` when they exist. Nested files aren't scored here. |
| 4. Project context | 20 | 15 | Root: at least 3 roles with a complete table, all 12 subsections with substantive content. Nested: the local map and local commands are concrete. |
| 5. Clarity and conciseness | 15 | 25 | Actionable and testable, no conflicting rules, no copied spec text. Nested: no repetition of root content. |
| 6. Portability, links and alignment | 15 | 25 | Provider-neutral. Every relative link and path resolves. Canonical paths match the repository. |

The grade bands stay as they are today (shared by both validators). The phase scores must add up to the reported total; the report states the sum.

### Critical findings (each blocks PASS, whatever the score)

- Root mode has no session-state contract or no command namespace.
- Root mode is missing the `Spec-Driven Change Workflow` section (spec section 11.1). Decision A below covers what happens when the section exists but the repository has no `openspec/`.
- A relative link or path does not resolve.
- A nested file contradicts the root file without saying it overrides it.

### Unchanged

- The `spec_version` check: a WARNING when the stamp is missing or older than `2.0.0-beta.1`.
- Severity buckets: Critical, Warnings, Enhancements.
- The report goes next to the file as `[original-name].validation.md` (so `AGENTS.validation.md` for `AGENTS.md`). Its sections are the six phases, a summary, recommendations with a migration path, and example fixes.
- The validator never rewrites the target file.

## 4. Migration

| Item | Change |
| --- | --- |
| Skill folders | `create-agents-md` and `create-project-instructions` are replaced by `ack-create-agents-md`. `validate-agents-md` and `validate-project-instructions` are replaced by `ack-validate-agents-md`. History follows the larger skill of each pair (`git mv`); the other's unique references move in. |
| Skill `version` | `1.0.0` becomes `2.0.0` for both merged skills |
| `.agents/skills/` symlinks | Four links become two, and are checked to resolve (the lesson from MSiccDev/ai-context-kit#84) |
| `prompts/skills/` wrappers | All four wrappers point to the merged skills. `create-project-instructions.prompt.md` and `validate-project-instructions.prompt.md` say they now open the merged skill in root mode. The wrappers themselves go away later (ADR-010). |
| `AGENTS.md`, `README.md`, `skills/README.md` | References updated; the README skill table drops from 4 rows to 2 |
| `SKILL.validation.md` | New reports for both merged skills, produced by running `ack-validate-skill`; the four old reports go with their folders |
| `AGENTS.validation.md` | A full re-run with `ack-validate-agents-md` in root mode. This is the full re-run deferred since 2.0.0-beta.1. Its result depends on decision A. |
| `CHANGELOG.md` | A Breaking entry under `[Unreleased]` with the old-to-new names and a note for files written by the old creators |

## 5. Decisions

All four recommendations were accepted on Nov 17, 2026: A Critical, B the five nested sections, C no aliases, D the weights as proposed.

**A. A repository with no `openspec/` yet.** Spec section 11.1 says a kit-managed repository **MUST** have one. The kit repository itself doesn't until rollout step 6, and its `AGENTS.md` says so.
- **Recommended: Critical, no exceptions.** The validator follows the spec, so the kit's own re-run reports FAIL until step 6. That's honest, and it puts pressure on step 6.
- Alternative: a Warning while the spec is in beta, becoming Critical at 2.0.0.

**B. Nested-mode content.** The table in section 2 is new; neither skill defines nested files today.
- **Recommended: the five sections in section 2**, with no repetition of root content.
- Alternative: nested files follow the full template but may leave root-only sections empty.

**C. Aliases for the old names.** Should `create-agents-md` and the other three remain as thin redirect skills for one beta?
- **Recommended: no aliases.** MSiccDev/ai-context-kit#84 renamed seven skills without aliases, and 2.0 is the breaking release.
- Alternative: redirect skills that only say "use `ack-create-agents-md`", removed at 2.0.0.

**D. Rubric weights.** The weights in section 3 are a first proposal; the root column moves 10 points to the new spec-driven phase.
- **Recommended: accept them as is** and adjust after the first real validations.

## 6. Gaps found while comparing

| Gap | Status |
| --- | --- |
| 1. Neither creator writes the `Spec-Driven Change Workflow` section, which the template has required since 2.0.0-beta.1, and neither validator checks for it. A file generated today can't satisfy spec section 11.1. | **Closed** by the merged skills, as proposed below |
| 2. The kit's own `AGENTS.validation.md` reported 100/100, but its phase scores are 20 + 35 + 19 + 15 + 10 = 99. | **Fixed:** the report now states 99/100 with the sum, and a dated correction. The status stays PASS (90-100). The full re-run in section 4 replaces the report later. |
| 3. `create-project-instructions` didn't require the `Scope And Precedence For AGENTS.md Files` section, so its files missed the nested-precedence rules the template has. | **Fixed:** added to its output schema (in template order, with the template's four rules), its quality checklist and its discovery. `validate-project-instructions` now checks the section too. |

While fixing gap 2, every other validation report was checked for the same mismatch. None can have it: the twelve `SKILL.validation.md` and sample reports state only a total, with no phase scores to add up. The merged validator's sum rule (section 3) applies to new reports.

### Proposal for gap 1

**Recommended: fix it in the merged skills only, with no interim patch to the four current skills.** The next pull request replaces those skills, so a patch would be written once and deleted days later. Until then, the gap is documented here and in the changelog.

**`ack-create-agents-md` writes the section in root mode** from discovery phase 6, which runs `openspec list --json`:

| Field | Source | When OpenSpec isn't set up |
| --- | --- | --- |
| OpenSpec root | `root.path` from `openspec list --json`, written relative to the repository | "not yet initialised in this repository", and the skill offers `openspec init` |
| Active change | Asked, with the only active change from `openspec list --json` as the recommended answer; `none` if there are none | `none` |
| Minimum OpenSpec version | The spec's minimum, `1.13.2` | Same |
| No Change, No Code | The template's four rules, unchanged | Same |
| Invoking OpenSpec | One row per tool `openspec init` configured, with its invocation spelling | One row per tool the user names |

**`ack-validate-agents-md` checks it in phase 3** (root mode, 10 points):

| Check | Severity |
| --- | --- |
| The section is missing | Critical |
| The repository has no `openspec/` (`openspec list --json` finds no root) | Critical (decision A) |
| The stated OpenSpec root doesn't match `root.path` | Critical |
| The stated active change isn't in `openspec list --json`, or the section names none while exactly one change is active | Warning |
| The minimum version differs from the spec's `1.13.2` | Warning |
| The four No Change, No Code rules are incomplete | Warning |
| `openspec/config.yaml` has a `context` field that doesn't point to `AGENTS.md` (spec section 11.4 asks for pointers, not copies) | Warning |
| The invocation table is empty | Enhancement |

Without the CLI (manual mode), the validator can't run `openspec list --json`. It then checks the section's fields against the files under `openspec/`, and says so in the report.

**What this means for the kit itself:** the full `AGENTS.validation.md` re-run in the next pull request reports FAIL with one critical finding (no `openspec/`) until rollout step 6 runs `openspec init` here.

## 7. Not in this pull request

- The `invocation` field (user- or model-invoked) and Codex sidecars: a separate step 4 pull request.
- Loop prompts as `ack-loop-*` skills, and removing the `prompts/skills/` wrappers ([ADR-010](../adr/ADR-010-loop-prompts-become-skills.md)).
- New skills: `ack-guide`, `ack-session`, `ack-interview`, `ack-interview-with-context`, `ack-tdd`.
