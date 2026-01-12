import { create } from "zustand";

import { FoldersSelectionStoreType } from "./store-types";

export const FoldersSelectionStore = create<FoldersSelectionStoreType>(
  (set, get) => ({
    selectionCount: 0,
    selectedFolderIds: new Set<string>(),
    isAllSelected: false,

    toggleSelection: (folderId: string, totalFolderIdsCount: number): void => {
      const { selectedFolderIds } = get();
      const selectedFolders = new Set(selectedFolderIds);

      if (selectedFolders.has(folderId)) selectedFolders.delete(folderId);
      else selectedFolders.add(folderId);

      set({
        selectedFolderIds: selectedFolders,
        selectionCount: selectedFolders.size,
        isAllSelected: selectedFolders.size >= totalFolderIdsCount,
      });
    },
    selectAll: (folderIds: string[]): void => {
      const selectedFolders = new Set<string>();

      folderIds.forEach((folderId) => {
        selectedFolders.add(folderId);
      });

      set({
        selectedFolderIds: selectedFolders,
        selectionCount: selectedFolders.size,
        isAllSelected: true,
      });
    },
    clearSelection: (): void => {
      const selectedFolders = new Set<string>();
      set({
        selectedFolderIds: selectedFolders,
        selectionCount: selectedFolders.size,
        isAllSelected: false,
      });
    },
  })
);
