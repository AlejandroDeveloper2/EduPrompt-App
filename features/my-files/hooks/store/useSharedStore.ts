import { useStore } from "zustand";

import { SharedStore } from "../../store";

const useSharedStore = () => {
  return useStore(SharedStore);
};

export default useSharedStore;
