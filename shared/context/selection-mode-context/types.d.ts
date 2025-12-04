import type { ReactNode } from "react";

import { NavOption } from "@/core/types";

interface ContextStateProps {
  selectionMode: boolean;
  actions: NavOption[];
  selectedItems: number;
  allSelected: boolean;
}

interface ContextActions {
  toggleSelectionMode: (selectionActions: NavOption[]) => void;
  enableSelectionMode: (selectionActions: NavOption[]) => void;
  disableSelectionMode: () => void;
  updateSelectedItems: (selectedItemsParam: number) => void;
  toggleSelectAll: () => void;
}

export interface ProviderProps {
  children: ReactNode | ReactNode[];
}

export type SelectionModeContextType = ContextStateProps & ContextActions;
