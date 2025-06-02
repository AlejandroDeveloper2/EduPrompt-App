import { useStore } from "zustand";

import { IndicatorPanelStore } from "@/lib/store";

const useIndicatorPanelStore = () => {
  return useStore(IndicatorPanelStore);
};

export default useIndicatorPanelStore;
