import { createContext, useState } from "react";

import { NavOption } from "@/core/types";
import { ProviderProps, SelectionModeContextType } from "./types";

const SelectionModeContext = createContext<
  SelectionModeContextType | undefined
>(undefined);

export const SelectionModeProvider = ({ children }: ProviderProps) => {
  const [selectionMode, setSelectionMode] = useState<boolean>(false);
  const [actions, setActions] = useState<NavOption[]>([]);
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

  const toggleSelectAll = (): void => {
    setAllSelected((prev) => !prev);
  };

  const enableAllSelection = (): void => {
    setAllSelected(true);
  };

  const disableAllSelection = (): void => {
    setAllSelected(false);
  };

  return (
    <SelectionModeContext.Provider
      value={{
        selectionMode,
        actions,
        allSelected,
        toggleSelectionMode,
        enableSelectionMode,
        disableSelectionMode,
        toggleSelectAll,
        enableAllSelection,
        disableAllSelection,
      }}
    >
      {children}
    </SelectionModeContext.Provider>
  );
};

export default SelectionModeContext;
