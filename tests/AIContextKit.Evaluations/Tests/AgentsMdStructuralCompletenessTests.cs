using Microsoft.Extensions.AI;
using Microsoft.Extensions.AI.Evaluation;
using AIContextKit.Evaluations.Evaluators;

namespace AIContextKit.Evaluations.Tests;

public class AgentsMdStructuralCompletenessTests
{
    // The positive path is recorded to eval-results/ for the aieval report (see README "Evaluation
    // Reports"); the negative path is a plain evaluator call, no need to record an expected failure.
    [Fact]
    public async Task AgentsMd_ShouldHaveAllRequiredFields()
    {
        await using var scenarioRun = await EvaluationHarness.CreateScenarioRunAsync(
            scenarioName: nameof(AgentsMd_ShouldHaveAllRequiredFields),
            evaluators: [new AgentsMdStructuralCompletenessEvaluator()]);

        var agentsMd = await File.ReadAllTextAsync(AgentsMdStructuralCompletenessEvaluator.FindAgentsMdPath());
        var messages = new List<ChatMessage> { new(ChatRole.User, "Validate the AGENTS.md for this repository") };
        var modelResponse = new ChatResponse(new ChatMessage(ChatRole.Assistant, agentsMd));

        var result = await scenarioRun.EvaluateAsync(messages, modelResponse);

        var metric = result.Get<BooleanMetric>(AgentsMdStructuralCompletenessEvaluator.MetricName);
        Assert.True(metric.Value, metric.Reason);
    }

    [Fact]
    public async Task AgentsMd_ShouldFailWhenRequiredFieldIsMissing()
    {
        // A copy of the root AGENTS.md with the "## Purpose" section removed.
        var incompleteAgentsMd = await File.ReadAllTextAsync("TestData/agents-md/incomplete-example/AGENTS.md");

        var metric = await EvaluateCompletenessAsync(incompleteAgentsMd);

        Assert.False(metric.Value);
        Assert.Contains(AgentsMdStructuralCompletenessEvaluator.RequiredFields[0], metric.Reason);
    }

    private static async Task<BooleanMetric> EvaluateCompletenessAsync(string agentsMdContent)
    {
        IEvaluator evaluator = new AgentsMdStructuralCompletenessEvaluator();
        var messages = new[] { new ChatMessage(ChatRole.User, "Validate the AGENTS.md for this repository") };
        var response = new ChatResponse(new ChatMessage(ChatRole.Assistant, agentsMdContent));

        EvaluationResult result = await evaluator.EvaluateAsync(messages, response);

        return result.Get<BooleanMetric>(AgentsMdStructuralCompletenessEvaluator.MetricName);
    }
}
