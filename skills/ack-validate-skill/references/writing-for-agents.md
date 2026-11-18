# Writing For Agents: Checks

Checks for any document an agent reads: a skill, an `AGENTS.md`, or a reference reached from one. Adapted from Matt Pocock's writing-for-agents skill (MIT, see `../../../THIRD_PARTY_NOTICES.md`).

## Description as pointer
A skill's `description` is a pointer: the always-loaded line that decides when the skill is reached.
- **Model-invoked:** say what the skill does, then list each distinct trigger ("Use when …"). Put the leading word first. One trigger per case; synonyms for the same case count as one.
- **User-invoked:** a one-line summary for the person who types the name. A trigger list is optional.
- The same applies to a line in `AGENTS.md` that names another document: it says what the document is and when to read it.

## Completion criterion per step
Every workflow step ends on a condition that tells the agent it is done: an artifact written, a decision recorded, a check result, or a named stop. "Run discovery" or "Apply the rules" has none; "Discovery is done when every phase has an answer or a recorded default" has one.
- A step that only points to a reference passes when that reference states the done condition.
- Prefer exhaustive criteria ("every phase", "each finding") over open ones ("produce a list").

## No-ops
A no-op is a sentence the model already follows by default ("be careful", "ensure quality", "write clearly"). Delete the whole sentence. A word too weak to change behavior is also a no-op; replace it with a stronger one rather than adding a sentence.

## Sediment and duplication
- Every line still bears on what the document does. Lines about removed files, retired commands or past versions are sediment.
- Each rule has one home. Restating it elsewhere is duplication; point to the home instead. Two exceptions: a hard guardrail may appear once in the step where it applies and once in `Constraints And Safety`, and a checklist item that verifies a rule is not a second home. A `description` that summarises `When To Use` is not duplication.
- Do not copy what a file, a config or `--help` already says unless finding it is expensive.

## Positive instructions
State the target behavior. A prohibition alone makes the forbidden behavior more likely; keep one only as a hard guardrail and pair it with what to do instead. Scope boundaries in `When To Use` ("Do not use this skill for …, use … instead") are exempt.

## Severity
All findings here are warnings or enhancements, never critical.
| Check | Severity |
| --- | --- |
| Model-invoked description without triggers | Warning |
| Workflow step without a completion criterion | Warning |
| No-op, sediment or duplicated rule | Warning |
| Bare prohibition without a positive target | Enhancement |
