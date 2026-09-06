---
name: "time-awareness"
description: "Always-on guardrail that grounds date, time-of-day, elapsed-time, and pacing statements in a real local clock reading instead of an estimate. Use whenever the session references the current time, a stated time budget, session duration, a date-dependent schedule, or a timestamp written into an artifact. Do not use this to fetch time from a network service — local time only."
version: "1.0.0"
allowed-tools: [Read]
---

# Time Awareness

## Purpose
Prevent date/time errors that come from the model estimating the current time, elapsed session time, or day of week from conversation content instead of checking a real clock. Covers four recurring failure modes: wrong time-of-day framing (e.g. saying "evening" at lunchtime), drifting off a stated time budget, stale or guessed timestamps on generated artifacts, and day-of-week errors in date-dependent scheduling.

## When To Use
- The session references the current date, time, day of week, or time-of-day (greetings, "today is...", scheduling logic).
- The user states a time budget for the session ("we have 15 minutes", "let's time-box this to...").
- A long-running session needs a periodic sense of how much time has elapsed.
- An artifact being generated needs a real timestamp (checkpoint files, changelog entries, ADRs, commit-style notes).
- Session-relative time arithmetic is required ("remind me in 10 minutes", "is this overdue", "how long until X").
- Do not use this to reach out to a network time service (NTP, web-based clock APIs, MCP time servers) — time must come from a local source only, so it stays correct even offline and without extra setup.

## Required Inputs
- A local method for reading the current time, available in the active environment — for example a POSIX shell `date` call, PowerShell `Get-Date`, an IDE/runtime clock API, or another OS-level timestamp function. The skill does not assume which one is available or which OS the session runs on — see Workflow step 1.
- The configuration file at `config/time-awareness.config.yaml` (or the project's copy of it), if present. Fall back to the defaults in `references/config-schema.md` when no config file exists.

## Workflow
1. **Get real time, don't estimate it.** Before making any claim covered by "When To Use," obtain the current local timestamp via whatever local mechanism the environment exposes — a POSIX shell `date` call, PowerShell's `Get-Date`, a runtime/IDE clock function, or equivalent. Pick whichever is native to the current OS and tool surface; don't assume a Unix-like shell is available. Never infer the time from conversation length, message count, or training data. If no local time source is reachable in the environment, say so explicitly instead of guessing.
2. **Classify time-of-day and day-of-week from the reading**, using the buckets defined in the config file (`time_of_day_buckets`) — not from assumptions about "typical" working hours.
3. **On a stated time budget**, record the real start timestamp, compute the real end timestamp, and re-check the real clock at the checkpoints defined in the config (`recheck.pacing`) rather than tracking progress by turn count. Surface remaining time plainly at each checkpoint (e.g. "we're at the halfway point" / "about 3 minutes left") instead of silently deciding to wrap up or continue.
4. **In a long, undated session**, re-check the clock at the interval defined in `recheck.long_session` and use elapsed real time — not turn count — to judge whether a checkpoint, summary, or break is due.
5. **When generating any artifact that carries a date or timestamp** (checkpoint files, changelog/ADR entries, commit-style messages), use the value from step 1, not an inferred or previous value. Re-check the clock if the session has run long enough to plausibly cross midnight.
6. **For date-dependent scheduling logic** (spaced-repetition intervals, weekly planning, deadline countdowns), derive "today" and day-of-week from step 1's reading, every time — never reuse a value cached earlier in a long session without a fresh check if a new day may have started.
7. **For session-relative arithmetic** ("in 10 minutes", "how long since..."), compute from two real readings (then and now), never from an estimate of how much conversation has happened in between.

## Output Expectations
- Any statement of the current date, day, or time-of-day is grounded in a real reading from this session, not inferred.
- Pacing and elapsed-time statements ("halfway through", "X minutes left", "we've been at this for Y") are backed by two real timestamps, not turn-count heuristics.
- Generated artifacts that include a date/timestamp use the real value obtained in Workflow step 1.
- If no local time source is available, the response says so plainly instead of presenting a guess as fact.

## Resources
- `references/config-schema.md` — field definitions and default values for the configuration file.
- `config/time-awareness.config.yaml` — the user-editable configuration file (trigger phrases, checkpoint cadence, time-of-day buckets). This file is the intended point of customization — do not ask the user to edit `SKILL.md` itself to change behavior.

## Constraints And Safety
- Local time source only. Never call a network time service (NTP, web API, MCP time server) to satisfy this skill — the point is a dependency-free, always-correct local reading.
- This skill only reads the configuration file; it never writes to it. Configuration changes are the user's action, not this skill's.
- Never present an estimated or remembered time as if it were a fresh reading — if step 1 wasn't performed for the current claim, don't make the claim.
- Keep instructions provider- and OS-neutral: describe the *capability* needed (a local clock reading) rather than a specific tool call or shell, since the exact mechanism differs by environment and operating system (e.g. `date` on macOS/Linux vs. `Get-Date` on Windows/PowerShell).