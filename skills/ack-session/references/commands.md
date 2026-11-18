# Commands: ack-session

`ack-session <command> [value]`. One command per call.

| Command | Value | Effect |
| --- | --- | --- |
| `context` | — | Show the active state: Project, Role, Phase, Output Style, Tone, Interaction Mode |
| `mode` | A role from the project `AGENTS.md` Role Definitions (for example `architect`, `developer`, `reviewer`) | Set Role |
| `phase` | `planning`, `implementation`, `debugging`, `review`, or a phase the project defines | Set Phase |
| `style` | `structured`, `step-by-step`, `minimal`, `annotated`, `detailed`, or a style the project defines | Set Output Style |
| `tone` | `direct`, `formal`, `encouraging`, `neutral`, `technical`, `concise`, or a tone the project defines | Set Tone |
| `interact` | `advisory`, `pair`, `driver` | Set Interaction Mode |
| `reset` | — | Restore all five changeable elements to the project's Default State |

## Matching values
- Match case-insensitively. Accept an unambiguous prefix (`impl` for `implementation`).
- When a value matches nothing, list the valid values and change nothing.
- When a value matches more than one option, ask which one is meant.

## Phase and the spec-driven workflow
Setting `phase implementation` does not bypass the implementation gate (spec section 11.2). Implementation still starts only against an apply-ready OpenSpec change, through `ack-loop-01-readiness`.

## Examples
- `ack-session context`
- `ack-session mode reviewer`
- `ack-session phase review`
- `ack-session interact pair`
- `ack-session reset`
