# Readiness Check

Do not start implementation yet.

Read `AGENTS.md` first and follow its precedence and role guidance throughout,
including its spec-driven change workflow section (OpenSpec root, active change,
how this project invokes OpenSpec).

## 1. Confirm OpenSpec is available

Start the `ack-openspec-check` skill and act on its status line
(spec section 11.6):
- `NO_CLI`: this session is in **manual mode** (spec section 11.5): planning
  artifacts may be written, but implementation may not start. Stop, pass on the
  install steps from the check, and offer to help with planning instead.
- `UPGRADE_CLI`: the CLI is older than `2.1.0`. Stop and pass on the upgrade
  steps from the check.
- `UPDATE_FILES` or `UNVERIFIED`: the repository's OpenSpec files are older
  than the CLI, or could not be confirmed current. Pass on the `openspec update`
  steps and continue only after the user has run them or says to proceed.
- `NEWER`: continue, and note in the report that the version is newer than the
  kit's tested version.
- `OK`: continue.

Run `openspec list --json`.
- If no OpenSpec root is found, stop: this repository is not set up for the
  spec-driven workflow (spec section 11.1). Recommend `openspec init` and do
  nothing else.

## 2. Determine the target change

If the user named a change or task, target that change.
If not, determine the target in this order:
1. The active change named in the spec-driven section of `AGENTS.md`.
2. The only active change in `openspec list --json`.
3. If neither gives a single unambiguous change, stop and ask the user to name
   the change. Do not guess.

If the requested work has no change at all, stop: there is no change, so there
is no code (spec section 11.2). Offer to create one with the project's OpenSpec
propose workflow. Work with no behavior impact still gets a change, with
`skip_specs: true` in its `.openspec.yaml`.

## 3. Check apply-readiness

Run `openspec instructions apply --change <id> --json` and read `state`:
- `blocked`: the change is not apply-ready. Report the `missingArtifacts` and
  `missingPrerequisites`, and offer to complete them
  (`openspec instructions <artifact> --change <id> --json` shows how).
  Do not plan any code.
- `ready`: the change is apply-ready. Continue.
- `all_done`: every task is ticked.
  - If the latest self-review for this change opened with `STATUS: BLOCKED`,
    its findings still need fixing: go to the implementation step, which
    reopens the affected tasks (see "Fixing review findings" there).
  - Otherwise skip to self-review (`ack-loop-03-review`) or human-in-the-loop (`ack-loop-05-commit`);
    there is nothing left to implement.

## 4. Read the context

Read each of the following in full:
- the change's `proposal.md`, `design.md`, `tasks.md` and every spec delta under
  its `specs/` folder (`openspec status --change <id> --json` lists the paths
  under `artifactPaths`)
- the main specs in `openspec/specs/` that the spec deltas modify
- `docs/adr/README.md` and every ADR relevant to the change
  (fall back to `docs/adrs/` if `docs/adr/` is absent)
- `docs/use-cases/README.md` and every use-case file linked to the change, if
  they exist

For arc42 architecture documentation, check whether a `docs/arc42/` folder exists:
- If it exists, read `docs/arc42/05-building-block-view.md` and
  `docs/arc42/10-quality-requirements.md` in full.
- If it does not exist, note this in the readiness report and recommend that
  the user consider adopting arc42 for structured architecture documentation.
  Do not block the readiness assessment on its absence.

Do not proceed to the readiness assessment until all available files above have been read.

Inspect the primary code and test directories to confirm the current solution structure
(commonly `src/` and `tests/`, but use whatever the project defines).
Check `.agents/skills/` for any applicable skills.

## 5. Pick the next task group

From `tasks.md`, take the first task group (a `## N.` heading) that still has
unchecked tasks. That group is the step to implement. Do not plan beyond it.

Determine:
- whether the group can be implemented as written, or the change needs updating
  first (for example, a task contradicts a spec delta or an ADR)
- the test seams the design names for this group, or that none are named
- which files in the project's code and test directories would be touched

## Report

Reply with a short readiness report:
- the change id, its `state`, and its task progress (`progress` from the apply instructions)
- the task group to implement, with each task's id and description
- the files that would be touched, and the test seams
- which skills under `.agents/skills/` apply to this group
- if arc42 docs are present: which sections are likely to need updating after
  implementation, and which skill under `.agents/skills/` covers each one
- any ADR the group touches or contradicts
- the OpenSpec version, and any visibility gaps or missing context

Stop and wait for explicit go-ahead before making any changes.
