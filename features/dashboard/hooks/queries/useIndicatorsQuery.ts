import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

import { useSyncDataStore } from "@/core/store";
import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useIndicatorPanelStore } from "../../store";

import { getIndicators } from "../../services";

const useIndicatorsQuery = () => {
  const { isConnected } = useCheckNetwork();

  const loadIndicators = useIndicatorPanelStore(
    useShallow((state) => state.loadIndicators),
  );

  const updateModuleSyncMapState = useSyncDataStore(
    (state) => state.updateModuleSyncMapState,
  );

  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const query = useQuery({
    queryKey: ["app_indicators"],
    enabled: isConnected !== null && isConnected !== undefined,

    queryFn: async () => {
      const localIndicators = loadIndicators();

      if (isConnected && isAuthenticated) {
        const indicators = await getIndicators();
        const sync = localIndicators.sync;

        updateModuleSyncMapState("dashboard", { isDataSynced: sync });

        return { ...indicators, sync };
      }

      return localIndicators;
    },
    staleTime: Infinity,
  });
  return { indicators: query.data, isLoading: query.isLoading };
};

export default useIndicatorsQuery;
