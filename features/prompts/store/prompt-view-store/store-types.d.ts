import { Prompt } from "../../types";

export interface StoreStateProps {
  selectedPrompt: Prompt | null;
  isTagSelection: boolean;
}

export interface StoreActions {
  setSelectedPrompt: (prompt: Prompt | null) => void;
  setIsTagSelection: (value: boolean) => void;
  reset: () => void;
}

export type PromptViewStoreType = StoreStateProps & StoreActions;
