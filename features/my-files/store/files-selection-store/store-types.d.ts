export interface StoreStateProps {
  selectionCount: number;
  selectedElementIds: Set<string>;
  isAllSelected: boolean;
}

export interface StoreActions {
  toggleSelection: (elementId: string, totalElementIdsCount: number) => void;
  selectAll: (elementIds: string[]) => void;
  clearSelection: () => void;
}

export type FilesSelectionStoreType = StoreStateProps & StoreActions;
