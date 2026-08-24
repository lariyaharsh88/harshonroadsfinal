export const AI_LIMITS = {
  maxPromptChars: 6_000,
  maxSystemChars: 6_000,
  maxDestinations: 5,
  maxItineraryDays: 5,
  maxOutputTokens: 8_192,
  requestTimeoutMs: 40_000,
  rateLimitWindowMs: 60_000,
  rateLimitMaxPerWindow: 20,
} as const;

export type AiErrorCode =
  | "not_configured"
  | "input_too_large"
  | "timeout"
  | "rate_limited"
  | "empty"
  | "invalid_response"
  | "provider_error";

const USER_MESSAGES: Record<AiErrorCode, string> = {
  not_configured:
    "AI planning is not available on this server yet. Try the Weekend Trip Finder instead.",
  input_too_large:
    "That request is too long. Shorten the notes or pick fewer destinations.",
  timeout: "The planner took too long. Please try again in a moment.",
  rate_limited: "Too many planning requests. Wait a minute and try again.",
  empty: "The planner returned nothing usable. Please try again.",
  invalid_response:
    "The planner returned a response we could not use. Please try again.",
  provider_error:
    "The planner could not complete this request. Please try again later.",
};

export class AiError extends Error {
  readonly code: AiErrorCode;
  readonly userMessage: string;

  constructor(code: AiErrorCode, detail?: string) {
    super(detail ?? USER_MESSAGES[code]);
    this.name = "AiError";
    this.code = code;
    this.userMessage = USER_MESSAGES[code];
  }
}

export type AiSuccess<T> = {
  ok: true;
  data: T;
};

export type AiFailure = {
  ok: false;
  code: AiErrorCode;
  message: string;
};

export type AiResult<T> = AiSuccess<T> | AiFailure;

export function toAiFailure(error: unknown): AiFailure {
  if (error instanceof AiError) {
    return { ok: false, code: error.code, message: error.userMessage };
  }
  return {
    ok: false,
    code: "provider_error",
    message: USER_MESSAGES.provider_error,
  };
}
