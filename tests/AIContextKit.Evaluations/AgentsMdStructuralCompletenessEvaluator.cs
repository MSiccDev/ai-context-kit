using Microsoft.Extensions.AI;
using Microsoft.Extensions.AI.Evaluation;

public class AgentsMdStructuralCompletenessEvaluator : IEvaluator
{
    public const string MetricName = "StructuralCompleteness";
    public IReadOnlyCollection<string> EvaluationMetricNames => [MetricName];

    public static readonly IReadOnlyList<string> RequiredFields = new List<string>
    {
        "## Purpose",
        "## Source Of Truth And Precedence",
        "## Repository Map",
        "## Scope And Precedence For AGENTS.md Files",
        "## Session-State Contract",
        "## Command Namespace Policy",
        "## Repository Project Context",
        "## Formatting And Path Stability Rules",
        "## Update And Drift-Control Rule",
        "## Key References"
    };

    ValueTask<EvaluationResult> IEvaluator.EvaluateAsync(
        IEnumerable<ChatMessage> messages,
        ChatResponse modelResponse,
        ChatConfiguration? chatConfiguration,
        IEnumerable<EvaluationContext>? additionalContext,
        CancellationToken cancellationToken)
    {
        var agentsMd = File.ReadAllText(FindAgentsMdPath());

        return ValueTask.FromResult(new EvaluationResult(Evaluate(agentsMd)));
    }

    public static BooleanMetric Evaluate(string agentsMd)
    {
        var missingFields = RequiredFields.Where(field => !agentsMd.Contains(field)).ToList();

        var reason = missingFields.Count == 0
            ? "All required fields are present in AGENTS.md."
            : $"{missingFields.Count} required field(s) missing from AGENTS.md: {string.Join(", ", missingFields)}";

        return new BooleanMetric(MetricName, value: missingFields.Count == 0, reason: reason);
    }

    public static string FindAgentsMdPath()
    {
        var directory = new DirectoryInfo(AppContext.BaseDirectory);

        while (directory is not null)
        {
            var candidate = Path.Combine(directory.FullName, "AGENTS.md");
            if (File.Exists(candidate))
            {
                return candidate;
            }

            directory = directory.Parent;
        }

        throw new FileNotFoundException("Could not locate AGENTS.md in any parent directory of the test output.");
    }
}
