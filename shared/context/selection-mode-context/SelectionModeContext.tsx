import { createContext, useState } from "react";

import { NavOption } from "@/core/types";
import { ProviderProps, SelectionModeContextType } from "./types";

const SelectionModeContext = createContext<
  SelectionModeContextType | undefined
>(undefined);

export const SelectionModeProvider = ({ children }: ProviderProps) => {
  const [selectionMode, setSelectionMode] = useState<boolean>(false);
  const [actions, setActions] = useState<NavOption[]>([]);
  const [selectedItems, setSelectedItems] = useState<number>(0);
  const [allSelected, setAllSelected] = useState<boolean>(false);

  const toggleSelectionMode = (selectionActions: NavOption[]): void => {
    setSelectionMode((prev) => !prev);
    setActions(selectionActions);
  };

  const enableSelectionMode = (selectionActions: NavOption[]): void => {
    setSelectionMode(true);
    setActions(selectionActions);
  };

  const disableSelectionMode = (): void => {
    setAllSelected(false);
    setSelectionMode(false);
    setActions([]);
  };

  const updateSelectedItems = (selectedItemsParam: number): void => {
    setSelectedItems(selectedItemsParam);
  };

  const toggleSelectAll = (): void => {
    setAllSelected((prev) => !prev);
  };

  return (
    <SelectionModeContext.Provider
      value={{
        selectionMode,
        actions,
        selectedItems,
        allSelected,
        toggleSelectionMode,
        enableSelectionMode,
        disableSelectionMode,
        updateSelectedItems,
        toggleSelectAll,
      }}
    >
      {children}
    </SelectionModeContext.Provider>
  );
};

export default SelectionModeContext;
