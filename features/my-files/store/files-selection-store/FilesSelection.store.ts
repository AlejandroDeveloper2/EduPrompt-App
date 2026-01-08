import { create } from "zustand";

import { FilesSelectionStoreType } from "./store-types";

export const FilesSelectionStore = create<FilesSelectionStoreType>(
  (set, get) => ({
    selectionCount: 0,
    selectedElementIds: new Set<string>(),
    isAllSelected: false,

    toggleSelection: (
      resourceId: string,
      totalElementIdsCount: number
    ): void => {
      const { selectedElementIds } = get();
      const selectedElements = new Set(selectedElementIds);

      if (selectedElements.has(resourceId)) selectedElements.delete(resourceId);
      else selectedElements.add(resourceId);

      set({
        selectedElementIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: selectedElements.size >= totalElementIdsCount,
      });
    },
    selectAll: (elementIds: string[]): void => {
      const selectedElements = new Set<string>();

      elementIds.forEach((elementId) => {
        selectedElements.add(elementId);
      });

      set({
        selectedElementIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: true,
      });
    },
    clearSelection: (): void => {
      const selectedElements = new Set<string>();
      set({
        selectedElementIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: false,
      });
    },
  })
);
