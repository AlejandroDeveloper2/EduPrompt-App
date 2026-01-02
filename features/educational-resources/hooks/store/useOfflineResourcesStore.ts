import { useStore } from "zustand";

import { OfflineResourcesStore } from "../../store";

const useOfflineResourcesStore = () => {
  return useStore(OfflineResourcesStore);
};

export default useOfflineResourcesStore;
