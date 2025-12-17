import { create } from "zustand";

import { NavOption } from "@/core/types";
import { SelectionModeStoreType } from "./store-types";

export const SelectionModeStore = create<SelectionModeStoreType>((set) => ({
  selectionMode: false,
  actions: [],
  allSelected: false,

  toggleSelectionMode: (selectionActions: NavOption[]): void => {
    set(({ selectionMode }) => ({
      selectionMode: !selectionMode,
      actions: selectionActions,
    }));
  },
  enableSelectionMode: (selectionActions: NavOption[]): void => {
    set({ selectionMode: true, actions: selectionActions });
  },
  disableSelectionMode: (): void => {
    set({ selectionMode: false, actions: [] });
  },
  toggleSelectAll: (): void => {
    set(({ allSelected }) => ({
      allSelected: !allSelected,
    }));
  },
}));
