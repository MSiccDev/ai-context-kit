# Method: ack-interview

## Facts versus decisions
- **Fact:** anything the repository, user context, `AGENTS.md`, OpenSpec state or session already answers (paths, stack, test commands, existing roles, active change). Look it up and state where it came from.
- **Decision:** a choice with more than one reasonable answer that only the user can make (scope, priorities, naming, trade-offs, defaults).
- When unsure, look first; ask only if the lookup is inconclusive, and say what you found.

## The frontier
- A decision is on the frontier when every decision it depends on is settled.
- Ask only about the frontier. Asking about later decisions first wastes questions, because their options change once the earlier ones are settled.

## Question format
Each question:
1. names the decision in one line;
2. gives a **recommended answer** and one sentence on why;
3. lists the main alternatives, briefly;
4. says what changes depending on the answer, when that is not obvious.

Keep a round to the questions that are on the frontier, usually one to four. One decision per question.

## Done criteria
The interview is done only when:
- every required item is settled, looked up, or explicitly deferred by the user;
- the summary lists each decision with its value and source;
- no question is still waiting for an answer.

## Anti-patterns
- Asking for facts the assistant could look up.
- Questions without a recommended answer.
- Compound questions that bundle several decisions.
- Asking about decisions whose prerequisites are still open.
- Stopping while items are still open, or treating silence as agreement.
