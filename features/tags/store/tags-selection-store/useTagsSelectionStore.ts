import { create } from "zustand";

import { TagsSelectionStoreType } from "./store-types";

export const useTagsSelectionStore = create<TagsSelectionStoreType>(
  (set, get) => ({
    selectionMode: false,
    selectionCount: 0,
    selectedTagIds: new Set<string>(),
    isAllSelected: false,

    toggleSelectionMode: (selectionMode: boolean): void => {
      if (!selectionMode)
        return set({
          selectionMode: false,
          selectedTagIds: new Set<string>(),
          selectionCount: 0,
          isAllSelected: false,
        });
      set({ selectionMode });
    },

    toggleSelection: (tagId: string, totalTagIdsCount: number): void => {
      const { selectedTagIds } = get();
      const selectedElements = new Set(selectedTagIds);

      if (selectedElements.has(tagId)) selectedElements.delete(tagId);
      else selectedElements.add(tagId);

      set({
        selectedTagIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: selectedElements.size >= totalTagIdsCount,
        selectionMode: selectedElements.size > 0,
      });
    },
    toggleSelectAll: (tagIds: string[]): void => {
      const selectedElements = new Set<string>();

      if (tagIds.length === 0)
        return set({
          selectedTagIds: selectedElements,
          selectionCount: selectedElements.size,
          isAllSelected: false,
          selectionMode: false,
        });

      tagIds.forEach((tagId) => {
        selectedElements.add(tagId);
      });

      set({
        selectedTagIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: true,
      });
    },
  }),
);
