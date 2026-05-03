import { create } from "zustand";

import { GenerationsSelectionStoreType } from "./store-types";

export const useGenerationsSelectionStore =
  create<GenerationsSelectionStoreType>((set, get) => ({
    selectionMode: false,
    selectionCount: 0,
    selectedGenerationIds: new Set<string>(),
    isAllSelected: false,

    toggleSelectionMode: (selectionMode: boolean): void => {
      if (!selectionMode)
        return set({
          selectionMode: false,
          selectedGenerationIds: new Set<string>(),
          selectionCount: 0,
          isAllSelected: false,
        });
      set({ selectionMode });
    },
    toggleSelection: (
      generationId: string,
      totalGenerationsIdsCount: number,
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
        selectionMode: selectedElements.size > 0,
      });
    },
    toggleSelectAll: (generationIds: string[]): void => {
      const selectedElements = new Set<string>();

      if (generationIds.length === 0)
        return set({
          selectedGenerationIds: selectedElements,
          selectionCount: selectedElements.size,
          isAllSelected: false,
          selectionMode: false,
        });

      generationIds.forEach((generationId) => {
        selectedElements.add(generationId);
      });

      set({
        selectedGenerationIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: true,
      });
    },
  }));
