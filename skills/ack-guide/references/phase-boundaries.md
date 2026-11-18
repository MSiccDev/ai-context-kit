# Phase Boundaries: ack-guide

At a phase boundary, or when context pressure builds, walk these options in order and recommend the first that fits (spec section 4.5.4).

| Order | Option | Fits when | How |
| --- | --- | --- | --- |
| 1 | **Continue** | The current context is still relevant and there is room left | Carry on; no confirmation needed |
| 2 | **Clear** | The finished work's detail is no longer needed | Start a fresh session; `AGENTS.md` and user context reload the instructions and defaults |
| 3 | **Handoff** | The work continues in another session, tool or with a colleague | `ack-create-checkpoint`, then `ack-restore-checkpoint` where the work resumes |
| 4 | **Subagent** | A self-contained sub-task would flood the current context | Delegate it where the tool supports sub-agents, and keep only its result |
| 5 | **Compact** | None of the above fits | Propose compression under spec sections 4.5.1 to 4.5.3; offer a checkpoint first |

## Rules
- Say why each earlier option did not fit before recommending a later one.
- Every option except Continue needs the user's confirmation.
- Compact is last because it is the only option that loses context irreversibly.
