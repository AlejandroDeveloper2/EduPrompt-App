import { useQuery } from "@tanstack/react-query";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useIndicatorPanelStore } from "../store";

import { getIndicators } from "../../services";

const useIndicatorsQuery = () => {
  const { isConnected } = useCheckNetwork();

  const { setIndicators, loadIndicators } = useIndicatorPanelStore();

  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const query = useQuery({
    queryKey: ["app_indicators"],
    enabled:
      isConnected !== null &&
      isConnected !== undefined &&
      isAuthenticated === true,
    queryFn: async () => {
      const indicators = await getIndicators();
      setIndicators({ ...indicators, sync: true });
      return { ...indicators, sync: true };
    },
    staleTime: Infinity,
  });

  const loadOfflineIndicators = () => {
    const indicators = loadIndicators();
    return { indicators, isLoading: false };
  };

  if (query.data) return { indicators: query.data, isLoading: query.isLoading };

  return loadOfflineIndicators();
};

export default useIndicatorsQuery;
