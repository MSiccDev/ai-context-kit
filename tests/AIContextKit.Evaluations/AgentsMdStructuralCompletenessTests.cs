using Microsoft.Extensions.AI;
using Microsoft.Extensions.AI.Evaluation;
using AIContextKit.Evaluations.Evaluators;

namespace AIContextKit.Evaluations.Tests;

public class AgentsMdStructuralCompletenessTests
{
    [Fact]
    public async Task AgentsMd_ShouldHaveAllRequiredFields()
    {
        await using var scenarioRun = await EvaluationHarness.CreateScenarioRunAsync(
            scenarioName: nameof(AgentsMd_ShouldHaveAllRequiredFields),
            evaluators: [new AgentsMdStructuralCompletenessEvaluator()]);

        var agentsMd = File.ReadAllText(AgentsMdStructuralCompletenessEvaluator.FindAgentsMdPath());
        var messages = new List<ChatMessage> { new(ChatRole.User, "Validate the AGENTS.md for this repository") };
        var modelResponse = new ChatResponse(new ChatMessage(ChatRole.Assistant, agentsMd));

        var result = await scenarioRun.EvaluateAsync(messages, modelResponse);

        var metric = result.Get<BooleanMetric>(AgentsMdStructuralCompletenessEvaluator.MetricName);
        Assert.True(metric.Value, metric.Reason);
    }

    [Fact]
    public void AgentsMd_ShouldFailWhenRequiredFieldIsMissing()
    {
        // A realistic AGENTS.md — same repository content as the root file — with the
        // "## Purpose" section actually removed, rather than a synthetic list of headings.
        var incompleteAgentsMd = File.ReadAllText("TestData/agents-md/incomplete-example/AGENTS.md");

        var metric = AgentsMdStructuralCompletenessEvaluator.Evaluate(incompleteAgentsMd);

        Assert.False(metric.Value);
        Assert.Contains(AgentsMdStructuralCompletenessEvaluator.RequiredFields[0], metric.Reason);
    }
}
