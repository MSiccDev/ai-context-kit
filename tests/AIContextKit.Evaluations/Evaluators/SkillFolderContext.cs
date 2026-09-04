using Microsoft.Extensions.AI.Evaluation;

namespace AIContextKit.Evaluations.Evaluators;

/// <summary>
/// Context carrying the skill's containing folder name, needed for the
/// folder-name parity check in Phase 2. This is exactly the pattern
/// GroundednessEvaluator uses for its grounding text — extra context
/// beyond the response, passed in via additionalContext.
/// </summary>
public sealed class SkillFolderContext(string folderName) : EvaluationContext(nameof(SkillFolderContext), folderName)
{
    public string FolderName { get; } = folderName;
}
