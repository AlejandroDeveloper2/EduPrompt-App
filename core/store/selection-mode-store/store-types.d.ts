import { NavOption } from "@/core/types";

export interface StoreStateProps {
  selectionMode: boolean;
  actions: NavOption[];
  allSelected: boolean;
}

export interface StoreActions {
  toggleSelectionMode: (selectionActions: NavOption[]) => void;
  enableSelectionMode: (selectionActions: NavOption[]) => void;
  disableSelectionMode: () => void;
  toggleSelectAll: () => void;
}

export type SelectionModeStoreType = StoreStateProps & StoreActions;
