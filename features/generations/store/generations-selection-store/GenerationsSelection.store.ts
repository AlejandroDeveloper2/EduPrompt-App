import { create } from "zustand";

import { GenerationsSelectionStoreType } from "./store-types";

export const GenerationsSelectionStore = create<GenerationsSelectionStoreType>(
  (set, get) => ({
    selectionCount: 0,
    selectedGenerationIds: new Set<string>(),
    isAllSelected: false,

    toggleSelection: (
      generationId: string,
      totalGenerationsIdsCount: number
    ): void => {
      const { selectedGenerationIds } = get();
      const selectedElements = new Set(selectedGenerationIds);

      if (selectedElements.has(generationId))
        selectedElements.delete(generationId);
      else selectedElements.add(generationId);

      set({
        selectedGenerationIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: selectedElements.size >= totalGenerationsIdsCount,
      });
    },
    selectAll: (generationIds: string[]): void => {
      const selectedElements = new Set<string>();

      generationIds.forEach((generationId) => {
        selectedElements.add(generationId);
      });

      set({
        selectedGenerationIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: true,
      });
    },
    clearSelection: (): void => {
      const selectedElements = new Set<string>();
      set({
        selectedGenerationIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: false,
      });
    },
  })
);
