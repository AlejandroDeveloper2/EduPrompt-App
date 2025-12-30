import { useStore } from "zustand";

import { OfflinePromptsStore } from "../../store";

const useOfflinePromptsStore = () => {
  return useStore(OfflinePromptsStore);
};

export default useOfflinePromptsStore;
