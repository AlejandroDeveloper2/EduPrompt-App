import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { useTagFiltersStore } from "../../store";
import { useTagsQuery } from "../queries";

const useTags = () => {
  const { searchTagValue, tagTypeFilter } = useTagFiltersStore(
    useShallow((state) => ({
      searchTagValue: state.searchTagValue,
      tagTypeFilter: state.tagTypeFilter,
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
  } = useTagsQuery(
    { name: searchTagValue, type: tagTypeFilter },
    { limit: 10 },
  );

  const tags = useMemo(
    () => data?.pages.flatMap((p) => p.records) ?? [],
    [data],
  );

  return {
    searchTagValue,
    tagTypeFilter,
    tags,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  };
};

export default useTags;
