export interface StoreStateProps {
  selectionMode: boolean;
  selectionCount: number;
  selectedGenerationIds: Set<string>;
  isAllSelected: boolean;
}

export interface StoreActions {
  toggleSelectionMode: (selectionMode: boolean) => void;
  toggleSelection: (
    generationId: string,
    totalGenerationIdsCount: number,
  ) => void;
  toggleSelectAll: (generationIds: string[]) => void;
}

export type GenerationsSelectionStoreType = StoreStateProps & StoreActions;
