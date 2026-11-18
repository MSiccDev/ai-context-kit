# Routes: ack-guide

Kit skills are named `ack-*`. OpenSpec skills are installed by `openspec init` and named `openspec-*`; each tool also exposes them as commands (in Claude Code, `/opsx:explore`, `/opsx:propose` and so on).

## Main flow: build a change

| Step | Goal | Skill | Notes |
| --- | --- | --- | --- |
| 1 | Think through an idea before committing to it | `openspec-explore` | Optional |
| 2 | Turn the idea into an OpenSpec change (proposal, spec deltas, design, tasks) | `openspec-propose` | Ends when `openspec instructions apply` reports `ready` |
| 3 | Check readiness and pick the next task group | `ack-loop-01-readiness` | Start of every loop |
| 4 | Implement the task group | `ack-loop-02-implement` | Also fixes blocked review findings |
| 5 | Review on the Spec and Standards axes | `ack-loop-03-review` | |
| 6 | Learn from the step | `ack-loop-04-learnings` | Optional |
| 7 | Commit, and archive the change once all tasks are done and review is approved | `ack-loop-05-commit` | Repeat from step 3 while tasks remain |

## Setup

| Goal | Skill |
| --- | --- |
| Write your user context file | `ack-create-user-context` |
| Write or refresh a root or nested `AGENTS.md` | `ack-create-agents-md` |
| Set up OpenSpec in the repository | Run `openspec init` (spec section 11.1); then refresh `AGENTS.md` with `ack-create-agents-md` |

## Check quality

| Goal | Skill |
| --- | --- |
| Validate a user context file | `ack-validate-user-context` |
| Validate an `AGENTS.md` | `ack-validate-agents-md` |
| Validate an OpenSpec change | `openspec validate <id> --strict` (also part of `ack-loop-03-review`) |
| Check spec, templates, skills and docs for drift | `ack-drift-control` |

## Session

| Goal | Skill |
| --- | --- |
| See or change role, phase, style, tone or interaction mode | `ack-session` |
| Save the session before ending it | `ack-create-checkpoint` |
| Resume from a checkpoint | `ack-restore-checkpoint` |
| Decide what to do at a phase boundary | This skill, `references/phase-boundaries.md` |

## Extend the kit

| Goal | Skill |
| --- | --- |
| Write a new skill | `ack-create-skill` |
| Validate a skill | `ack-validate-skill` |
