import { useStore } from "zustand";

import { GenerationsSelectionStore } from "../../store";

const useGenerationsSelectionStore = () => {
  return useStore(GenerationsSelectionStore);
};

export default useGenerationsSelectionStore;
