import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { useResourceFiltersStore } from "../../store";
import { useResourcesQuery } from "../queries";

const useResources = () => {
  const { searchResourceValue, tagFilter, formatFilter } =
    useResourceFiltersStore(
      useShallow((state) => ({
        searchResourceValue: state.searchResourceValue,
        tagFilter: state.tagFilter,
        formatFilter: state.formatFilter,
      })),
    );

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useResourcesQuery(
    {
      title: searchResourceValue,
      tag: tagFilter?.tagId,
      formatKey: formatFilter ?? undefined,
    },
    { limit: 10 },
  );

  const resources = useMemo(
    () => data?.pages.flatMap((r) => r.records) ?? [],
    [data],
  );

  return {
    searchResourceValue,
    formatFilter,
    tagFilter,
    resources,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  };
};

export default useResources;
