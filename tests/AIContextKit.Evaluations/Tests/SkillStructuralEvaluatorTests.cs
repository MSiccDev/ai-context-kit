using Microsoft.Extensions.AI.Evaluation;
using AIContextKit.Evaluations.Evaluators;

namespace AIContextKit.Evaluations.Tests;

// Isolated, offline tests of SkillStructuralEvaluator's regex/string logic alone --
// no ChatConfiguration, no Ollama. This is the fast counterpart to SkillEvaluatorTests,
// which exercises the same fixtures through the full structural+quality pipeline and
// requires a local judge model. Exercising Phase 4 here (and not only combined with the
// LLM judge) is what would have caught the bare-URL detection bug immediately instead
// of it being silently masked by SkillQualityEvaluator's independent Phase 5 check.
public class SkillStructuralEvaluatorTests
{
    [Fact]
    public async Task WellFormedSkill_ScoresFullStructuralMarks()
    {
        var metric = await EvaluateStructuralAsync("TestData/skills/well-formed-example/SKILL.md", "well-formed-example");

        Assert.Equal(1.0, metric.Value); // exact: full marks, 60/60
        Assert.Equal("All structural checks passed.", metric.Interpretation?.Reason);
    }

    [Fact]
    public async Task WellFormedSkill_WithoutFolderContext_PassesCleanlyWithInformationalNote()
    {
        var metric = await EvaluateStructuralAsync(
            "TestData/skills/well-formed-example/SKILL.md", "well-formed-example", withFolderContext: false);

        // Parity can't be checked without a SkillFolderContext, but that's a note, not a finding:
        // the skill still scores full marks and reports clean.
        Assert.Equal(1.0, metric.Value);
        Assert.Equal("All structural checks passed.", metric.Interpretation?.Reason);
        Assert.NotNull(metric.Diagnostics);
        Assert.Contains(metric.Diagnostics!, d =>
            d.Severity == EvaluationDiagnosticSeverity.Informational &&
            d.Message.Contains("folder-name parity not checked"));
    }

    [Fact]
    public async Task MalformedSkill_FlagsNamingAndExternalReferenceIssues()
    {
        var metric = await EvaluateStructuralAsync("TestData/skills/malformed-example/SKILL.md", "malformed-example");

        // Expected earned points, out of ScoringRubric.StructuralPoints — update if a phase budget
        // or deduction changes: Phase 1 20/20 (frontmatter + name + description all present),
        // Phase 2 0/25 (kebab-case violation, folder-name mismatch, description too short),
        // Phase 4 9/15 (two bare-URL external references, -3 each).
        Assert.Equal(29.0 / ScoringRubric.StructuralPoints, metric.Value.GetValueOrDefault(), precision: 4);

        string reason = metric.Interpretation?.Reason ?? string.Empty;
        Assert.Contains("does not follow kebab-case convention", reason);
        Assert.Contains("does not match folder name", reason);
        Assert.Contains("description is too short", reason);
        Assert.Contains("external reference found: https://example.com/docs", reason);
        Assert.Contains("external reference found: http://another-example.org/reference", reason);
    }

    private static async Task<NumericMetric> EvaluateStructuralAsync(
        string skillPath, string folderName, bool withFolderContext = true)
    {
        var evaluator = new SkillStructuralEvaluator();
        var (messages, response, context) = await EvaluationInputs.ForSkillAsync(skillPath, folderName);

        EvaluationResult result = await evaluator.EvaluateAsync(
            messages, response, additionalContext: withFolderContext ? context : null);

        return result.Get<NumericMetric>(SkillStructuralEvaluator.MetricName);
    }
}
