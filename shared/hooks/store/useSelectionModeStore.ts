import { useStore } from "zustand";

import { SelectionModeStore } from "@/core/store";

const useSelectionModeStore = () => {
  return useStore(SelectionModeStore);
};

export default useSelectionModeStore;
