import "server-only";

export type AiJsonRequest = {
  systemPrompt: string;
  userPrompt: string;
  maxOutputTokens?: number;
  signal?: AbortSignal;
};

export type AiJsonResponse = {
  text: string;
  model: string;
};

export type AiProvider = {
  id: string;
  generateJson: (request: AiJsonRequest) => Promise<AiJsonResponse>;
};
