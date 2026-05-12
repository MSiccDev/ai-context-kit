# Checkpoint Schema: create-checkpoint

Source: spec section 4.4.2.

## Required Fields

| Field | Type | Description |
|---|---|---|
| `checkpoint` | boolean | Always `true` — marks this file as a checkpoint artifact |
| `project` | string | Active project name |
| `role` | string | Active role at session end |
| `phase` | string | Active phase at session end |
| `output_style` | string | Active output style |
| `tone` | string | Active tone |
| `interaction_mode` | string or null | Active interaction mode; omit or set to `null` if not established |
| `open_tasks` | list of strings | In-progress tasks or confirmed next steps |
| `key_decisions` | list of strings | Material decisions made during the session |
| `active_files` | list of strings | File paths actively referenced this session |
| `last_updated` | ISO 8601 string | Timestamp of checkpoint creation |

Additional fields are permitted. Sensitive data must never be written to a checkpoint artifact.

## Example Artifact

```markdown
---
checkpoint: true
project: "my-app"
role: "Developer"
phase: "Implementation"
output_style: "concise"
tone: "technical"
interaction_mode: "pair"
open_tasks:
  - "Complete auth middleware"
  - "Write integration tests for /api/login"
key_decisions:
  - "Using JWT over session cookies for stateless auth"
  - "Token expiry set to 24h based on security review"
active_files:
  - "src/middleware/auth.ts"
  - "src/api/login.ts"
  - "tests/auth.test.ts"
last_updated: "2026-05-12T18:00:00Z"
---

# Session Checkpoint — 2026-05-12

Pausing mid-implementation of the auth flow. JWT middleware is stubbed but not yet wired to routes.
```

## Naming Convention

Suggested file name: `checkpoint-YYYY-MM-DD.md`

If multiple checkpoints exist for the same date, append a sequence: `checkpoint-2026-05-12-2.md`.

## Storage Rules

- Store outside the instruction layer — not inside `AGENTS.md` or user context files.
- A `checkpoints/` folder in the project root is a good default location.
- The exact path is the user's decision.
