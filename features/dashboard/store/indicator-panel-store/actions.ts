import Storage from "expo-sqlite/kv-store";
import { StateCreator } from "zustand";

import {
  IndicatorPanelStoreType,
  StoreActions,
  StoreStateProps,
} from "./store-types";

const STORAGE_KEY: string = "panel_indicators";

export const storeActions: StateCreator<
  IndicatorPanelStoreType,
  [],
  [],
  StoreActions
> = (set) => ({
  getIndicators: async (): Promise<void> => {
    try {
      const indicators = await Storage.getItem(STORAGE_KEY);

      if (!indicators) return;

      const {
        generatedResources,
        usedTokens,
        lastGeneratedResource,
      }: StoreStateProps = JSON.parse(indicators);

      set({
        generatedResources,
        usedTokens,
        lastGeneratedResource,
      });
    } catch (e: unknown) {
      console.error(e);
    }
  },
  addGeneratedResource: async (): Promise<void> => {
    try {
      const indicators = await Storage.getItem(STORAGE_KEY);
      if (!indicators) {
        await Storage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            usedTokens: 0,
            lastGeneratedResource: "",
            generatedResources: 1,
          })
        );
        set(({ generatedResources }) => ({
          generatedResources: generatedResources + 1,
        }));
        return;
      }

      const storagedIndicators: StoreStateProps = JSON.parse(indicators);

      await Storage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...storagedIndicators,
          generatedResources: storagedIndicators.generatedResources + 1,
        })
      );

      set({ generatedResources: storagedIndicators.generatedResources + 1 });
    } catch (e: unknown) {
      console.error(e);
    }
  },
  addUsedToken: async (amount: number): Promise<void> => {
    try {
      const indicators = await Storage.getItem(STORAGE_KEY);

      if (!indicators) {
        await Storage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            usedTokens: amount,
            lastGeneratedResource: "",
            generatedResources: 0,
          })
        );
        set(({ usedTokens }) => ({
          usedTokens: usedTokens + amount,
        }));
        return;
      }

      const storagedIndicators: StoreStateProps = JSON.parse(indicators);

      await Storage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...storagedIndicators,
          usedTokens: storagedIndicators.usedTokens + amount,
        })
      );

      set({ usedTokens: storagedIndicators.usedTokens + amount });
    } catch (e: unknown) {
      console.error(e);
    }
  },
  updateLastGeneratedResource: async (lastResourceName: string) => {
    try {
      const indicators = await Storage.getItem(STORAGE_KEY);
      if (!indicators) {
        await Storage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            usedTokens: 0,
            lastGeneratedResource: lastResourceName,
            generatedResources: 0,
          })
        );
        set({ lastGeneratedResource: lastResourceName });
        return;
      }

      const storagedIndicators: StoreStateProps = JSON.parse(indicators);

      await Storage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...storagedIndicators,
          lastGeneratedResource: lastResourceName,
        })
      );

      set({ lastGeneratedResource: storagedIndicators.lastGeneratedResource });
    } catch (e: unknown) {
      console.error(e);
    }
  },
});
