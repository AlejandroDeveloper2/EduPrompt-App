import AsyncStorage from "expo-sqlite/kv-store";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

/**
 * Almacena el token de sesión en AsyncStorage.
 *
 * @param token - La cadena del token de sesión que será almacenada
 * @returns El token ha sido almacenado exitosamente
 */
export const addSessionToken = (token: string): void => {
  AsyncStorage.setItemSync(ASYNC_STORAGE_KEYS.sessionToken, token);
};

/**
 * Obtiene el token de sesión almacenado en AsyncStorage.
 *
 * Esta función busca el valor asociado a la clave `ASYNC_STORAGE_KEYS.sessionToken`
 * dentro del almacenamiento local asincrónico de la aplicación.
 *
 * @function getSessionToken
 * @returns {string | null} Retorna el token de sesión si existe, o `null` si no se encuentra.
 *
 * @example
 * const token = getSessionToken();
 * if (token) {
 *   console.log("Token encontrado:", token);
 * } else {
 *   console.log("No hay token de sesión almacenado");
 * }
 */
export const getSessionToken = (): string | null => {
  const token = AsyncStorage.getItemSync(ASYNC_STORAGE_KEYS.sessionToken);
  return token;
};

/**
 * Elimina el token de sesión almacenado en AsyncStorage.
 *
 * Esta función remueve el valor asociado a la clave `ASYNC_STORAGE_KEYS.sessionToken`
 * del almacenamiento local asincrónico, finalizando efectivamente la sesión del usuario.
 *
 * @function removeSessionToken
 * @returns {void} Promesa que se resuelve cuando el token ha sido eliminado exitosamente.
 *
 * @example
 * removeSessionToken();
 * console.log("Token de sesión eliminado correctamente");
 */
export const removeSessionToken = (): void => {
  AsyncStorage.removeItemSync(ASYNC_STORAGE_KEYS.sessionToken);
};
