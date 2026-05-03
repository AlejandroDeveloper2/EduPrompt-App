import { create } from "zustand";

import { GenerationPromptViewStoreType } from "./store-types";

export const useGenerationPromptViewStore =
  create<GenerationPromptViewStoreType>((set) => ({
    selectedPrompt: null,
    isTagSelection: false,
    setSelectedPrompt: (prompt) => {
      set({
        selectedPrompt: prompt,
        isTagSelection: false,
      });
    },
    setIsTagSelection: (value) => set({ isTagSelection: value }),
    reset: () =>
      set({
        selectedPrompt: null,
        isTagSelection: false,
      }),
  }));
