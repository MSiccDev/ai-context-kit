# Time Awareness — Configuration Schema

This file documents the fields in `config/time-awareness.config.yaml`. Edit the config file to change behavior — `SKILL.md` should not need to change per project.

If a project has no config file, the skill uses the defaults listed below (identical to the shipped `time-awareness.config.yaml`).

## `time_of_day_buckets`
Maps a label to a 24h time range, used to classify the current reading for greetings and framing (e.g. avoiding "good evening" at lunchtime).

| Field | Type | Default |
|---|---|---|
| `morning` | `"HH:MM-HH:MM"` | `"05:00-11:59"` |
| `afternoon` | `"HH:MM-HH:MM"` | `"12:00-16:59"` |
| `evening` | `"HH:MM-HH:MM"` | `"17:00-21:59"` |
| `night` | `"HH:MM-HH:MM"` | `"22:00-04:59"` |

Ranges are evaluated in local time. Adjust for personal routine (e.g. someone with an early start might move `morning` earlier).

## `recheck.pacing`
Governs re-checks when the user states a time budget for the session.

| Field | Type | Default | Meaning |
|---|---|---|---|
| `trigger_phrases` | list of strings | see below | Phrases that signal a stated time budget. |
| `checkpoints` | list of strings | `["midpoint", "5_minutes_before_end", "at_end"]` | When to re-check the real clock during the budget. |

Default `trigger_phrases`:
```
- "we have {N} minutes"
- "let's time-box this"
- "{N}-minute session"
- "quick {N} minutes"
```
`{N}` matches any stated duration. Add project- or language-specific phrasing as needed (this skill is otherwise language-agnostic, but phrase matching is literal).

## `recheck.long_session`
Governs re-checks in sessions with no stated budget, so elapsed-time judgments (checkpoint suggestions, "we've been at this a while") stay grounded.

| Field | Type | Default |
|---|---|---|
| `interval_minutes` | integer | `30` |
| `trigger` | string | `"idle_interval"` (re-check every `interval_minutes` of real elapsed time, regardless of turn count) |

## `recheck.checkpoint_artifacts`
Governs re-checks before writing a date/timestamp into a generated artifact (checkpoint files, changelog/ADR entries, commit-style notes).

| Field | Type | Default |
|---|---|---|
| `trigger_phrases` | list of strings | `["checkpoint", "save session", "create-checkpoint", "changelog entry", "log this decision"]` |
| `always_recheck` | boolean | `true` — always take a fresh reading rather than reusing one from earlier in the session |

## `recheck.scheduling`
Governs re-checks for date-dependent scheduling logic (spaced repetition, weekly planning, deadline countdowns).

| Field | Type | Default |
|---|---|---|
| `trigger` | string | `"session_crosses_midnight_or_new_topic"` |
| `always_recheck` | boolean | `true` |

## Notes on editing
- This file is the intended customization surface. `SKILL.md` describes *behavior*; this file describes *when and how sensitive* that behavior is for a given project or person.
- Keep `trigger_phrases` lowercase and simple — they are matched loosely against user phrasing, not treated as regex.
- If a field is omitted from a project's config file, the default above applies.