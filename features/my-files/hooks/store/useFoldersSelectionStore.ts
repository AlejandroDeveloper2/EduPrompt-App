import { useStore } from "zustand";

import { FoldersSelectionStore } from "../../store";

const useFoldersSelectionStore = () => {
  return useStore(FoldersSelectionStore);
};

export default useFoldersSelectionStore;
