/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { BackHandler } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { useSelectionModeStore } from "@/core/store";

export default function useBlockBackWhenSelection(): void {
  const { selectionMode, disableSelectionMode } = useSelectionModeStore(
    useShallow((state) => ({
      selectionMode: state.selectionMode,
      disableSelectionMode: state.disableSelectionMode,
    })),
  );

  useEffect(() => {
    if (!selectionMode) return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      disableSelectionMode();
      return true;
    });
    return () => sub.remove();
  }, [selectionMode]);
}
