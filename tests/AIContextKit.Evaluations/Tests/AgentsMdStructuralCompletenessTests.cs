using Microsoft.Extensions.AI;
using Microsoft.Extensions.AI.Evaluation;
using AIContextKit.Evaluations.Evaluators;

namespace AIContextKit.Evaluations.Tests;

public class AgentsMdStructuralCompletenessTests
{
    // Both paths are recorded to eval-results/ for the aieval report (see README "Evaluation
    // Reports") so the report shows a compliant and a non-compliant AGENTS.md side by side.
    [Fact]
    public async Task AgentsMd_ShouldHaveAllRequiredFields()
    {
        var agentsMd = await File.ReadAllTextAsync(AgentsMdStructuralCompletenessEvaluator.FindAgentsMdPath());

        var metric = await EvaluateCompletenessAsync(agentsMd, nameof(AgentsMd_ShouldHaveAllRequiredFields));

        Assert.True(metric.Value, metric.Reason);
    }

    [Fact]
    public async Task AgentsMd_ShouldFailWhenRequiredFieldIsMissing()
    {
        // A copy of the root AGENTS.md with the "## Purpose" section removed.
        var incompleteAgentsMd = await File.ReadAllTextAsync("TestData/agents-md/incomplete-example/AGENTS.md");

        var metric = await EvaluateCompletenessAsync(
            incompleteAgentsMd, nameof(AgentsMd_ShouldFailWhenRequiredFieldIsMissing));

        Assert.False(metric.Value);
        Assert.Contains(AgentsMdStructuralCompletenessEvaluator.RequiredFields[0], metric.Reason);
    }

    private static async Task<BooleanMetric> EvaluateCompletenessAsync(string agentsMdContent, string scenarioName)
    {
        await using var scenarioRun = await EvaluationHarness.CreateScenarioRunAsync(
            scenarioName: scenarioName,
            evaluators: [new AgentsMdStructuralCompletenessEvaluator()]);

        var messages = new[] { new ChatMessage(ChatRole.User, "Validate the AGENTS.md for this repository") };
        var response = new ChatResponse(new ChatMessage(ChatRole.Assistant, agentsMdContent));

        EvaluationResult result = await scenarioRun.EvaluateAsync(messages, response);

        return result.Get<BooleanMetric>(AgentsMdStructuralCompletenessEvaluator.MetricName);
    }
}
