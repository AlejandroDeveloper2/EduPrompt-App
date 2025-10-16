import AsyncStorage from "expo-sqlite/kv-store";

import { ASYNC_STORAGE_KEYS } from "../constants";

export const getSessionToken = async (): Promise<string | null> => {
  const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.sessionToken);
  return token;
};
