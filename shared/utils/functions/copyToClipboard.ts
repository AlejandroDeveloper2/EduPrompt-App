import { setStringAsync } from "expo-clipboard";

import { i18n } from "@/core/store";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";

/**
 * Copia un texto al portapapeles del dispositivo y muestra una notificación (toast)
 * indicando el resultado de la operación.
 *
 * Flujo:
 * - Intenta copiar el texto usando la API de portapapeles.
 * - Si tiene éxito, muestra un toast de tipo "primary" confirmando la copia.
 * - Si ocurre un error, lo registra en consola y muestra un toast de tipo "danger".
 *
 * @param {string} textToCopy - Texto a copiar al portapapeles.
 * @returns {Promise<void>} Promesa que se resuelve cuando finaliza el intento de copia.
 */
export const copyToClipboard = async (textToCopy: string): Promise<void> => {
  try {
    await setStringAsync(textToCopy);
    showToast({
      key: generateToastKey(),
      variant: "primary",
      message: i18n.t(
        "generations-translations.ia-response-card-labels.copy-resource-function-labels.success-msg",
      ),
    });
  } catch (e) {
    console.log(e);
    showToast({
      key: generateToastKey(),
      variant: "danger",
      message: i18n.t(
        "generations-translations.ia-response-card-labels.copy-resource-function-labels.error-msg",
      ),
    });
  }
};
