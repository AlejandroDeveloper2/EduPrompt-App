import AsyncStorage from "expo-sqlite/kv-store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

import { LocalIndicator } from "../../types";
import { IndicatorPanelStoreType, StoreStateProps } from "./store-types";

export const IndicatorPanelStore = create<IndicatorPanelStoreType>()(
  persist<IndicatorPanelStoreType, [], [], StoreStateProps>(
    (set, get) => ({
      indicators: {
        sync: false,
        generatedResources: 0,
        usedTokens: 0,
        lastGeneratedResource: null,
        dowloadedResources: 0,
        savedResources: 0,
      },
      loadIndicators: (): LocalIndicator => {
        const { indicators } = get();
        return indicators;
      },
      setIndicators: (updatedIndicators): void => {
        set(({ indicators }) => ({
          indicators: { ...indicators, ...updatedIndicators },
        }));
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
        indicators: state.indicators,
      }),
    }
  )
);
