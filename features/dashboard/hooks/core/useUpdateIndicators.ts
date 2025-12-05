import { useCallback } from "react";

import { Indicator } from "../../types";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useUpdateIndicatorsMutation } from "../mutations";
import { useIndicatorPanelStore } from "../store";

const useUpdateIndicators = () => {
  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  /** Offline */
  const { setIndicators } = useIndicatorPanelStore();

  /** Online */
  const { mutate, isPending } = useUpdateIndicatorsMutation();

  const updateIndicators = useCallback(
    (indicators: Partial<Indicator>) => {
      /** Actualización inmediata offline */
      setIndicators({ ...indicators, sync: false });

      /** Actualización online */
      if (isConnected && isAuthenticated) {
        mutate(indicators);
        setIndicators({ ...indicators, sync: true });
      }
    },
    [isAuthenticated, isConnected, mutate, setIndicators]
  );

  return {
    isPending,
    updateIndicators,
  };
};

export default useUpdateIndicators;
