import { create } from "zustand";

import { PromptsSelectionStoreType } from "./store-types";

export const usePromptsSelectionStore = create<PromptsSelectionStoreType>(
  (set, get) => ({
    selectionMode: false,
    selectionCount: 0,
    selectedPromptIds: new Set<string>(),
    isAllSelected: false,

    toggleSelectionMode: (selectionMode: boolean): void => {
      set({ selectionMode });
    },

    toggleSelection: (promptId: string, totalPromptIdsCount: number): void => {
      const { selectedPromptIds } = get();
      const selectedElements = new Set(selectedPromptIds);

      if (selectedElements.has(promptId)) selectedElements.delete(promptId);
      else selectedElements.add(promptId);

      set({
        selectedPromptIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: selectedElements.size >= totalPromptIdsCount,
      });
    },
    toggleSelectAll: (promptIds: string[]): void => {
      const selectedElements = new Set<string>();

      if (promptIds.length === 0)
        return set({
          selectedPromptIds: selectedElements,
          selectionCount: selectedElements.size,
          isAllSelected: false,
        });

      promptIds.forEach((promptId) => {
        selectedElements.add(promptId);
      });

      set({
        selectedPromptIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: true,
      });
    },
  }),
);
