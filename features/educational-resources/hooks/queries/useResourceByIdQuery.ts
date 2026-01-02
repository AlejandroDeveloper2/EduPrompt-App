import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { EducationalResource } from "../../types";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useOfflineResourcesStore } from "../store";

import { getEducationalResourceById } from "../../services";

const useResourceByIdQuery = (resourceId: string) => {
  const [localResource, setLocalResource] =
    useState<EducationalResource | null>(null);

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const { isLoading, findResourceById, updateResourcesSyncStatus } =
    useOfflineResourcesStore();

  const query = useQuery({
    queryKey: ["resource", resourceId],
    enabled:
      isConnected !== null && isConnected !== undefined && isAuthenticated,
    queryFn: async () => {
      const resource = await getEducationalResourceById(resourceId);
      await updateResourcesSyncStatus(true, resourceId);
      return { ...resource, sync: true };
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    const loadResourceById = async () => {
      if (!query.data) {
        const localResource = await findResourceById(resourceId);
        setLocalResource(localResource);
      }
    };
    loadResourceById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data, resourceId]);

  return {
    resource: query.data ?? localResource,
    isLoading: isAuthenticated && isConnected ? query.isLoading : isLoading,
  };
};

export default useResourceByIdQuery;
