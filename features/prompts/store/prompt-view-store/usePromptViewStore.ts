import { create } from "zustand";

import { PromptViewStoreType } from "./store-types";

export const usePromptViewStore = create<PromptViewStoreType>((set) => ({
  selectedPrompt: null,
  isTagSelection: false,
  setIsTagSelection: (value) => set({ isTagSelection: value }),
  setSelectedPrompt: (prompt) => set({ selectedPrompt: prompt }),
  reset: () => set({ selectedPrompt: null }),
}));
