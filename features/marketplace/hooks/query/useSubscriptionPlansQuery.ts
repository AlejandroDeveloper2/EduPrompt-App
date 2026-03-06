import { useQuery } from "@tanstack/react-query";

import { useCheckNetwork } from "@/shared/hooks/core";

import { getSubscriptionPlans } from "../../services";

const useSubscriptionPlansQuery = () => {
  const { isConnected } = useCheckNetwork();

  return useQuery({
    queryKey: ["plans"],
    enabled: isConnected !== null && isConnected !== undefined,
    queryFn: getSubscriptionPlans,
    staleTime: 60 * 1000,
  });
};

export default useSubscriptionPlansQuery;
