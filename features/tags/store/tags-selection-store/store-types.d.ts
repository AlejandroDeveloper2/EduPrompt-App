export interface StoreStateProps {
  selectionMode: boolean;
  selectionCount: number;
  selectedTagIds: Set<string>;
  isAllSelected: boolean;
}

export interface StoreActions {
  toggleSelectionMode: (selectionMode: boolean) => void;
  toggleSelection: (tagId: string, totalTagIdsCount: number) => void;
  toggleSelectAll: (tagIds: string[]) => void;
}

export type TagsSelectionStoreType = StoreStateProps & StoreActions;
