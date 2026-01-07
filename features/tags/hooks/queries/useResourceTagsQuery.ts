import { useEffect } from "react";

import { InfiniteQueryOptions } from "@/core/types";
import { BaseFilters } from "../../types";

import { eventBus } from "@/core/events/EventBus";

import useTagsQuery from "./useTagsQuery";

const useResourceTagsQuery = (
  baseFilters: BaseFilters | null,
  options: InfiniteQueryOptions
) => {
  const query = useTagsQuery(baseFilters, options);

  useEffect(() => {
    if (query.data) {
      const tags = query.data.pages.flatMap((page) => page.records);
      eventBus.emit("tags.list.resourceType.updated", {
        tags,
        hasNextPage: query.hasNextPage,
        isFetchingNextPage: query.isFetchingNextPage,
        refreshing: query.isRefetching,
      });
    }
  }, [
    query.data,
    query.hasNextPage,
    query.isFetchingNextPage,
    query.isRefetching,
  ]);

  return query;
};

export default useResourceTagsQuery;
