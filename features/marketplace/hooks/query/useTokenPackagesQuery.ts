import { useQuery } from "@tanstack/react-query";

import { useCheckNetwork } from "@/shared/hooks/core";

import { getTokenPackages } from "../../services";

const useTokenPackagesQuery = () => {
  const { isConnected } = useCheckNetwork();

  return useQuery({
    queryKey: ["packages"],
    enabled: isConnected !== null && isConnected !== undefined,
    queryFn: getTokenPackages,
    staleTime: 60 * 1000,
  });
};

export default useTokenPackagesQuery;
