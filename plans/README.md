# Plans Directory Policy

## Scope
- All planning prompts and execution plans live in `plans/`.
- Do not store plans under `.github/` or other directories.

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
