import AsyncStorage from "expo-sqlite/kv-store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

import { IndicatorPanelStoreType, StoreStateProps } from "./store-types";

export const IndicatorPanelStore = create<IndicatorPanelStoreType>()(
  persist<IndicatorPanelStoreType, [], [], StoreStateProps>(
    (set, get) => ({
      generatedResources: 0,
      usedTokens: 0,
      lastGeneratedResource: null,
      addGeneratedResource: (): void => {
        const { generatedResources } = get();
        set({ generatedResources: generatedResources + 1 });
      },
      addUsedToken: (amount: number): void => {
        const { usedTokens } = get();
        set({ usedTokens: usedTokens + amount });
      },
      updateLastGeneratedResource: (lastResourceName: string): void => {
        set({ lastGeneratedResource: lastResourceName });
      },
    }),
    {
      name: ASYNC_STORAGE_KEYS.panelIndicators,
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
        generatedResources: state.generatedResources,
        usedTokens: state.usedTokens,
        lastGeneratedResource: state.lastGeneratedResource,
      }),
    }
  )
);
