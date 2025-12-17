import { create } from "zustand";

import { TagsSelectionStoreType } from "./store-types";

export const TagsSelectionStore = create<TagsSelectionStoreType>(
  (set, get) => ({
    selectionCount: 0,
    selectedTagIds: new Set<string>(),
    isAllSelected: false,

    toggleSelection: (tagId: string, totalTagIdsCount: number): void => {
      const { selectedTagIds } = get();
      const selectedElements = new Set(selectedTagIds);

      if (selectedElements.has(tagId)) selectedElements.delete(tagId);
      else selectedElements.add(tagId);

      set({
        selectedTagIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: selectedElements.size >= totalTagIdsCount,
      });
    },
    selectAll: (tagIds: string[]): void => {
      const selectedElements = new Set<string>();

      tagIds.forEach((tagId) => {
        selectedElements.add(tagId);
      });

      set({
        selectedTagIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: true,
      });
    },
    clearSelection: (): void => {
      const selectedElements = new Set<string>();
      set({
        selectedTagIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: false,
      });
    },
  })
);
