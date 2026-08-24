import "server-only";

import type { ZodType } from "zod";
import { getAiProvider, isAiConfigured } from "@/lib/ai/client";
import {
  AI_LIMITS,
  AiError,
  toAiFailure,
  type AiResult,
} from "@/lib/ai/errors";
import {
  jsonOnlyInstruction,
  SAFETY_SYSTEM_PROMPT,
} from "@/lib/ai/prompts";
import { checkAiRateLimit } from "@/lib/ai/rate-limit";
import { assertPromptLength, extractJson, withTimeout } from "@/lib/ai/utils";

export type GenerateStructuredInput = {
  schemaName: string;
  userPrompt: string;
  extraSystem?: string;
  rateLimitKey?: string;
  maxOutputTokens?: number;
  timeoutMs?: number;
};

export async function generateStructured<T>(
  schema: ZodType<T>,
  input: GenerateStructuredInput,
): Promise<AiResult<T>> {
  try {
    if (!isAiConfigured()) {
      throw new AiError("not_configured");
    }

    const userPrompt = input.userPrompt.trim();
    assertPromptLength(userPrompt);

    const extra = input.extraSystem?.trim() ?? "";
    if (extra.length > AI_LIMITS.maxSystemChars) {
      throw new AiError("input_too_large");
    }

    const rate = checkAiRateLimit(input.rateLimitKey ?? "global");
    if (!rate.allowed) {
      throw new AiError("rate_limited");
    }

    const systemPrompt = [
      SAFETY_SYSTEM_PROMPT,
      extra,
      jsonOnlyInstruction(input.schemaName),
    ]
      .filter(Boolean)
      .join("\n\n");

    const provider = getAiProvider();
    const raw = await withTimeout(
      (signal) =>
        provider.generateJson({
          systemPrompt,
          userPrompt,
          maxOutputTokens: input.maxOutputTokens,
          signal,
        }),
      input.timeoutMs ?? AI_LIMITS.requestTimeoutMs,
    );

    const parsed = extractJson(raw.text);
    const result = schema.safeParse(parsed);
    if (!result.success) {
      throw new AiError("invalid_response");
    }

    return { ok: true, data: result.data };
  } catch (error) {
    return toAiFailure(error);
  }
}
