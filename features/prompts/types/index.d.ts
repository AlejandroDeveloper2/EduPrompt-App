interface Prompt {
  promptId: string;
  promptTitle: string;
  promptText: string;
  tag: string;
  sync: boolean;
}

type CreatePromptPayload = Omit<Prompt, "sync">;
type UpdatePromptPayload = CreatePromptPayload;

interface SyncPromptsPayload {
  prompts: Omit<Prompt, "sync">[];
}

interface PromptFilters {
  tag?: string | undefined;
  title?: string | undefined;
  page?: string | undefined;
  limit?: string | undefined;
}

type BaseFilters = Omit<PromptFilters, "page" | "limit">;

export type {
  BaseFilters,
  CreatePromptPayload,
  Prompt,
  PromptFilters,
  SyncPromptsPayload,
  UpdatePromptPayload,
};
