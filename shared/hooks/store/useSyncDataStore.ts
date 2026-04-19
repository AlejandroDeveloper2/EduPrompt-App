import { useStore } from "zustand";

import { SyncDataStore } from "@/core/store";

const useSyncDataStore = () => {
  return useStore(SyncDataStore);
};

export default useSyncDataStore;
