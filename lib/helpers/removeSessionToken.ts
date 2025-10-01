import AsyncStorage from "expo-sqlite/kv-store";

import { ASYNC_STORAGE_KEYS } from "../constants";

export const removeSessionToken = async (): Promise<void> => {
  await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.sessionToken);
};
