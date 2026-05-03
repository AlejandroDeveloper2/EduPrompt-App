import { Prompt } from "@/features/prompts/types";

export interface StoreStateProps {
  selectedPrompt: Prompt | null;
  isTagSelection: boolean;
}

export interface StoreActions {
  setSelectedPrompt: (prompt: Prompt | null) => void;
  setIsTagSelection: (value: boolean) => void;
  reset: () => void;
}

export type GenerationPromptViewStoreType = StoreStateProps & StoreActions;
