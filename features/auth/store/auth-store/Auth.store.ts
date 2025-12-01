import * as SecureStorage from "expo-secure-store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { eventBus } from "@/core/events/EventBus";

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
        eventBus.emit("auth.authenticated", true);
        eventBus.emit("auth.tokens.getted", { token, refreshToken });
        set({
          isAuthenticated: true,
          token,
          refreshToken,
        });
      },
      clearAuthTokens: (): void => {
        eventBus.emit("auth.authenticated", false);
        eventBus.emit("auth.tokens.getted", {
          token: null,
          refreshToken: null,
        });
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
        getItem: (name) => {
          const value = SecureStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          SecureStorage.setItem(name, JSON.stringify(value));
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
