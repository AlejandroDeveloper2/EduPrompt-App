import { create } from "zustand";

import { PromptsSelectionStoreType } from "./store-types";

export const PromptsSelectionStore = create<PromptsSelectionStoreType>(
  (set, get) => ({
    selectionCount: 0,
    selectedPromptIds: new Set<string>(),
    isAllSelected: false,

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
    selectAll: (promptIds: string[]): void => {
      const selectedElements = new Set<string>();

      promptIds.forEach((promptId) => {
        selectedElements.add(promptId);
      });

      set({
        selectedPromptIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: true,
      });
    },
    clearSelection: (): void => {
      const selectedElements = new Set<string>();
      set({
        selectedPromptIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: false,
      });
    },
  })
);
