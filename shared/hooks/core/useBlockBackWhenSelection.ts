/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { BackHandler } from "react-native";

import { useSelectionModeContext } from "../context";

export default function useBlockBackWhenSelection(): void {
  const { selectionMode, disableSelectionMode } = useSelectionModeContext();

  useEffect(() => {
    if (!selectionMode) return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      disableSelectionMode();
      return true;
    });
    return () => sub.remove();
  }, [selectionMode]);
}
