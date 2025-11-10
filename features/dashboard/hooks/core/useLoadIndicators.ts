import { useEffect } from "react";

import { useIndicatorPanelStore } from "../store";

const useLoadIndicators = (): void => {
  const { getIndicators } = useIndicatorPanelStore();

  useEffect(() => {
    const loadIndicators = async () => {
      console.log("Carga indicadores");
      await getIndicators();
    };
    loadIndicators();
  }, [getIndicators]);
};

export default useLoadIndicators;
