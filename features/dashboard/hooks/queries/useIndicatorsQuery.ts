import { useQuery } from "@tanstack/react-query";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useIndicatorPanelStore } from "../store";

import { getIndicators } from "../../services";

const useIndicatorsQuery = () => {
  const { isConnected } = useCheckNetwork();
  const { indicators, setIndicators } = useIndicatorPanelStore();
  const { token } = useEventbusValue("auth.tokens.getted", {
    token: null,
    refreshToken: null,
  });

  return useQuery({
    queryKey: ["app_indicators"],
    enabled: isConnected !== null && isConnected !== undefined,
    queryFn: async () => {
      if (isConnected && token) {
        const indicators = await getIndicators();
        setIndicators({ ...indicators, sync: true });
        return { ...indicators, sync: true };
      }
      return { ...indicators, sync: false };
    },
    staleTime: Infinity,
  });
};

export default useIndicatorsQuery;
