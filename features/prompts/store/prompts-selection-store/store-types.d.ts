export interface StoreStateProps {
  selectionCount: number;
  selectedPromptIds: Set<string>;
  isAllSelected: boolean;
}

export interface StoreActions {
  toggleSelection: (promptId: string, totalPromptIdsCount: number) => void;
  selectAll: (promptsIds: string[]) => void;
  clearSelection: () => void;
}

export type PromptsSelectionStoreType = StoreStateProps & StoreActions;
