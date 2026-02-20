# Plans Directory Policy

## Scope
- All planning prompts and execution plans live in `plans/`.
- Do not store plans outside `plans/`.
- Plans are working artifacts and are not intended to be permanent records.

## Retention And Deletion
- Executed plans may be deleted after a retention period.
- Keep `executed_at` and `execution_ref` accurate before a plan is eligible for deletion.
- Open plans should not be deleted unless they are explicitly abandoned or replaced.
- Historical traceability should come from `execution_ref` targets (branch, commit, PR, or tag), not long-term storage in `plans/`.

## Plan File Format
Every `plans/*.prompt.md` file must start with YAML frontmatter.

Required fields:
- `description`: short summary of the plan
- `status`: `open` or `executed`

Required when `status: executed`:
- `executed_at`: execution completion date (`YYYY-MM-DD`)
- `execution_ref`: branch, commit hash, PR, or tag reference

Recommended format:

```yaml
---
description: "Short plan summary"
status: open
---
```

Executed format:

```yaml
---
description: "Short plan summary"
status: executed
executed_at: 2026-02-15
execution_ref: codex/adopt-agents-md-standard
---
```

## Detect Open vs Executed Plans
Run:

```bash
./plans/plan-status.sh
```

This prints grouped plan lists:
- `OPEN`
- `EXECUTED`
- `UNKNOWN` (missing/invalid `status`)
