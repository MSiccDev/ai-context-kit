// The execution name shared by every reporting-backed evaluation test in this run, computed once so
// scenarios from different test classes land in the same execution bucket in eval-results/ instead of
// each DiskBasedReportingConfiguration.Create call picking its own timestamp independently.
public static class EvaluationExecution
{
    public static readonly string Name = DateTime.UtcNow.ToString("yyyyMMddTHHmmss");
}
