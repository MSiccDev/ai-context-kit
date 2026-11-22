# Changelog

All notable changes to AI Context Kit are documented here.

## How to use this changelog

When a new version is released:
1. Check what changed in the version entry below, starting with **Breaking** and **Migration**
2. Update each project with `npx @msiccdev/ai-context-kit@latest update`; it never overwrites files you edited and writes `<file>.ai-context-kit-new` beside them instead
3. Entries up to 2.0.0-beta.1 describe the retired template-repository path in their **Safe to update** and **Protect** sections

---

## [Unreleased]

## [2.0.0] - 2026-11-22

### Breaking
- The minimum OpenSpec version is **2.1.0** (ADR-016, superseding ADR-002; spec section 11.6; OpenSpec change `require-openspec-2-1`). OpenSpec 2.x installs its workflows as skills (`/openspec-propose`, `$openspec-propose`) and `openspec update` removes the 1.x `/opsx:*` commands, so the kit now names only 2.x skills
  - New model-invoked skill **`ack-openspec-check`**: reports the CLI version and whether the repository's generated OpenSpec files match it (`openspec update --dry-run --json`), and gives the upgrade steps. It changes nothing itself
  - `ack-loop-01-readiness` 1.1.0, `ack-create-agents-md` 2.1.0, `ack-validate-agents-md` 2.2.0 and `ack-guide` 1.1.0 run it before relying on OpenSpec. A CLI older than 2.1.0 stops them until you upgrade (the validator reports a critical finding); stale generated files, or files the check cannot confirm (`UNVERIFIED`), wait until you run `openspec update` or say to proceed (a warning). Without a CLI, manual mode still allows planning and AGENTS.md generation
  - To upgrade: `npm install -g @fission-ai/openspec@latest` (or your package manager's equivalent), then `openspec update` in each repository, and change `Minimum OpenSpec version` in your `AGENTS.md` to `2.1.0`. `openspec update` can turn `.claude/skills/openspec-*` into symlinks to `.agents/skills/`; on Windows enable git symlink support first
- `ack-session` replaces the `/ack.*` and per-project `/<tag>.*` session commands (ADR-011; Part 2 rollout step 4). Run `ack-session context`, `mode`, `phase`, `style`, `tone`, `interact` or `reset` instead. It is user-invoked, so the assistant cannot change session state on its own; plain-language requests still work
  - Spec section 8.2 is now the Session Skill; section 8.4 requires a `Session Commands` section in `AGENTS.md` and drops per-project command prefixes. Sections 5.5 and 6.3 point to `ack-session context`
  - `templates/AGENTS_template.md` renames `Command Namespace Policy` to `Session Commands`. `ack-create-agents-md` writes it, `ack-validate-agents-md` checks it, and the kit's own `AGENTS.md` uses it. Existing `AGENTS.md` files with the old section need it rewritten from the template
  - The user context template refers to `ack-session context` instead of `/tag.context`
- Every skill declares who may start it (2.0 adoption plan, user versus model invocation split; Part 2 rollout step 4):
  - `metadata.invocation: "user"` for the twelve create, validate, governance and loop skills, which also carry Claude Code's `disable-model-invocation: true`, so Claude Code no longer loads them on its own; `/name` still runs them
  - `metadata.invocation: "model"` for `ack-create-checkpoint` and `ack-restore-checkpoint`, which the assistant may still start on its own
  - `disable-model-invocation` is outside the Agent Skills spec: claude.ai and the Skills API reject it on upload, so remove that line from a user-invoked skill before uploading it. Pasting a skill or adding it as project knowledge is unaffected
  - Codex sidecars (`agents/openai.yaml`) are not shipped; the 2.0 installer generates them from `metadata.invocation`. Until then Codex may still select any skill on its own
  - `templates/skill_template/SKILL.md` and `ack-create-skill` require `metadata.invocation`, pair it with `disable-model-invocation`, and forbid a skill from starting a user-invoked skill. `ack-validate-skill` warns on a missing or invalid value, a mismatched pair, or a skill that starts a user-invoked one
  - The five loop skills' validation reports drop their invocation deduction (now 99/100, and 100/100 for learnings)
- The implementation loop prompts are now skills, and `prompts/` is gone (ADR-010; 2.0 adoption plan, Part 2 rollout step 4):

  | Before | After |
  | --- | --- |
  | `prompts/loop/01-readiness-check.prompt.md` | `ack-loop-01-readiness` |
  | `prompts/loop/02-implementation.prompt.md` | `ack-loop-02-implement` |
  | `prompts/loop/03-self-review.prompt.md` | `ack-loop-03-review` |
  | `prompts/loop/04-learnings.prompt.md` | `ack-loop-04-learnings` |
  | `prompts/loop/05-human-in-the-loop.prompt.md` | `ack-loop-05-commit` |

  - Each loop prompt moved unchanged into its skill's `references/procedure.md`. The new `SKILL.md` files add the seven required sections and the step's place in the loop. The procedures' cross-references now name the skills
  - The ten `prompts/skills/*.prompt.md` wrappers are removed; invoke the skills directly. The `source_prompt` metadata fields that pointed at them are removed from six skills
  - Spec: section 2.2 drops prompts from the precedence order (four levels now); section 10.2 drops `prompts/` from the canonical paths; section 10.3 forbids separate prompt files that duplicate or route to skills; section 10.6 drops prompt entrypoints from the drift audit; the Prompt Composition Entrypoint Contract (old 10.7) is removed, so Workflow Family Mapping becomes 10.7 and gains a Loop workflows family
  - `templates/AGENTS_template.md`, `AGENTS.md`, `README.md`, `skills/README.md`, `ack-drift-control` and the plugin descriptions no longer mention prompts or wrappers; the `.agents/skills/` links include the five loop skills
  - Each loop skill has a `SKILL.validation.md` (98 or 99/100). Until the invocation field lands, nothing marks the loop skills as user-only, so an agent could select one on its own
- The four AGENTS.md skills are merged into two (ADR-009; 2.0 adoption plan, Part 2 rollout step 4; design in `docs/plans/agents-md-skill-merge.md`):

  | Before | After |
  | --- | --- |
  | `create-agents-md`, `create-project-instructions` | `ack-create-agents-md` |
  | `validate-agents-md`, `validate-project-instructions` | `ack-validate-agents-md` |

  - `ack-create-agents-md` has **root** and **nested** modes, chosen from the target path. Root mode writes every section of `templates/AGENTS_template.md`, now including `Scope And Precedence For AGENTS.md Files` and `Spec-Driven Change Workflow` (filled from `openspec list --json`). Nested mode writes five folder-specific sections and points to the root file
  - `ack-validate-agents-md` scores both modes with one six-phase rubric. It accepts `Active change: none` when no change is active. It adds a spec-driven phase, lists critical findings that fail a file whatever its score (including a repository with no OpenSpec root), and requires phase scores to add up to the reported total
  - Both skills are at version `2.0.0`. There are no aliases for the old names; the four `prompts/skills/` wrappers now point to the merged skills, and the `.agents/skills/` links are updated
  - `AGENTS.validation.md` is fully re-run with `ack-validate-agents-md`. It now reports **FAIL** (88/100) with one critical finding: this repository has no OpenSpec root yet, which rollout step 6 fixes
  - Files written by the old creators lack the `Spec-Driven Change Workflow` section, and files from `create-project-instructions` may lack `Scope And Precedence For AGENTS.md Files`. Validate them with `ack-validate-agents-md` and add the missing sections from the template
- Seven skills are renamed with the `ack-` prefix, verb first (ADR-008; 2.0 adoption plan, Part 2 rollout step 4, first part). Their folders move under `skills/`, and every `name:` and reference changes with them:

  | Before | After |
  | --- | --- |
  | `create-usercontext-instructions` | `ack-create-user-context` |
  | `validate-usercontext-instructions` | `ack-validate-user-context` |
  | `create-skill` | `ack-create-skill` |
  | `validate-skill` | `ack-validate-skill` |
  | `repository-drift-control` | `ack-drift-control` |
  | `create-checkpoint` | `ack-create-checkpoint` |
  | `restore-checkpoint` | `ack-restore-checkpoint` |

  The repo-local `.agents/skills/` symlinks are renamed and retargeted to match, so Codex run inside a checkout still discovers all eleven skills.

  Invoke them by the new names, for example `/ai-context-kit:ack-create-user-context` in Claude Code or `$ack-drift-control` in Codex. The four AGENTS.md skills keep their names until they are merged into `ack-create-agents-md` and `ack-validate-agents-md` (ADR-009). The `prompts/skills/` wrapper files keep their names until the wrappers are removed (ADR-010)

### Changed
- Version `2.0.0-beta.1` → `2.0.0` everywhere it is stamped or cited: the spec (status Active) and `docs/spec-rationale.md`, both templates, the sample user context and its report, the skills that stamp or check `spec_version`, `README.md`, `AGENTS.md`, the plugin manifests and the installer package. Files stamped `2.0.0-beta.1` now get the validators' outdated-stamp warning
- Pre-release cleanup (OpenSpec change `prerelease-cleanup`): the OpenSpec telemetry opt-out (spec section 11.8) is now named in the README, `templates/AGENTS_template.md` (written by `ack-create-agents-md` 2.3.0) and `ack-openspec-check` 1.1.0, which asks about it after an install or upgrade. The README lists all five model-invoked skills, no longer counts skills, describes the installer's Codex sidecars and shows the current repository tree; `AGENTS.md` describes the kit as installed per repository
- New ADR-019 (OpenSpec change `adr-openspec-scope`): from 2.1, OpenSpec is required where the implementation loop runs, not in every kit repository. Documentation, content and skill or prompt libraries will be able to declare "Spec-driven workflow: not used" in `AGENTS.md`; the loop skills then stop. Nothing changes in 2.0.0: OpenSpec stays mandatory
- CI runs less often (OpenSpec change `ci-trim`): a newer push to a pull request cancels the older run; merges into `development` no longer rerun the workflows its pull request already passed (`main` still runs them); changes to the spec, ADRs, templates or `openspec/` run one Linux drift job (`installer-drift.yml`) instead of the six-job installer matrix
- The installer keeps one home for every kit fact it depends on (OpenSpec change `installer-single-source`, after the maintainer's review): the `context` and `rules` it seeds into `openspec/config.yaml` now live only in the new `templates/openspec_config_block.yaml`, which the package bundles. New drift tests read the OpenSpec minimum (spec section 11.6, ADR-016, `ack-openspec-check`, the AGENTS template), the install command, the telemetry opt-out (spec section 11.8), the Node minimum (ADR-018, `engines`, the installer README), the tool registry (ADR-017) and the marker strings (ADR-013) from their homes and fail when the installer disagrees; tests no longer restate those facts. The installer workflow also runs when `specs/`, `templates/`, `docs/adr/` or `openspec/` change
- `ack-validate-user-context` 1.2.0: every phase states its score, and the phase scores must add up to the reported total, as in the other two validators (OpenSpec change `user-context-score-sum`, the kit's first change through OpenSpec)
  - `usercontexts/sample_usercontext.validation.md` is re-run in that format. The re-run found that the sample lacked the required **Documentation Preferences** section, which the earlier report missed
  - User-context reports written before this change lack per-phase scores until they are re-run
- Validators and drift control (2.0 adoption plan, Part 2 rollout step 5):
  - New writing checks adapted from mattpocock/skills writing-for-agents, in `skills/ack-validate-skill/references/writing-for-agents.md`: description as pointer (model-invoked skills list their triggers, user-invoked skills give a one-line summary), a completion criterion for every workflow step, no no-ops, sediment or duplicated rules, and positive instructions. All findings are warnings or enhancements
  - `ack-validate-skill` 1.1.0 applies them in phases 2 and 3, lists its critical findings, costs each warning 1 to 3 points by extent, and requires the phase scores to add up to the total. `ack-validate-agents-md` 2.1.0 applies them in phase 5. Both carry `metadata.credits`, and `THIRD_PARTY_NOTICES.md` lists them
  - `ack-drift-control` 1.1.0 adds `openspec/config.yaml` `context` to the audited set: it points to `AGENTS.md` and does not contradict it. Every workflow step now ends on a completion criterion
  - `ack-create-skill`, `ack-create-user-context` and `ack-validate-user-context` (1.1.0) get workflow steps with completion criteria, and lose two no-op lines. `ack-create-skill` and `templates/skill_template/SKILL.md` describe the description as a pointer
  - `ack-guide`'s `references/routes.md` no longer points to another reference
  - The first re-run found four warnings, now fixed: `ack-create-checkpoint` 1.1.0 states its approval rule once in workflow step 7 and once as a constraint instead of in five places; `ack-create-skill` and `ack-create-user-context` keep provider neutrality in one reference each; `ack-validate-user-context` scoring lists its critical findings and gives each warning a fixed cost
  - All 19 `SKILL.validation.md` reports are re-run and share one format, with per-phase scores that add up to the total. Scores range from 98 to 100, with no open warnings
- All five loop prompts aligned with OpenSpec (2.0 adoption plan, Part 2 rollout step 3), checked against OpenSpec 1.13.2 and 2.0.0 in a sample repository:
  - `01-readiness-check` checks the OpenSpec version and root, stops in manual mode, targets an OpenSpec change, gates on `openspec instructions apply --change <id> --json` reporting `state: "ready"`, and picks the next unchecked task group in `tasks.md`. It no longer reads `specs/`, `docs/specs/` or `docs/implementation-backlog.md`
  - `02-implementation` works task by task through the approved group and ticks a task in `tasks.md` only after its build and tests pass. It writes tests at the seams named in `design.md`, never edits generated `openspec-*` files, and stops to propose a change update instead of diverging from the change
  - `03-self-review` reviews on two axes, Spec (`openspec validate <id> --strict --json`, ticked tasks, requirement and scenario coverage, scope) and Standards, in parallel sub-agents where available, with separate finding lists
  - `04-learnings` grounds the "why" in the change's `proposal.md` and `design.md`, teaches how the code meets the spec deltas' requirements and scenarios, and keeps lessons from Spec findings separate from lessons from Standards findings
  - Review fixes have a path through the loop: after a `STATUS: BLOCKED` self-review, `02-implementation` reopens the tasks the findings affect (or adds corrective tasks), which returns an `all_done` change to `ready`; `01` routes an `all_done` change with an open blocked review to implementation, and `05` points there
  - `05-human-in-the-loop` adds door type and blast radius to the summary, and archives the change (`openspec archive <id> --yes --json`) as the last commit on the feature branch after review approval
- Spec section 11.2, the glossary and `templates/AGENTS_template.md` name `openspec instructions apply --change <id> --json` (`state: "ready"`) as the apply-ready check. The previous text named `openspec status`, which has no apply-ready field. ADR-001 gets a dated correction note
- `AGENTS.md` documents the git flow branch model under Repository Context: features merge into `development`; `release/<version>` branches start from `development` and `hotfix/<version>` branches start from `main`; both merge into `main` and are then brought back into `development`. `main` is the production release branch, so releases are not tagged

### Fixed
- `.agents/skills/` had no link to `ack-setup`, so Codex running inside the kit repository could not find it; a drift test now requires a link for every `skills/ack-*` folder
- The sample user context gains the required **Documentation Preferences** section; its report is back to 100/100 (OpenSpec change `sample-documentation-preferences`)
- `AGENTS.md` keeps the heading and path rules only in Formatting And Path Stability Rules and drops a line about the retired `/ack.*` commands, clearing the two phase 5 warnings; `AGENTS.validation.md` now reports 99/100 (OpenSpec change `agents-md-writing-cleanup`)
- The OpenSpec root check could not pass a correct `AGENTS.md`: `openspec list --json` reports `root.path` as the directory that contains `openspec/`, so `ack-create-agents-md` wrote `.` and `ack-validate-agents-md` flagged `openspec/` as a critical mismatch. The stated root is now the `openspec/` folder under `root.path` in both skills (2.0.1 and 2.1.1) and in the template placeholder (OpenSpec change `openspec-root-check`, found while dogfooding)
- `create-project-instructions` now requires the `Scope And Precedence For AGENTS.md Files` section, in template order with the template's four rules: it is in the output schema, the quality checklist and discovery. `validate-project-instructions` checks for it
- `AGENTS.validation.md` stated 100/100, but its phase scores add up to 99. It now states 99/100 with the sum and a dated correction; the status stays PASS
- Neither AGENTS.md creator wrote the `Spec-Driven Change Workflow` section the template requires, and neither validator checked it. Closed by the merged `ack-create-agents-md` and `ack-validate-agents-md` (see Breaking)

### Added
- Installer step 6, publishing (OpenSpec change `installer-release`; plan Part 3, ADR-013):
  - `.github/workflows/release.yml` publishes `@msiccdev/ai-context-kit` to npm with trusted publishing, so no npm token is stored. Every push to `main` publishes `installer/package.json`'s version if it is new: pre-releases to the `next` dist-tag, others to `latest`, with provenance. The publish job runs only on `main` in the `npm` environment; pull requests run a dry run
  - The first version is published by hand, because npm only accepts a trusted publisher for an existing package; `installer/RELEASING.md` has the one-time and per-release steps
  - `scripts/check-version-sync.sh` also checks `installer/package.json` and `installer/package-lock.json`
  - README: Quick Start starts with the install block (`install.md` for agents, `npx @msiccdev/ai-context-kit@latest init` for people). The template-repository section is retired; a short note tells existing template users how to move to the installer
- Installer step 4, the agentic half (OpenSpec change `installer-setup`; plan Part 3, ADR-013):
  - New user-invoked skill **`ack-setup`** 1.0.0: run once after `ai-context-kit init`. It explores the repository, recommends the next skill for OpenSpec, project context and your user context, in that order, and agrees the list with you. It writes nothing itself and never copies your user context into the repository. Adapts Matt Pocock's `setup-matt-pocock-skills` (MIT)
  - New **`install.md`** at the repository root: paste its link into an agent and it checks Node and OpenSpec (installing only with your consent, no sudo, no shell-profile edits), confirms the folder and tools, asks about OpenSpec telemetry, runs `npx @msiccdev/ai-context-kit@latest init`, and tells you how to start `ack-setup`. Drift tests keep its versions, command, flags and tool table in line with the installer
  - `ack-guide` 1.2.0 routes a new repository to `install.md` and `ack-setup`; `ack-create-agents-md` 2.2.0 keeps the installer's `AI-CONTEXT-KIT` marker block unchanged
- The installer sets up OpenSpec in the same `init` run (plan Part 3 step 3, OpenSpec change `installer-openspec`): it checks Node 22.12 and OpenSpec 2.1.0 (printing the install command and stopping when OpenSpec is missing or old), asks about OpenSpec telemetry before any OpenSpec call (off by default in non-interactive runs, `--openspec-telemetry on|off`), runs `openspec init --tools <same ids> --scope project` when there is no root and only checks an existing one, adds the kit's `context` and `rules` to `openspec/config.yaml` in a managed block when the file has neither (in any spelling) and is a plain YAML mapping, and records the OpenSpec version and telemetry answer in the manifest. `doctor` reports a missing or old OpenSpec CLI, a missing root and stale generated files. An end-to-end test runs the real OpenSpec 2.1.0 CLI on Linux, macOS and Windows
- The installer MVP in `installer/`: `@msiccdev/ai-context-kit`, bin `ai-context-kit` (plan Part 3 step 2, OpenSpec change `installer-mvp`, ADR-013 and ADR-017)
  - `init [path] --tools <ids|all|none>` copies the bundled `ack-*` skills into each tool's skills folder (Claude Code, Codex, GitHub Copilot, shared `.agents/skills/`), stamps `generatedBy` into each `SKILL.md`, writes Codex `agents/openai.yaml` sidecars that stop implicit invocation of user-invoked skills, adds kit blocks to `AGENTS.md` and `CLAUDE.md`, and records every file with its hash in `.ai-context-kit/manifest.json`. Without `--tools` it detects the tools in use
  - `update [--force]` refreshes unedited files, writes `<file>.ai-context-kit-new` beside edited ones and never overwrites an edited copy, leaves deleted files deleted (`--force` overwrites and restores), and never touches text outside the kit blocks, keeping a file's CRLF or LF line endings
  - `doctor [--json]` reports an old Node version, missing files, missing kit blocks and skills from an older kit version as problems, and locally edited files as warnings
  - `tools` lists the tool ids, skills folders and how to start a skill
  - Security: every managed path must stay inside the repository. An unsafe manifest entry (`../`, absolute, drive letter) stops `init` and `update`, and no read, write or delete follows a symbolic link or junction; `doctor` reports both. A manifest that is not valid JSON or has the wrong shape is reported by `doctor` and refused by `init` and `update`, which change nothing. Development dependencies pass `npm audit` (`vite` 7.3.8, `esbuild` 0.28.2), which CI now runs
  - No runtime dependencies; TypeScript and Vitest, tested on Linux, macOS and Windows with Node 22.12 and 24. The installer needs Node 22.12 or later (ADR-018), because Node 20 is end of life; both kit workflows now use `actions/checkout@v7` and `actions/setup-node@v7`, which run on Node 24 (`.github/workflows/installer.yml`). The package ships `LICENSE` and `THIRD_PARTY_NOTICES.md`, because some bundled skills adapt MIT-licensed work
- ADR-017: the installer tool registry and layout for 2.0, from the Part 3 spike (OpenSpec change `installer-spike`). Claude Code, Codex, GitHub Copilot and the shared `.agents/skills/` target, each with skills folder, instruction file and source; the installer lives in `installer/` (TypeScript, Vitest), copies files instead of symlinking, and writes a `CLAUDE.md` that imports `AGENTS.md`. The 2.0 installer covers plan Part 3 steps 1 to 4 and 6; Cursor, Gemini CLI and Mistral Vibe wait for 2.1. The change was archived in a follow-up pull request, after its own had merged
- The kit repository uses OpenSpec (2.0 adoption plan, rollout step 6). `openspec init --tools claude,codex` added `openspec/` and the generated `openspec-*` skills in `.claude/skills/` and `.agents/skills/`. `openspec/config.yaml` points to `AGENTS.md`, records that every kit change sets `skip_specs: true` because the session spec stays the normative document, and adds proposal, design and tasks rules. `AGENTS.md` fills its Spec-Driven Change Workflow section with the real root, active change, the four No Change, No Code rules and an Invoking OpenSpec table, and `AGENTS.validation.md` now reports **PASS**
  - The four changes are archived under `openspec/changes/archive/`, and `AGENTS.md` states `Active change: none`. They were archived in a follow-up pull request rather than as the last commit of the pull request that carried them, as spec section 11.7 asks, because that pull request was merged before its archive commit
- `ack-interview` (model-invoked): settles open decisions in rounds. It looks up facts before asking, asks only about decisions whose prerequisites are settled, gives a recommended answer per question, and stops only when nothing is open. `ack-create-agents-md`, `ack-create-user-context` and `ack-create-skill` now ask their discovery questions with it (ADR-012)
- `ack-interview-with-context` (user-invoked): the interview plus the glossary. It challenges fuzzy terms, records them with the synonyms to avoid in arc42 section 12 or `CONTEXT.md` (ADR-007), and offers an ADR only for decisions that pass the three-part test, indexed in `docs/adr/README.md` and, where arc42 exists, in the section 9 decision log (ADR-006). `ack-guide` recommends it before `openspec-propose`
- `ack-tdd` (model-invoked): seams agreed with the user before any test, then one vertical slice per cycle with a failing test first, with five named anti-patterns. `ack-loop-02-implement` writes its tests with it
- All three adapt mattpocock/skills (grilling, grill-with-docs and domain-modeling, tdd), credited in `metadata.credits`, their bodies, `THIRD_PARTY_NOTICES.md` and the README. `ack-drift-control` now checks that every credited skill has a notices row and every row names an existing skill (ADR-014)
- `ack-guide` (user-invoked): recommends the next kit or OpenSpec skill for a goal, along the main flow explore → propose → `ack-loop-01` to `05`, and walks the phase-boundary choices. It adapts mattpocock/skills' ask-matt router and phase-boundary tree
- Spec section 4.5.4, **Phase Boundary Choices**: at a phase boundary, consider continue, clear, handoff, subagent and compact in that order; compaction is last because only it loses context irreversibly
- `THIRD_PARTY_NOTICES.md` with the MIT license of mattpocock/skills and the list of adapted skills, and a README Acknowledgments entry (ADR-014). The skill template and `ack-create-skill` require `metadata.credits` for adapted material, and `ack-validate-skill` warns when it or the notices row is missing

### Migration
- **Skills renamed and merged.** Every skill now has the `ack-` prefix, the four AGENTS.md skills are merged into `ack-create-agents-md` and `ack-validate-agents-md`, and the loop prompts are the `ack-loop-01` to `ack-loop-05` skills. There are no aliases: update any instruction file or habit that names an old skill or a `prompts/` file (see Breaking)
- **Session commands.** Replace `/ack.*` and per-project `/<tag>.*` commands with `ack-session <command>`, and replace the `Command Namespace Policy` section of your `AGENTS.md` with `Session Commands` from the template
- **Install per repository.** Run `npx @msiccdev/ai-context-kit@latest init --tools <ids>` in each project (Node 22.12 or later), or paste `install.md` into your agent. It copies the skills, sets up OpenSpec (2.1.0 or later; it asks about telemetry, and `openspec config set telemetry.enabled false` or `OPENSPEC_TELEMETRY=0` turns it off), and writes the manifest. Then run `ack-setup`; later, `ai-context-kit update` refreshes the skills without overwriting your edits
- **OpenSpec.** Your `AGENTS.md` needs the `Spec-Driven Change Workflow` section with the `openspec/` folder as its root; `ack-create-agents-md` writes it
- **Re-validate.** Run `ack-validate-agents-md` on your `AGENTS.md` and `ack-validate-user-context` on your user context file; both reports now state per-phase scores that add up to the total
- **Claude Code uploads.** User-invoked skills carry `disable-model-invocation: true`; remove that line before uploading a skill to claude.ai or the Skills API

### Coming from the template repository
- The template-repository path is retired. Keep your user context file where it is, outside your projects, and install the kit into each project with the installer (see Migration). The kit repository's own `docs/adr/` and `openspec/` record the kit's decisions; do not copy them into your projects

---

## [2.0.0-beta.1] - 2026-11-16

First 2.0 pre-release: the session spec now makes OpenSpec mandatory (2.0 adoption plan, Part 2 rollout step 2). Skills, loop prompts and validators do not enforce the new rules yet; that follows in rollout steps 3 to 5, before 2.0.0.

### Breaking
- Spec section 11 (new), **Spec-Driven Change Workflow (OpenSpec)**: kit-managed repositories **MUST** contain an initialised `openspec/`, and the Implementation phase **MUST** start only against an apply-ready OpenSpec change (no change, no code). Section 11 also covers changes with no behavior impact (`skip_specs: true`), customising only through `openspec/config.yaml`, manual mode for chat-only surfaces, the minimum OpenSpec version (1.13.2; newer versions warn, never fail), archive timing, and the telemetry opt-out. See ADR-001 to ADR-005
- `templates/AGENTS_template.md` gains a required `## Spec-Driven Change Workflow` section (OpenSpec root, active change, no-change-no-code rule, how each tool invokes OpenSpec)

### Changed
- Spec section 2.1 adds change specifications (OpenSpec) as an artifact type; section 5.2 initialisation reads `openspec list --json` where the CLI is available; the section 7.3 phase table maps each phase to its OpenSpec step; section 10.2 lists `docs/adr/` as a canonical path; the glossary moves to section 12 and defines OpenSpec change, apply-ready and manual mode
- `docs/spec-rationale.md` explains why OpenSpec is mandatory, why customisation goes only through `config.yaml`, and why manual mode is first-class, with an example of the implementation gate
- Spec version `1.5.0` → `2.0.0-beta.1` everywhere it is stamped or cited: both templates, the sample user context, the `create-*` skills that stamp new files, the validators' version threshold, `AGENTS.md` and `README.md`
- The kit's own `AGENTS.md` gains the spec-driven section and a `docs/adr/` map entry. It states that this repository adopts OpenSpec in rollout step 6 (dogfood)
- `AGENTS.validation.md` and `usercontexts/sample_usercontext.validation.md` are re-checked for the version change only; full re-runs follow in rollout step 5
- Version bumped `1.5.3` → `2.0.0-beta.1` in `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, and `.codex-plugin/plugin.json`

### Added
- `scripts/check-version-sync.sh` checks that `.claude-plugin/plugin.json`, the `ai-context-kit` entry in `.claude-plugin/marketplace.json`, and `.codex-plugin/plugin.json` carry the same SemVer 2.0.0 version (no leading zeros, valid pre-release identifiers, optional `+build` metadata), and that the newest released heading in `CHANGELOG.md` matches it. Run it locally before tagging a release
- `.github/workflows/version-sync.yml` runs the check on pull requests that touch the manifests or the changelog, and on pushes to `main` and `development`, so a missed bump like 1.5.1's fails CI instead of shipping
- `docs/adr/` with ADR-001 to ADR-015, recording the 2.0 adoption plan's Decisions (OpenSpec mandatory, `ack-` skill names, merged AGENTS.md skills, installer package, attribution, release split and more), plus a `README.md` index. This completes Part 2 rollout step 1 of the plan; no skill, prompt or template behaviour changes yet
- `scripts/test-check-version-sync.sh` runs the check against throwaway fixture repos (valid and invalid versions, drift in each source, a missing manifest); CI runs it before the real check

### Migration
- Existing user context files and `AGENTS.md` files stamped `1.5.0` now get a version warning from the validators. Re-stamp them once you have reviewed spec section 11
- Project `AGENTS.md` files need the new `## Spec-Driven Change Workflow` section from the template, and the repository needs `openspec init` (OpenSpec 1.13.2 or later, Node 20.19 or later). The 2.0 installer will automate this; until then, follow the template by hand

### Safe to update from template
- `specs/context_aware_ai_session_spec.md`
- `docs/spec-rationale.md`
- `templates/AGENTS_template.md`
- `templates/usercontext_template.instructions.md`
- `skills/*/SKILL.md`
- `skills/create-usercontext-instructions/references/quality-checklist.md`
- `README.md`
- `scripts/check-version-sync.sh`
- `scripts/test-check-version-sync.sh`
- `.github/workflows/version-sync.yml` (only if your instance publishes plugin manifests)
- `docs/plans/2.0-adoption-plan.md`
- `.claude-plugin/plugin.json`
- `.claude-plugin/marketplace.json`
- `.codex-plugin/plugin.json`

### Protect
- `docs/adr/` records the kit's own decisions; do not copy it over your instance's ADRs
- Your own `AGENTS.md` and user context files: re-stamp and extend them by hand, do not overwrite them

---

## [1.5.3] - 2026-10-25

### Fixed
- `README.md` Codex section no longer claims `repository-drift-control` is blocked from implicit invocation via `allow_implicit_invocation: false`; the `agents/openai.yaml` sidecars were removed in 1.4.2, so the text now says to invoke it explicitly and that Codex may still select it
- `prompts/loop/01-readiness-check.prompt.md` and `02-implementation.prompt.md` read ADRs from `docs/adr/` (matching the 2.0 plan decision), falling back to `docs/adrs/` so existing projects keep working
- `prompts/loop/04-learnings.prompt.md` no longer stops until five placeholders are hand-edited; it resolves stack, architecture, and background from the user context, `AGENTS.md`, and the session, and asks only for what remains unknown

### Changed
- Removed the repeated `## How to Invoke` block from all 11 `SKILL.md` files; the per-platform guidance already lives in the README under Invoking Skills, and the block cost context on every run
- `README.md` documents the Windows symlink caveat for `.agents/skills/`
- `docs/plans/2.0-adoption-plan.md`: stale "open decision" wording corrected and a status note added under Side findings
- Version bumped `1.5.2` → `1.5.3` (patch) in `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, and `.codex-plugin/plugin.json`. The spec stays at `1.5.0`; no normative rules changed

### Safe to update from template
- `skills/*/SKILL.md`
- `prompts/loop/01-readiness-check.prompt.md`
- `prompts/loop/02-implementation.prompt.md`
- `prompts/loop/04-learnings.prompt.md`
- `README.md`
- `docs/plans/2.0-adoption-plan.md`
- `.claude-plugin/plugin.json`
- `.claude-plugin/marketplace.json`
- `.codex-plugin/plugin.json`
- `CHANGELOG.md`

### Protect (never overwrite)
- Your personal `*_usercontext.instructions.md`
- Your project `AGENTS.md`
- Any custom skills, config overrides, or checkpoint files you have created

---

## [1.5.2] - 2026-10-25

### Removed
- **`time-awareness` skill** (`skills/time-awareness/`, including its `config/` and `references/`) and its `.agents/skills/time-awareness` symlink. It had no observable effect in normal chats, and current models ground date and time reasoning well without it
- `time-awareness` entries from `README.md` (skill list, skill table; plugin and Codex sections now state 11 skills) and the Runtime Guardrails section in `skills/README.md`
- `ack-time-awareness` row from the skill rename table in `docs/plans/2.0-adoption-plan.md`

### Changed
- Version bumped `1.5.1` → `1.5.2` (patch) in `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, and `.codex-plugin/plugin.json` so installed plugins pick up the removal. The spec stays at `1.5.0`; no normative rules changed

### Safe to update from template
- Delete `skills/time-awareness/` and `.agents/skills/time-awareness` from your instance if present
- `README.md`
- `skills/README.md`
- `.claude-plugin/plugin.json`
- `.claude-plugin/marketplace.json`
- `.codex-plugin/plugin.json`
- `CHANGELOG.md`

### Protect (never overwrite)
- Your personal `*_usercontext.instructions.md`
- Your project `AGENTS.md`
- Any custom skills, config overrides, or checkpoint files you have created

---

## [1.5.1] - 2026-09-06

### Fixed
- `time-awareness` skill, workflow step 3: corrected the config key reference back to `recheck.pacing.checkpoints` (it had regressed to the broader `recheck.pacing`, which doesn't itself list the checkpoints); matches `config/time-awareness.config.yaml` and `references/config-schema.md`
- `SKILL.validation.md` for `time-awareness/` updated to match

### Changed
- Bumped `time-awareness` skill `version` `1.0.0` → `1.0.1` (patch: workflow reference fix)
- Version bumped `1.5.0` → `1.5.1` (patch) so the fix is actually distributed: `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, and `.codex-plugin/plugin.json` all pin an explicit `version`, so Claude Code's plugin update mechanism only ships new content when that string changes — a content-only fix with no version bump would have been invisible to installed users

### Safe to update from template
- `skills/time-awareness/SKILL.md`
- `skills/time-awareness/SKILL.validation.md`
- `.claude-plugin/plugin.json`
- `.claude-plugin/marketplace.json`
- `.codex-plugin/plugin.json`
- `CHANGELOG.md`

### Protect (never overwrite)
- Your personal `*_usercontext.instructions.md`
- Your project `AGENTS.md`
- Any custom skills, config overrides, or checkpoint files you have created

---

## [1.5.0] - 2026-09-06

### Added
- **`time-awareness` skill** — always-on guardrail that grounds date, time-of-day, elapsed-time, and pacing statements in a real local clock reading instead of an estimate, covering time-of-day framing, time-budget drift, stale artifact timestamps, and day-of-week scheduling errors; local time only, no network time service
- `skills/time-awareness/references/config-schema.md` and a user-editable `skills/time-awareness/config/time-awareness.config.yaml` (time-of-day buckets, re-check cadence, trigger phrases)
- `SKILL.validation.md` for `time-awareness/` (PASS, 100/100)
- `.agents/skills/time-awareness` symlink for Codex repo-local discovery
- `skills/README.md` skill inventory expanded with a Runtime Guardrails section (and the previously missing Checkpoint Workflows entries)

### Changed
- Version bumped `1.4.3` → `1.5.0` (minor: new skill). Synced across spec, `docs/spec-rationale.md`, `AGENTS.md`, README, templates, sample artifacts, and all `spec_version` stamps in create/validate skills
- Realigned the three plugin manifests (`.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.codex-plugin/plugin.json`) to the shared version — they were left at `1.4.2` by the 1.4.3 doc patch
- README plugin and Codex sections now state 12 skills (was 11)
- `last_updated` set to 2026-09-06 in `specs/context_aware_ai_session_spec.md` and `docs/spec-rationale.md`
- Refreshed `AGENTS.validation.md` and `usercontexts/sample_usercontext.validation.md` to `spec_version` 1.5.0 (re-validated, still PASS 100/100) so no doc carries a stale version reference

### Safe to update from template
- `skills/time-awareness/` (new)
- `.agents/skills/` (one new symlink)
- `skills/README.md`
- `README.md`
- `AGENTS.md`
- `CHANGELOG.md`
- `specs/context_aware_ai_session_spec.md`
- `docs/spec-rationale.md`
- `templates/AGENTS_template.md`
- `templates/usercontext_template.instructions.md`
- `.claude-plugin/plugin.json`
- `.claude-plugin/marketplace.json`
- `.codex-plugin/plugin.json`
- `skills/create-agents-md/SKILL.md`
- `skills/create-project-instructions/SKILL.md`
- `skills/create-usercontext-instructions/SKILL.md`
- `skills/create-usercontext-instructions/references/quality-checklist.md`
- `skills/validate-agents-md/SKILL.md`
- `skills/validate-project-instructions/SKILL.md`
- `skills/validate-usercontext-instructions/SKILL.md`
- `AGENTS.validation.md`
- `usercontexts/sample_usercontext.validation.md`

### Protect (never overwrite)
- Your personal `*_usercontext.instructions.md`
- Your project `AGENTS.md`
- Any custom skills, config overrides, or checkpoint files you have created

---

## [1.4.3] - 2026-07-07

### Fixed
- Replaced all surviving `deterministic` phrasing (spec §4.1 footnote, §10.8 workflow table; README session state section) with `consistent and predictable` — aligns with the reduced-variance language established in v1.4.2
- Removed stale `agents/openai.yaml` sidecar claim from README Codex section (sidecars were deleted in v1.4.2 but the description was not updated)
- Corrected Copilot platform table row: Copilot Code Review does support `AGENTS.md`; removed incorrect caveat and expanded label to reflect full Copilot coverage
- Replaced `"Works seamlessly"` with honest cross-platform framing that matches the platform-variance caveat already present in the same section
- Added provenance note to `agentskills.io` link — clarifies it is a third-party community site, not a project-maintained resource
- Corrected `CLAUDE.md` / `.cursorrules` comparison: `"No layering"` was factually wrong (both support nested files); reframed around the actual gap — no personal/project separation that travels across tools
- Added deprecation callout to template repository section directing new users to the plugin instead

### Safe to update from template
- `specs/context_aware_ai_session_spec.md`
- `README.md`
- `templates/usercontext_template.instructions.md`
- `templates/AGENTS_template.md`
- `skills/create-agents-md/SKILL.md`
- `skills/create-project-instructions/SKILL.md`
- `skills/create-usercontext-instructions/SKILL.md`
- `skills/create-usercontext-instructions/references/quality-checklist.md`
- `skills/validate-agents-md/SKILL.md`
- `skills/validate-usercontext-instructions/SKILL.md`
- `skills/validate-project-instructions/SKILL.md`

### Protect (never overwrite)
- Your personal `*_usercontext.instructions.md`
- Your project `AGENTS.md`
- Any custom skills you have created

---

## [1.4.2] - 2026-05-12

### Added
- **`create-checkpoint` skill** — guided workflow to capture session state as a checkpoint artifact per spec section 4.4, with schema reference and `agents/openai.yaml` sidecar
- **`restore-checkpoint` skill** — guided workflow to load, validate, and restore a checkpoint artifact at session start per spec section 4.4 restore rules, with conflict resolution reference and `agents/openai.yaml` sidecar
- **`checkpoint: true` required field** — added to spec section 4.4.2 schema so checkpoint files are self-identifying; restore validation is now fully spec-backed
- AGENTS.md now references sections 4.4 (Cross-Session Persistence) and 4.5 (Context Compression) with explicit behavioral instructions for both
- Prompts and Codex symlinks added for both new skills
- `SKILL.validation.md` added to `create-checkpoint/` and `restore-checkpoint/` skill folders

### Safe to update from template
- `skills/create-checkpoint/` (new)
- `skills/restore-checkpoint/` (new)
- `.agents/skills/` (two new symlinks)
- `prompts/` (two new prompt files)
- `specs/context_aware_ai_session_spec.md`
- `AGENTS.md`
- `README.md`
- `CHANGELOG.md`

### Protect (never overwrite)
- Your personal `*_usercontext.instructions.md`
- Your project `AGENTS.md`
- Any custom skills or checkpoint files you have created

---

## [1.4.1] - 2026-05-11
- **Claude Code plugin** — `.claude-plugin/plugin.json` manifest makes the repo installable as a native Claude Code plugin; skills are auto-discovered from `skills/`
- **GitHub Copilot CLI plugin** — `.claude-plugin/marketplace.json` turns the repo into a self-hosted marketplace, enabling `copilot plugin marketplace add MSiccDev/ai-context-kit` install flow (Claude Code and Copilot CLI share the same plugin spec)
- **OpenAI Codex support** — `agents/openai.yaml` sidecar added to all 9 skill folders with UI display names, short descriptions, default prompts, and invocation policies for the Codex skill picker
- **`.agents/skills/` discovery directory** — adds a symlink for each skill folder into `.agents/skills/` so Codex auto-discovers skills from its standard path without duplicating content
- `version` and `allowed-tools` fields added to all 9 `skills/*/SKILL.md` frontmatter
- README install sections for Claude Code, GitHub Copilot CLI, and OpenAI Codex

### Safe to update from template
- `.claude-plugin/` (new directory)
- `.agents/` (new directory)
- `skills/` (all skill folders — updated frontmatter + new `agents/openai.yaml` in each)
- `templates/skill_template/SKILL.md`
- `README.md`
- `CHANGELOG.md`

### Protect (never overwrite)
- Your personal `*_usercontext.instructions.md`
- Your project `AGENTS.md`
- Any custom skills you have created

---

## [1.4.0] - 2026-05-08

### Added
- **Spec section 4.4 Cross-Session Persistence** — normative rules for checkpoint artifacts: proposal rules, required schema (project, role, phase, output_style, tone, interaction_mode, open_tasks, key_decisions, active_files, last_updated), and restore/conflict rules
- **Spec section 4.5 Context Compression** — normative rules for managing context window pressure: proposal rules, required compression checkpoint contents, and reversibility requirements
- `docs/spec-rationale.md`: new "Cross-Session Persistence and Context Compression" section with example checkpoint file, conflict resolution dialog, and annotated compression proposal dialog

### Changed
- Spec version bumped from 1.3.1 → 1.4.0 across spec, templates, skills, and all stamped artifacts
- Session Persistence and Context Compression promoted from "Future Enhancements" (rationale doc) to normative spec sections

### Safe to update from template
- `specs/context_aware_ai_session_spec.md`
- `docs/spec-rationale.md`
- `templates/usercontext_template.instructions.md`
- `templates/AGENTS_template.md`
- `templates/skill_template/SKILL.md`
- `skills/` (all skill folders)
- `prompts/` (all prompt files)
- `README.md`
- `CHANGELOG.md`

### Protect (never overwrite)
- Your personal `*_usercontext.instructions.md`
- Your project `AGENTS.md`
- Any custom skills you have created under `skills/`

---

## [1.3.1] - 2026-05-07

### Added
- `CHANGELOG.md` to track changes and simplify instance update workflow
- "See It In Action" before/after example section in README
- "Why This Over Alternatives?" comparison section in README
- Platform limitations column in the context loading table
- `## How to Invoke` section in all skill `SKILL.md` files with per-platform guidance
- Validation scope disclaimer in `AGENTS.validation.md`, `usercontexts/sample_usercontext.validation.md`, and README
- `spec_version` stamping in templates and enforced in create/validate skill workflows
- `docs/spec-rationale.md` companion document (rationale, examples, scenarios)
- Realistic illustrative sample user context (Jordan Kim persona)

### Changed
- "Determinism" principle renamed to "Reduced variance" throughout spec and README
- Validate skill Purpose/Constraints clarified to "structured checks based on a deterministic scoring rubric"
- Platform table: Copilot row updated to distinguish coding agent (AGENTS.md ✅) from Code Review (AGENTS.md ❌)
- Spec trimmed to normative rules only (426 lines); rationale and examples moved to `docs/spec-rationale.md`
- References auto-loading claim scoped to repo-aware environments only

### Safe to update from template
- `specs/context_aware_ai_session_spec.md`
- `templates/usercontext_template.instructions.md`
- `templates/AGENTS_template.md`
- `templates/skill_template/SKILL.md`
- `skills/` (all skill folders)
- `prompts/` (all prompt files)
- `README.md`
- `CHANGELOG.md`

### Protect (never overwrite)
- Your personal `*_usercontext.instructions.md`
- Your project `AGENTS.md`
- Any custom skills you have created under `skills/`

---

## [1.3.0] - 2025-12-23

### Added
- Initial skill ecosystem: create and validate workflows for user context, project instructions, AGENTS.md, and skills
- Repository drift-control skill
- Canonical templates for user context, AGENTS.md, and skill artifacts
- Session specification v1.3.0

### Safe to update from template
- All files except personal artifacts listed below

### Protect (never overwrite)
- Your personal `*_usercontext.instructions.md`
- Your project `AGENTS.md`
