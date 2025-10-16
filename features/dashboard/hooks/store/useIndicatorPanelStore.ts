import { useStore } from "zustand";

import { IndicatorPanelStore } from "../../store";

const useIndicatorPanelStore = () => {
  return useStore(IndicatorPanelStore);
};

export default useIndicatorPanelStore;
