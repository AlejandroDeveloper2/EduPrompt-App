import * as SecureStorage from "expo-secure-store";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

/**
 * Guarda el token de sesión de manera segura.
 *
 * Persiste el valor en SecureStore bajo la clave
 * ASYNC_STORAGE_KEYS.sessionToken.
 *
 * @param token - Token de sesión a almacenar.
 */
export const addSessionToken = async (token: string): Promise<void> => {
  await SecureStorage.setItemAsync(
    ASYNC_STORAGE_KEYS.sessionToken,
    String(token)
  );
};

/**
 * Obtiene el token de sesión almacenado previamente.
 *
 * Lee el valor guardado en SecureStore con la clave
 * ASYNC_STORAGE_KEYS.sessionToken.
 *
 * @returns El token si existe; en caso contrario, null.
 */
export const getSessionToken = async (): Promise<string | null> => {
  const token = await SecureStorage.getItemAsync(
    ASYNC_STORAGE_KEYS.sessionToken
  );
  return token;
};

/**
 * Elimina el token de sesión persistido.
 *
 * Borra de forma asíncrona el valor asociado a la clave
 * ASYNC_STORAGE_KEYS.sessionToken en SecureStore.
 *
 * @returns Promesa que se resuelve cuando finaliza la eliminación.
 */
export const removeSessionToken = async (): Promise<void> => {
  await SecureStorage.deleteItemAsync(ASYNC_STORAGE_KEYS.sessionToken);
};
