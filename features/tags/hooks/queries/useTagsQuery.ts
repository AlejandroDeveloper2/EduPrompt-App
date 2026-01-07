import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { InfiniteQueryOptions, PaginatedResponse } from "@/core/types";
import { BaseFilters, Tag, TagFilters } from "../../types";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useOfflineTagsStore } from "../store";

import { getTags } from "../../services";

const useTagsQuery = (
  baseFilters: BaseFilters | null,
  options: InfiniteQueryOptions
) => {
  const limit = options?.limit ?? 10;

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const { findTags, updateTagsSyncStatus, createTag } = useOfflineTagsStore();

  const queryKey = useMemo(
    () => ["tags", baseFilters?.type ?? null, baseFilters?.name ?? null, limit],
    [baseFilters?.type, baseFilters?.name, limit]
  );

  const query = useInfiniteQuery<PaginatedResponse<Tag>>({
    queryKey,
    initialPageParam: "1",
    queryFn: async ({ pageParam = "1" }) => {
      const filters: TagFilters = {
        ...baseFilters!,
        page: String(pageParam),
        limit: String(limit),
      };

      const localTags = await findTags(filters);

      if (isConnected && isAuthenticated) {
        const paginatedTags = await getTags(filters);

        if (
          paginatedTags.records.length === 0 &&
          localTags.records.length > 0
        ) {
          return localTags;
        }
        /** Sincronizamos las etiquetas online si no estan en el almacenamiento local */
        await Promise.all(
          paginatedTags.records.map(async (tag) => {
            const localTag = localTags.records.find(
              (t) => t.tagId === tag.tagId
            );
            if (!localTag)
              return await createTag({
                tagId: tag.tagId,
                name: tag.name,
                type: tag.type,
              });
          })
        );
        await updateTagsSyncStatus(true);

        return paginatedTags;
      }
      return localTags;
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

export default useTagsQuery;
