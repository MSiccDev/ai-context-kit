using Microsoft.Extensions.AI;
using Microsoft.Extensions.AI.Evaluation;
using Microsoft.Extensions.AI.Evaluation.Reporting.Storage;

namespace AIContextKit.Evaluations;

public class AgentsMdStructuralCompletenessTests
{
    private static readonly string StorageRootPath = Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "eval-results");

    [Fact]
    public async Task AgentsMd_ShouldHaveAllRequiredFields()
    {
        var reportingConfiguration = DiskBasedReportingConfiguration.Create(
            storageRootPath: StorageRootPath,
            evaluators: [new AgentsMdStructuralCompletenessEvaluator()],
            enableResponseCaching: false);

        await using var scenarioRun = await reportingConfiguration.CreateScenarioRunAsync(
            scenarioName: nameof(AgentsMd_ShouldHaveAllRequiredFields));

        var agentsMd = File.ReadAllText(AgentsMdStructuralCompletenessEvaluator.FindAgentsMdPath());
        var messages = new List<ChatMessage> { new(ChatRole.User, "Generate an AGENTS.md for this repository") };
        var modelResponse = new ChatResponse(new ChatMessage(ChatRole.Assistant, agentsMd));

        var result = await scenarioRun.EvaluateAsync(messages, modelResponse);

        var metric = result.Get<BooleanMetric>(AgentsMdStructuralCompletenessEvaluator.MetricName);
        Assert.True(metric.Value, metric.Reason);
    }

    [Fact]
    public void AgentsMd_ShouldFailWhenRequiredFieldIsMissing()
    {
        // An incomplete document that omits the first required field entirely.
        var incompleteAgentsMd = string.Join("\n\n", AgentsMdStructuralCompletenessEvaluator.RequiredFields.Skip(1));

        var metric = AgentsMdStructuralCompletenessEvaluator.Evaluate(incompleteAgentsMd);

        Assert.False(metric.Value);
        Assert.Contains(AgentsMdStructuralCompletenessEvaluator.RequiredFields[0], metric.Reason);
    }
}
