import "server-only";

import { AI_LIMITS, AiError } from "@/lib/ai/errors";
import type { AiJsonRequest, AiJsonResponse, AiProvider } from "@/lib/ai/provider";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

type GeminiPart = { text?: string };
type GeminiPayload = {
  candidates?: Array<{
    content?: { parts?: GeminiPart[] };
  }>;
};

function readApiKey(): string {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) {
    throw new AiError("not_configured");
  }
  return key;
}

function throwForHttpStatus(status: number): never {
  if (status === 401 || status === 403) {
    throw new AiError("not_configured");
  }
  if (status === 429) {
    throw new AiError("rate_limited");
  }
  throw new AiError("provider_error");
}

export function createGeminiProvider(): AiProvider {
  return {
    id: "gemini",
    async generateJson(request: AiJsonRequest): Promise<AiJsonResponse> {
      const apiKey = readApiKey();
      let response: Response;
      try {
        response = await fetch(GEMINI_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          signal: request.signal,
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: request.systemPrompt }],
            },
            contents: [
              {
                role: "user",
                parts: [{ text: request.userPrompt }],
              },
            ],
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens:
                request.maxOutputTokens ?? AI_LIMITS.maxOutputTokens,
              responseMimeType: "application/json",
            },
          }),
        });
      } catch {
        if (request.signal?.aborted) {
          throw new AiError("timeout");
        }
        throw new AiError("provider_error");
      }

      if (!response.ok) {
        throwForHttpStatus(response.status);
      }

      let payload: GeminiPayload;
      try {
        payload = (await response.json()) as GeminiPayload;
      } catch {
        throw new AiError("invalid_response");
      }

      const text = payload.candidates?.[0]?.content?.parts
        ?.map((part) => part.text ?? "")
        .join("")
        .trim();

      if (!text) {
        throw new AiError("empty");
      }

      return { text, model: "gemini-2.0-flash" };
    },
  };
}
