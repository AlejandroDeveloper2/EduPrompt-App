import { Ionicons } from "@expo/vector-icons";

import { ToastVariantType } from "@/core/types";

/**
 * Obtiene el ícono correspondiente a una variante de toast.
 *
 * Según el tipo de variante (`variant`), retorna el nombre del ícono apropiado
 * del set de **Ionicons**:
 *
 * - `"primary"` → `"checkmark"`
 * - `"danger"` → `"warning-outline"`
 * - Cualquier otro tipo → `"information-outline"`
 *
 * @param {ToastVariantType} variant - Tipo de toast (por ejemplo: `"primary"`, `"danger"`, `"info"`, etc.).
 * @returns {keyof typeof Ionicons.glyphMap} Nombre del ícono asociado a la variante del toast.
 *
 * @example
 * getToastIcon("primary"); // Retorna "checkmark"
 * getToastIcon("danger");  // Retorna "warning-outline"
 * getToastIcon("info");    // Retorna "information-outline"
 */
export const getToastIcon = (variant: ToastVariantType) => {
  const icon: keyof typeof Ionicons.glyphMap =
    variant === "primary"
      ? "checkmark"
      : variant === "danger"
      ? "warning-outline"
      : "information-outline";

  return icon;
};
