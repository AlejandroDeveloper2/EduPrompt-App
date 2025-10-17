import AsyncStorage from "expo-sqlite/kv-store";

import { ASYNC_STORAGE_KEYS } from "../constants";

/**
 * Elimina el token de sesión almacenado en AsyncStorage.
 *
 * Esta función remueve el valor asociado a la clave `ASYNC_STORAGE_KEYS.sessionToken`
 * del almacenamiento local asincrónico, finalizando efectivamente la sesión del usuario.
 *
 * @async
 * @function removeSessionToken
 * @returns {Promise<void>} Promesa que se resuelve cuando el token ha sido eliminado exitosamente.
 *
 * @example
 * await removeSessionToken();
 * console.log("Token de sesión eliminado correctamente");
 */
export const removeSessionToken = async (): Promise<void> => {
  await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.sessionToken);
};
