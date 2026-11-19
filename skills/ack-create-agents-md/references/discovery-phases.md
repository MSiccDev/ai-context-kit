# Discovery Phases: ack-create-agents-md

One sequence for both modes. Root mode runs all eight phases. Nested mode runs phases 1, 2, 7 and 8, scoped to the target folder.

Question style: Ask the questions with `ack-interview` (`skills/ack-interview/`): look up facts first, ask only about decisions whose prerequisites are settled, and give a recommended answer with each question. Discovery is done when no required field is left open. Facts here include paths, stack, test commands, existing `AGENTS.md` files and the OpenSpec state.

## Phase 1: Identity And Purpose
Collect:
- what the repository (or, in nested mode, the folder) is for
- the instructions-versus-prompts distinction
- portability constraints

## Phase 2: Layout And Canonical Paths
Collect:
- canonical directories and their purpose
- normative versus sample paths
- legacy structure to handle
- whether nested `AGENTS.md` files exist or are planned, and for which folders

## Phase 3: Source Precedence And Key References
Collect:
- the source-of-truth precedence order
- key references, as relative links

## Phase 4: Session State
Collect:
- defaults for the six elements: Project, Role, Phase, Output Style, Tone, Interaction Mode
- the no-silent-transitions rule and the ambiguity rule

## Phase 5: Session Commands
Collect:
- which tools the project uses, to write how each starts `ack-session`
- any default values the commands should mention (roles, phases, styles, tones)

## Phase 6: Spec-Driven Workflow
First start the `ack-openspec-check` skill (spec section 11.6) and act on its status line:
- `UPGRADE_CLI`: stop discovery here and pass on the upgrade steps; continue when the user has upgraded.
- `UPDATE_FILES`: pass on the `openspec update` steps and continue only after the user has run them or says to proceed, so the invocation rows describe the current OpenSpec skills.
- `NO_CLI`: continue in manual mode (spec section 11.5) by reading `openspec/` directly, pass on the install steps, and note both in the completion summary.
- `OK` or `NEWER`: continue.

Then run `openspec list --json` (spec section 11). Collect:
- the OpenSpec root: the `openspec/` folder under `root.path`, written relative to the repository (usually `openspec/`; `root.path` itself is the directory that contains it), or that OpenSpec is not yet initialised
- the active change: recommend the only active change if there is exactly one, otherwise `none` or the user's choice
- the minimum OpenSpec version (`2.1.0`)
- one invocation row per tool `openspec init` configured, or per tool the user names, naming the OpenSpec 2.x skills (for example `/openspec-propose` in Claude Code, `$openspec-propose` in Codex)

If no OpenSpec root is found, record "not yet initialised in this repository" and offer `openspec init`. Do not run it without approval.

## Phase 7: Project Context
Collect (in nested mode, only what is local to the folder):
- stack, architecture and repository structure
- 3 to 5 roles, each with when to use, behavior and typical outputs
- development principles and quality gates
- current objectives and roadmap
- key components
- testing strategy and practical build, test and run commands
- documentation standards

## Phase 8: Standards And Drift Control
Collect:
- formatting rules and path stability rules
- which artifacts must change together when the specification changes
- in nested mode: which root rules this folder overrides, and why

## Extraction Rule
After each phase, map the findings onto the target schema and flag any required field that is still missing.
