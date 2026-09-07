using System.Globalization;
using Microsoft.Extensions.Configuration;

namespace AIContextKit.Evaluations;

// LM Studio judge connection settings, read from configuration with no in-code fallbacks. A missing or
// malformed key fails fast with a message naming it. LM Studio exposes an OpenAI-compatible API, so the
// endpoint points at its "/v1" base and the API key is the placeholder LM Studio itself accepts.
public sealed class LmStudioJudgeSettings
{
    public const string EndpointKey = "LMSTUDIO_ENDPOINT";
    public const string ModelKey = "LMSTUDIO_MODEL";
    public const string TimeoutMinutesKey = "LMSTUDIO_TIMEOUT_MINUTES";

    // LM Studio's local server ignores the API key but the OpenAI client requires a non-empty credential.
    public const string ApiKey = "lm-studio";

    public required Uri Endpoint { get; init; }
    public required string Model { get; init; }
    public required TimeSpan Timeout { get; init; }

    public static LmStudioJudgeSettings FromConfiguration(IConfiguration configuration)
    {
        string endpoint = Required(configuration, EndpointKey);
        string model = Required(configuration, ModelKey);

        string timeoutRaw = Required(configuration, TimeoutMinutesKey);
        if (!double.TryParse(timeoutRaw, NumberStyles.Number, CultureInfo.InvariantCulture, out double timeoutMinutes))
        {
            throw new InvalidOperationException(
                $"Configuration '{TimeoutMinutesKey}' must be a number of minutes, but was '{timeoutRaw}'.");
        }

        return new LmStudioJudgeSettings
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
