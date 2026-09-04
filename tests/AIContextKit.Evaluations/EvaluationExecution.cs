namespace AIContextKit.Evaluations;

// One execution name per test run, so scenarios from every reporting-backed test class land in the
// same eval-results/ bucket. Millisecond resolution avoids collisions between back-to-back runs.
public static class EvaluationExecution
{
    public static readonly string Name = DateTime.UtcNow.ToString("yyyyMMddTHHmmssfff");
}
