import { create } from "zustand";

import { ResourcesSelectionStoreType } from "./store-types";

export const useResourcesSelectionStore = create<ResourcesSelectionStoreType>(
  (set, get) => ({
    selectionMode: false,
    selectionCount: 0,
    selectedResourceIds: new Set<string>(),
    isAllSelected: false,

    toggleSelectionMode: (selectionMode: boolean): void => {
      set({ selectionMode });
    },
    toggleSelection: (
      resourceId: string,
      totalResourceIdsCount: number,
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
    toggleSelectAll: (resourceIds: string[]): void => {
      const selectedElements = new Set<string>();

      if (resourceIds.length === 0)
        return set({
          selectedResourceIds: selectedElements,
          selectionCount: selectedElements.size,
          isAllSelected: false,
        });

      resourceIds.forEach((resourceId) => {
        selectedElements.add(resourceId);
      });

      set({
        selectedResourceIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: true,
      });
    },
  }),
);
