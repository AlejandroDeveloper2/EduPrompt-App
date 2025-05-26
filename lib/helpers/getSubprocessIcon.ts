import { Ionicons } from "@expo/vector-icons";

import { ProcessType } from "../types";

export const getSubprocessIcon = (processType: ProcessType) => {
  const iconProcess: keyof typeof Ionicons.glyphMap =
    processType === "deleting"
      ? "trash-bin-outline"
      : processType === "downloading"
      ? "download-outline"
      : "bulb-outline";
  return iconProcess;
};
