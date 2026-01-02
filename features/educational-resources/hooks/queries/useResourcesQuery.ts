import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { InfiniteQueryOptions, PaginatedResponse } from "@/core/types";
import { BaseFilters, EducationalResource, ResourceFilters } from "../../types";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useOfflineResourcesStore } from "../store";

import { getEducationalResourcesByUser } from "../../services";

const useResourcesQuery = (
  baseFilters: BaseFilters | null,
  options: InfiniteQueryOptions
) => {
  const limit = options?.limit ?? 10;

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const { findResources, updateResourcesSyncStatus, createResource } =
    useOfflineResourcesStore();

  const queryKey = useMemo(
    () => [
      "resources",
      baseFilters?.tag ?? null,
      baseFilters?.title ?? null,
      baseFilters?.formatKey ?? null,
      limit,
    ],
    [baseFilters?.tag, baseFilters?.title, baseFilters?.formatKey, limit]
  );

  const query = useInfiniteQuery<PaginatedResponse<EducationalResource>>({
    queryKey,
    initialPageParam: "1",
    queryFn: async ({ pageParam = "1" }) => {
      const filters: ResourceFilters = {
        ...baseFilters!,
        page: String(pageParam),
        limit: String(limit),
      };

      const localResources = await findResources(filters);

      if (isConnected && isAuthenticated) {
        const paginatedResources = await getEducationalResourcesByUser(filters);

        if (
          paginatedResources.records.length === 0 &&
          localResources.records.length > 0
        ) {
          return localResources;
        }
        /** Sincronizamos los recursos online si no estan en el almacenamiento local */
        await Promise.all(
          paginatedResources.records.map(async (resource) => {
            const localResource = localResources.records.find(
              (r) => r.resourceId === resource.resourceId
            );
            if (!localResource)
              return await createResource({
                formatKey: resource.formatKey,
                title: resource.title,
                resourceId: resource.resourceId,
                content: resource.content,
                format: resource.format,
                groupTag: resource.groupTag,
              });
          })
        );
        await updateResourcesSyncStatus(true);

        return {
          ...paginatedResources,
          records: paginatedResources.records.map((r) => ({
            ...r,
            sync: true,
          })),
        };
      }
      return localResources;
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.page < lastPage.totalPages
        ? String(lastPage.page + 1)
        : undefined;
    },
    enabled:
      (options?.enabled ?? true) &&
      isConnected !== null &&
      isConnected !== undefined &&
      baseFilters !== null,
    staleTime: Infinity,
  });

  return query;
};

export default useResourcesQuery;
