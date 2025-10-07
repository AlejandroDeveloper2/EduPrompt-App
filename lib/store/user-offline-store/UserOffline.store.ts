import AsyncStorage from "expo-sqlite/kv-store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ASYNC_STORAGE_KEYS } from "@/lib/constants";

import { UserPreferences, UserStats } from "@/lib/types/data-types";
import { UserStorePersistedState, UserStoreType } from "./store-types";

import { initialState } from "./state";

export const UserOfflineStore = create<UserStoreType>()(
  persist<UserStoreType, [], [], UserStorePersistedState>(
    (set, get) => ({
      // --- Estado ---
      userStats: initialState,

      // --- Acciones User ---
      setUserStats: (userStats: UserStats) => {
        set({ userStats });
      },

      addLocalTokenCoins: (amount: number, sync: boolean) => {
        const { userStats } = get();
        const updated = {
          ...userStats,
          tokenCoins: userStats.tokenCoins + amount,
          sync,
        };
        set({ userStats: updated });
      },

      subtractLocalTokenCoins: (amount: number, sync: boolean) => {
        const { userStats } = get();
        const updated = {
          ...userStats,
          tokenCoins: Math.max(0, userStats.tokenCoins - amount),
          sync,
        };
        set({ userStats: updated });
      },

      updateLocalAccountType: (isPremiumUser: boolean, sync: boolean) => {
        const { userStats } = get();
        const updated = {
          ...userStats,
          isPremiumUser,
          sync,
        };
        set({ userStats: updated });
      },

      loadLocalUserStats: () => {
        const { userStats } = get();
        return userStats;
      },

      // --- Acciones de preferencias ---
      updateLocalUserPreferences: (
        updatedUserPreferences: Partial<UserPreferences>,
        sync: boolean
      ) => {
        const { userStats } = get();
        const updated: UserStats = {
          ...userStats,
          userPreferences: {
            ...userStats.userPreferences,
            ...updatedUserPreferences,
          },
          sync,
        };
        set({ userStats: updated });
      },

      markAsSynced: () => {
        const { userStats } = get();
        set({ userStats: { ...userStats, sync: true } });
      },
    }),
    {
      name: ASYNC_STORAGE_KEYS.userStats,
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
      partialize: (state) => ({
        userStats: state.userStats,
      }),
    }
  )
);
