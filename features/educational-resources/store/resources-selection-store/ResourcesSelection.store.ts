import { create } from "zustand";

import { ResourcesSelectionStoreType } from "./store-types";

export const ResourcesSelectionStore = create<ResourcesSelectionStoreType>(
  (set, get) => ({
    selectionCount: 0,
    selectedResourceIds: new Set<string>(),
    isAllSelected: false,

    toggleSelection: (
      resourceId: string,
      totalResourceIdsCount: number
    ): void => {
      const { selectedResourceIds } = get();
      const selectedElements = new Set(selectedResourceIds);

      if (selectedElements.has(resourceId)) selectedElements.delete(resourceId);
      else selectedElements.add(resourceId);

      set({
        selectedResourceIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: selectedElements.size >= totalResourceIdsCount,
      });
    },
    selectAll: (resourceIds: string[]): void => {
      const selectedElements = new Set<string>();

      resourceIds.forEach((resourceId) => {
        selectedElements.add(resourceId);
      });

      set({
        selectedResourceIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: true,
      });
    },
    clearSelection: (): void => {
      const selectedElements = new Set<string>();
      set({
        selectedResourceIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: false,
      });
    },
  })
);
