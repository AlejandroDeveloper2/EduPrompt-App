import { useStore } from "zustand";

import { ResourcesSelectionStore } from "../../store";

const useResourcesSelectionStore = () => {
  return useStore(ResourcesSelectionStore);
};

export default useResourcesSelectionStore;
