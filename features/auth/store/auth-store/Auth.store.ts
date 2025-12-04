import * as SecureStorage from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { AuthStoreType, StoreState } from "./store-types";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

export const AuthStore = create<AuthStoreType>()(
  persist<AuthStoreType, [], [], StoreState>(
    (set) => ({
      isAuthenticated: false,
      token: null,
      refreshToken: null,

      setAuthTokens: (token: string, refreshToken: string): void => {
        set({
          isAuthenticated: true,
          token,
          refreshToken,
        });
      },
      clearAuthTokens: async (): Promise<void> => {
        await SecureStorage.deleteItemAsync(ASYNC_STORAGE_KEYS.auth);
        set({
          isAuthenticated: false,
          token: null,
          refreshToken: null,
        });
      },
    }),
    {
      name: ASYNC_STORAGE_KEYS.auth,
      storage: createJSONStorage(() => ({
        getItem: async (name) => {
          const value = await SecureStorage.getItemAsync(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await SecureStorage.setItemAsync(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await SecureStorage.deleteItemAsync(name);
        },
      })),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
