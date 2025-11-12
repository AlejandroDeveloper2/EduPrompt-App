/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { useIndicatorPanelStore } from "../store";

const useLoadIndicators = (): void => {
  const { getIndicators } = useIndicatorPanelStore();

  useEffect(() => {
    const loadIndicators = async () => {
      await getIndicators();
    };
    loadIndicators();
  }, []);
};

export default useLoadIndicators;
