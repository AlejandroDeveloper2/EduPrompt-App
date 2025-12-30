import { PaginatedResponse } from "@/core/types";
import {
  CreatePromptPayload,
  Prompt,
  PromptFilters,
  UpdatePromptPayload,
} from "../../types";

interface StoreStateProps {
  isProcessing: boolean;
  isLoading: boolean;
}

interface StoreActions {
  createPrompt: (
    createPromptPayload: CreatePromptPayload,
    toast?: boolean
  ) => Promise<Prompt>;
  findPrompts: (filters: PromptFilters) => Promise<PaginatedResponse<Prompt>>;
  findPromptById: (promptId: string) => Promise<Prompt | null>;
  updatePrompt: (updatePromptPayload: UpdatePromptPayload) => Promise<Prompt>;
  deleteManyPrompts: () => Promise<void>;
  updatePromptsSyncStatus: (sync: boolean, promptId?: string) => Promise<void>;
  findAllPrompts: () => Promise<Prompt[]>;
}

export type OfflinePromptsStoreType = StoreStateProps & StoreActions;
