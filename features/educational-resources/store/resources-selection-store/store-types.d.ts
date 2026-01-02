export interface StoreStateProps {
  selectionCount: number;
  selectedResourceIds: Set<string>;
  isAllSelected: boolean;
}

export interface StoreActions {
  toggleSelection: (resourceId: string, totalResourceIdsCount: number) => void;
  selectAll: (resourceIds: string[]) => void;
  clearSelection: () => void;
}

export type ResourcesSelectionStoreType = StoreStateProps & StoreActions;
