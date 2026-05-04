import AsyncStorage from "expo-sqlite/kv-store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  AppModules,
  ModuleSyncMapState,
  StoreStateProps,
  SyncDataStoreType,
} from "./store-types";

import { eventBus } from "@/core/events/EventBus";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

export const useSyncDataStore = create<SyncDataStoreType>()(
  persist<SyncDataStoreType, [], [], StoreStateProps>(
    (set, get) => ({
      moduleSyncMap: new Map<AppModules, ModuleSyncMapState>([
        [
          "dashboard",
          {
            isDataSynced: false,
            syncing: false,
            error: null,
            handler: async () => {
              eventBus.emit("dashboard.syncData.requested", undefined);
            },
          },
        ],
        [
          "prompts",
          {
            isDataSynced: false,
            syncing: false,
            error: null,
            handler: async () => {
              eventBus.emit("prompts.syncData.requested", undefined);
            },
          },
        ],
        [
          "resources",
          {
            isDataSynced: false,
            syncing: false,
            error: null,
            handler: async () => {
              eventBus.emit("resources.syncData.requested", undefined);
            },
          },
        ],
        [
          "settings",
          {
            isDataSynced: false,
            syncing: false,
            error: null,
            handler: async () => {
              eventBus.emit("userProfile.syncData.requested", undefined);
            },
          },
        ],
        [
          "tags",
          {
            isDataSynced: false,
            syncing: false,
            error: null,
            handler: async () => {
              eventBus.emit("tags.syncData.requested", undefined);
            },
          },
        ],
      ]),
      isGlobalSyncing: false,

      updateModuleSyncMapState: (module, updates): void => {
        const { moduleSyncMap } = get();

        const element = moduleSyncMap.get(module);

        if (!element) return;

        const updatedModuleSyncMap = new Map(moduleSyncMap).set(module, {
          ...element,
          ...updates,
        });

        set({ moduleSyncMap: updatedModuleSyncMap });
      },

      runDataSyncronization: async (modulesToSync): Promise<boolean> => {
        const { isGlobalSyncing, moduleSyncMap, updateModuleSyncMapState } =
          get();

        if (isGlobalSyncing || modulesToSync.length === 0) return false;

        set({ isGlobalSyncing: true });

        const promises = modulesToSync.map(async (module) => {
          const element = moduleSyncMap.get(module);
          if (!element) return;

          updateModuleSyncMapState(module, { syncing: true, error: null });

          try {
            await element.handler();
            updateModuleSyncMapState(module, {
              isDataSynced: true,
              syncing: false,
            });
          } catch (error) {
            const e = error as Error;
            updateModuleSyncMapState(module, {
              syncing: false,
              error: e.message,
            });
            console.error(`Sync failed for ${module}:`, error);
          }
        });

        await Promise.all(promises);
        set({ isGlobalSyncing: false });
        return true;
      },
    }),
    {
      name: ASYNC_STORAGE_KEYS.moduleSyncMap,
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          if (!value) return null;

          const parsedValue = JSON.parse(value);

          // Transformar el objeto plano a un Map si es necesario
          if (name === ASYNC_STORAGE_KEYS.moduleSyncMap && parsedValue) {
            return new Map(parsedValue);
          }

          return parsedValue;
        },
        setItem: async (name, value) => {
          // Convertir Map a un objeto plano antes de guardar
          const valueToStore =
            name === ASYNC_STORAGE_KEYS.moduleSyncMap && value instanceof Map
              ? Array.from(value.entries())
              : value;

          await AsyncStorage.setItem(name, JSON.stringify(valueToStore));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
      partialize: (state) => ({
        isGlobalSyncing: state.isGlobalSyncing,
        moduleSyncMap: state.moduleSyncMap,
      }),
    },
  ),
);
