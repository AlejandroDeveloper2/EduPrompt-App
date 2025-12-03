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

  return {
    isPending,
    updateIndicators: (indicators: Partial<Indicator>) => {
      /** Actualización inmediata offline */
      setIndicators({ ...indicators, sync: false });

      /** Actualización online */
      if (isConnected && isAuthenticated) {
        mutate(indicators);
        setIndicators({ ...indicators, sync: true });
      }
    },
  };
};

export default useUpdateIndicators;
