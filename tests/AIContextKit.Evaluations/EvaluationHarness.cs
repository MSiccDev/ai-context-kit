using Microsoft.Extensions.AI.Evaluation;
using Microsoft.Extensions.AI.Evaluation.Reporting;
using Microsoft.Extensions.AI.Evaluation.Reporting.Storage;

namespace AIContextKit.Evaluations;

// Shared setup for the reporting-backed evaluation tests: the on-disk results location and the
// DiskBasedReportingConfiguration + scenario-run wiring that was otherwise copy-pasted into every
// such test class. All runs land in the same execution bucket via EvaluationExecution.Name.
public static class EvaluationHarness
{
    public static readonly string StorageRootPath =
        Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "eval-results");

    public static ValueTask<ScenarioRun> CreateScenarioRunAsync(
        string scenarioName,
        IEnumerable<IEvaluator> evaluators,
        ChatConfiguration? chatConfiguration = null)
    {
        var reportingConfiguration = DiskBasedReportingConfiguration.Create(
            storageRootPath: StorageRootPath,
            evaluators: evaluators,
            chatConfiguration: chatConfiguration,
            executionName: EvaluationExecution.Name,
            enableResponseCaching: false);

        return reportingConfiguration.CreateScenarioRunAsync(scenarioName: scenarioName);
    }
}
