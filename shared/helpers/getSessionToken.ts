import AsyncStorage from "expo-sqlite/kv-store";

import { ASYNC_STORAGE_KEYS } from "../constants";

/**
 * Obtiene el token de sesión almacenado en AsyncStorage.
 *
 * Esta función busca el valor asociado a la clave `ASYNC_STORAGE_KEYS.sessionToken`
 * dentro del almacenamiento local asincrónico de la aplicación.
 *
 * @async
 * @function getSessionToken
 * @returns {Promise<string | null>} Retorna una promesa que resuelve con el token de sesión si existe, o `null` si no se encuentra.
 *
 * @example
 * const token = await getSessionToken();
 * if (token) {
 *   console.log("Token encontrado:", token);
 * } else {
 *   console.log("No hay token de sesión almacenado");
 * }
 */
export const getSessionToken = async (): Promise<string | null> => {
  const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.sessionToken);
  return token;
};
