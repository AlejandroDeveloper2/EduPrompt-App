import { useQuery } from "@tanstack/react-query";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useSyncDataStore } from "@/shared/hooks/store";
import { useIndicatorPanelStore } from "../store";

import { getIndicators } from "../../services";

const useIndicatorsQuery = () => {
  const { isConnected } = useCheckNetwork();

  const { loadIndicators } = useIndicatorPanelStore();

  const { updateModuleSyncMapState } = useSyncDataStore();

  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const loadOfflineIndicators = () => {
    const indicators = loadIndicators();
    return { indicators, isLoading: false };
  };

  const query = useQuery({
    queryKey: ["app_indicators"],
    enabled:
      isConnected !== null &&
      isConnected !== undefined &&
      isAuthenticated === true,
    queryFn: async () => {
      const indicators = await getIndicators();
      const sync = loadOfflineIndicators().indicators.sync;

      updateModuleSyncMapState("dashboard", { isDataSynced: sync });

      return { ...indicators, sync };
    },
    staleTime: Infinity,
  });

  if (query.data) return { indicators: query.data, isLoading: query.isLoading };

  return loadOfflineIndicators();
};

export default useIndicatorsQuery;
