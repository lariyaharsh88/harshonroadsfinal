import "server-only";

import { createGeminiProvider } from "@/lib/ai/gemini";
import type { AiProvider } from "@/lib/ai/provider";

let provider: AiProvider | null = null;

export function getAiProvider(): AiProvider {
  if (!provider) {
    provider = createGeminiProvider();
  }
  return provider;
}

export function setAiProvider(next: AiProvider): void {
  provider = next;
}

export function isAiConfigured(): boolean {
  return Boolean(process.env.GEMINI_API_KEY?.trim());
}
