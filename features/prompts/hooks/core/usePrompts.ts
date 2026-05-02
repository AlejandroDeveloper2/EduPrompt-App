import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { usePromptFiltersStore } from "../../store";
import { usePromptsQuery } from "../queries";

const usePrompts = () => {
  const { searchPromptValue, tagFilter } = usePromptFiltersStore(
    useShallow((state) => ({
      searchPromptValue: state.searchPromptValue,
      tagFilter: state.tagFilter,
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
  } = usePromptsQuery(
    { title: searchPromptValue, tag: tagFilter?.tagId },
    { limit: 10 },
  );

  const prompts = useMemo(
    () => data?.pages.flatMap((p) => p.records) ?? [],
    [data],
  );

  return {
    searchPromptValue,
    tagFilter,
    prompts,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  };
};

export default usePrompts;
