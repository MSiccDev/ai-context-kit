namespace AIContextKit.Evaluations;

// The execution name shared by every reporting-backed evaluation test in this run. static readonly
// guarantees it is computed exactly once per process, so scenarios from different test classes land
// in the same execution bucket in eval-results/ instead of each DiskBasedReportingConfiguration.Create
// call picking its own timestamp. Millisecond resolution keeps two back-to-back runs from colliding.
public static class EvaluationExecution
{
    public static readonly string Name = DateTime.UtcNow.ToString("yyyyMMddTHHmmssfff");
}
