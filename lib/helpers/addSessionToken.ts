import AsyncStorage from "expo-sqlite/kv-store";

import { ASYNC_STORAGE_KEYS } from "../constants";

export const addSessionToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.sessionToken, token);
};
