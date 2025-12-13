import { useStore } from "zustand";

import { OfflineTagsStore } from "../../store";

const useOfflineTagsStore = () => {
  return useStore(OfflineTagsStore);
};

export default useOfflineTagsStore;
