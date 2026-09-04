using Microsoft.Extensions.AI.Evaluation;

namespace AIContextKit.Evaluations.Evaluators;

/// <summary>
/// Carries the skill's containing folder name for Phase 2's folder-name parity check,
/// passed to the evaluator via additionalContext.
/// </summary>
public sealed class SkillFolderContext(string folderName) : EvaluationContext(nameof(SkillFolderContext), folderName)
{
    public string FolderName { get; } = folderName;
}
