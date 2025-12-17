export interface StoreStateProps {
  selectionCount: number;
  selectedGenerationIds: Set<string>;
  isAllSelected: boolean;
}

export interface StoreActions {
  toggleSelection: (
    generationId: string,
    totalGenerationIdsCount: number
  ) => void;
  selectAll: (generationIds: string[]) => void;
  clearSelection: () => void;
}

export type GenerationsSelectionStoreType = StoreStateProps & StoreActions;
