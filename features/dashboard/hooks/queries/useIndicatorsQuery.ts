import { useQuery } from "@tanstack/react-query";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useIndicatorPanelStore } from "../store";

import { getSessionToken } from "@/shared/utils";
import { getIndicators } from "../../services";

const useIndicatorsQuery = () => {
  const { isConnected } = useCheckNetwork();
  const { indicators, setIndicators } = useIndicatorPanelStore();

  return useQuery({
    queryKey: ["app_indicators"],
    enabled: isConnected !== null && isConnected !== undefined,
    queryFn: async () => {
      const token = await getSessionToken();
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
