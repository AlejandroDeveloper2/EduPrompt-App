/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { BackHandler } from "react-native";

import { useSelectionModeStore } from "../store";

export default function useBlockBackWhenSelection(): void {
  const { selectionMode, disableSelectionMode } = useSelectionModeStore();

  useEffect(() => {
    if (!selectionMode) return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      disableSelectionMode();
      return true;
    });
    return () => sub.remove();
  }, [selectionMode]);
}
