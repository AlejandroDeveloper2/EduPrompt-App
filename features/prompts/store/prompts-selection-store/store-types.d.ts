export interface StoreStateProps {
  selectionMode: boolean;
  selectionCount: number;
  selectedPromptIds: Set<string>;
  isAllSelected: boolean;
}

export interface StoreActions {
  toggleSelectionMode: (selectionMode: boolean) => void;
  toggleSelection: (promptId: string, totalPromptIdsCount: number) => void;
  toggleSelectAll: (promptsIds: string[]) => void;
}

export type PromptsSelectionStoreType = StoreStateProps & StoreActions;
