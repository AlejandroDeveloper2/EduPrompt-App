import { useStore } from "zustand";

import { ResourceGenerationStore } from "../../store";

const useGenerationsStore = () => {
  return useStore(ResourceGenerationStore);
};

export default useGenerationsStore;
