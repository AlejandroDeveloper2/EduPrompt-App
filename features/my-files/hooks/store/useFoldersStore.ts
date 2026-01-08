import { useStore } from "zustand";

import { FoldersStore } from "../../store";

const useFoldersStore = () => {
  return useStore(FoldersStore);
};

export default useFoldersStore;
