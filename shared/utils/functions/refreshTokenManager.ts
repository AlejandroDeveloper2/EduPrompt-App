import * as SecureStorage from "expo-secure-store";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

/**
 * Guarda el refresh token de manera segura.
 *
 * Utiliza expo-secure-store para persistir el valor bajo la clave
 * ASYNC_STORAGE_KEYS.refreshToken.
 *
 * Nota: aunque esta función no es async, internamente usa setItemAsync.
 *
 * @param refreshToken - Cadena del refresh token a almacenar.
 */
export const addRefreshToken = async (refreshToken: string): Promise<void> => {
  await SecureStorage.setItemAsync(
    ASYNC_STORAGE_KEYS.refreshToken,
    String(refreshToken)
  );
};

/**
 * Obtiene el refresh token almacenado previamente.
 *
 * Lee el valor guardado en SecureStore con la clave
 * ASYNC_STORAGE_KEYS.refreshToken.
 *
 * @returns El refresh token si existe; de lo contrario, null.
 */
export const getRefreshToken = async (): Promise<string | null> => {
  const refreshToken = await SecureStorage.getItemAsync(
    ASYNC_STORAGE_KEYS.refreshToken
  );
  return refreshToken;
};

/**
 * Elimina el refresh token persistido.
 *
 * Borra de forma asíncrona el valor asociado a la clave
 * ASYNC_STORAGE_KEYS.refreshToken en SecureStore.
 *
 * @returns Promesa que se resuelve cuando finaliza la eliminación.
 */
export const removeRefreshToken = async (): Promise<void> => {
  await SecureStorage.deleteItemAsync(ASYNC_STORAGE_KEYS.refreshToken);
};
