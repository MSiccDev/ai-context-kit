# Cycle Rules: ack-tdd

## Seams
- A seam is a place where behavior can be observed and tested without reaching into internals: a public function, an API endpoint, a command, a message, a UI action.
- Seams are agreed with the user before any test. They are architecture decisions in miniature: changing them later means rewriting tests.
- Prefer the fewest seams that make the behavior observable.

## One cycle
| Step | Done when |
| --- | --- |
| Red | One new test fails, and the failure message shows it fails for the expected reason |
| Green | The new test and every existing test pass, with the smallest code change that achieves it |
| Refactor | Names and structure are clean, and every test still passes |

## Slices
- A slice is one visible piece of behavior, built through every layer it needs.
- Work vertically: a thin end-to-end slice first, then the next. Do not build one layer fully before the next.

## Anti-patterns
- **Implementation-coupled tests:** tests that assert on private details, call order or internal structure, so they break on a refactor that keeps behavior the same.
- **Tautological tests:** tests that restate the implementation (for example, mocking the unit under test, or computing the expected value with the same code) and so cannot fail for a real bug.
- **Horizontal slicing:** building or testing one layer at a time instead of one behavior at a time.
- **Green first:** writing code before seeing the test fail, which hides tests that could never fail.
- **Batching:** writing many tests before any code.
