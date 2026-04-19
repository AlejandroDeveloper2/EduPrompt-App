export type AppModules =
  | "dashboard"
  | "resources"
  | "prompts"
  | "settings"
  | "tags";
export type ModuleSyncMapState = {
  isDataSynced: boolean;
  syncing: boolean;
  error: string | null;
  handler: () => Promise<void>;
};

export interface StoreStateProps {
  moduleSyncMap: Map<AppModules, ModuleSyncMapState>;
}

export interface StoreActions {
  updateModuleSyncMapState: (
    module: AppModules,
    updates: Partial<Omit<ModuleSyncMapState, "handler">>,
  ) => void;
  runDataSyncronization: (modulesToSync: AppModules[]) => Promise<void>;
}

export type SyncDataStoreType = StoreStateProps & StoreActions;
