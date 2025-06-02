import { useEffect } from "react";

import { useIndicatorPanelStore } from "../store";

const useLoadIndicators = (): void => {
  const { getIndicators } = useIndicatorPanelStore();

  useEffect(() => {
    getIndicators();
  }, [getIndicators]);
};

export default useLoadIndicators;
