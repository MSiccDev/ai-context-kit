using System.Globalization;
using Microsoft.Extensions.Configuration;

namespace AIContextKit.Evaluations;

// Ollama judge connection settings for SkillEvaluatorTests, read from configuration with no in-code
// fallbacks: user secrets for local dev, environment variables of the same name overriding for CI.
// A missing key fails fast with a message pointing at how to set it.
public sealed class OllamaJudgeSettings
{
    public const string EndpointKey = "OLLAMA_ENDPOINT";
    public const string ModelKey = "OLLAMA_MODEL";
    public const string TimeoutMinutesKey = "OLLAMA_TIMEOUT_MINUTES";

    public required Uri Endpoint { get; init; }
    public required string Model { get; init; }
    public required TimeSpan Timeout { get; init; }

    public static OllamaJudgeSettings FromConfiguration(IConfiguration configuration)
    {
        string endpoint = Required(configuration, EndpointKey);
        string model = Required(configuration, ModelKey);

        string timeoutRaw = Required(configuration, TimeoutMinutesKey);
        if (!double.TryParse(timeoutRaw, NumberStyles.Number, CultureInfo.InvariantCulture, out double timeoutMinutes))
        {
            throw new InvalidOperationException(
                $"Configuration '{TimeoutMinutesKey}' must be a number of minutes, but was '{timeoutRaw}'.");
        }

        return new OllamaJudgeSettings
        {
            Endpoint = new Uri(endpoint),
            Model = model,
            Timeout = TimeSpan.FromMinutes(timeoutMinutes),
        };
    }

    private static string Required(IConfiguration configuration, string key) =>
        configuration[key] ?? throw new InvalidOperationException(
            $"Missing configuration '{key}'. Set it via user secrets " +
            $"(dotnet user-secrets --project tests/AIContextKit.Evaluations set {key} <value>) " +
            "or an environment variable of the same name.");
}
