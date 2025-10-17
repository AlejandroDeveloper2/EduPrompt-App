import AsyncStorage from "expo-sqlite/kv-store";

import { ASYNC_STORAGE_KEYS } from "../constants";

/**
 * Almacena el token de sesión en AsyncStorage.
 *
 * @param token - La cadena del token de sesión que será almacenada
 * @returns Una Promesa que se resuelve cuando el token ha sido almacenado exitosamente
 * @throws Podría lanzar un error si las operaciones de AsyncStorage fallan
 */
export const addSessionToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.sessionToken, token);
};
