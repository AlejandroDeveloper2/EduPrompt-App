export interface StoreStateProps {
  selectionCount: number;
  selectedTagIds: Set<string>;
  isAllSelected: boolean;
}

export interface StoreActions {
  toggleSelection: (tagId: string, totalTagIdsCount: number) => void;
  selectAll: (tagIds: string[]) => void;
  clearSelection: () => void;
}

export type TagsSelectionStoreType = StoreStateProps & StoreActions;
