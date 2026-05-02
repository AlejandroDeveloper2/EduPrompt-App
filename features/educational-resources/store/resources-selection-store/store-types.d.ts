export interface StoreStateProps {
  selectionMode: boolean;
  selectionCount: number;
  selectedResourceIds: Set<string>;
  isAllSelected: boolean;
}

export interface StoreActions {
  toggleSelectionMode: (selectionMode: boolean) => void;
  toggleSelection: (resourceId: string, totalResourceIdsCount: number) => void;
  toggleSelectAll: (resourceIds: string[]) => void;
}

export type ResourcesSelectionStoreType = StoreStateProps & StoreActions;
