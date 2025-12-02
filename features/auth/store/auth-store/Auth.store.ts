import * as SecureStorage from "expo-secure-store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AuthStoreType, StoreState } from "./store-types";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

//TODO: implementar manejo de tokens y refresh tokens en el store de auth
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
      clearAuthTokens: (): void => {
        set({
          isAuthenticated: false,
          token: null,
          refreshToken: null,
        });
      },
    }),
    {
      name: ASYNC_STORAGE_KEYS.auth,
      storage: {
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
      },
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
