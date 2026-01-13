import { useStore } from "zustand";

import { LanguageStore } from "@/core/store";

const useLanguageStore = () => {
  return useStore(LanguageStore);
};

export default useLanguageStore;
