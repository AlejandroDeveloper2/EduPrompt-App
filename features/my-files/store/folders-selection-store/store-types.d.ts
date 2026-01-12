export interface StoreStateProps {
  selectionCount: number;
  selectedFolderIds: Set<string>;
  isAllSelected: boolean;
}

export interface StoreActions {
  toggleSelection: (folderId: string, totalFolderIdsCount: number) => void;
  selectAll: (folderIds: string[]) => void;
  clearSelection: () => void;
}

export type FoldersSelectionStoreType = StoreStateProps & StoreActions;
