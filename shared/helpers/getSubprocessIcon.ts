import { Ionicons } from "@expo/vector-icons";

import { ProcessType } from "@/core/types";

/**
 * Obtiene el ícono correspondiente a un tipo de subproceso.
 *
 * Según el tipo de proceso recibido (`processType`), retorna el nombre del ícono
 * apropiado del set de **Ionicons**.
 *
 * - `"deleting"` → `"trash-bin-outline"`
 * - `"downloading"` → `"download-outline"`
 * - Cualquier otro tipo → `"bulb-outline"`
 *
 * @param {ProcessType} processType - Tipo de proceso (por ejemplo: `"deleting"`, `"downloading"`, `"generating"`, etc.).
 * @returns {keyof typeof Ionicons.glyphMap} Nombre del ícono asociado al proceso.
 *
 * @example
 * getSubprocessIcon("deleting");    // Retorna "trash-bin-outline"
 * getSubprocessIcon("downloading"); // Retorna "download-outline"
 * getSubprocessIcon("generating");  // Retorna "bulb-outline"
 */
export const getSubprocessIcon = (
  processType: ProcessType
): keyof typeof Ionicons.glyphMap => {
  const iconProcess: keyof typeof Ionicons.glyphMap =
    processType === "deleting"
      ? "trash-bin-outline"
      : processType === "downloading"
      ? "download-outline"
      : "bulb-outline";
  return iconProcess;
};
