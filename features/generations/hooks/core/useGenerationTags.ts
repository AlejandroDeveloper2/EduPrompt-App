import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { eventBus } from "@/core/events/EventBus";

import { useEventbusValue } from "@/shared/hooks/events";
import { useGenerationTagsStore } from "../../store";

const useGenerationTags = () => {
  const { tagType, searchTagValue } = useGenerationTagsStore(
    useShallow((state) => ({
      tagType: state.tagType,
      searchTagValue: state.searchTagValue,
      tagFilter: state.tagFilter,
    })),
  );

  const paginatedPromptTags = useEventbusValue("tags.list.promptType.updated", {
    tags: [],
    hasNextPage: false,
    isFetchingNextPage: false,
    refreshing: false,
  });

  const paginatedResourceTags = useEventbusValue(
    "tags.list.resourceType.updated",
    {
      tags: [],
      hasNextPage: false,
      isFetchingNextPage: false,
      refreshing: false,
    },
  );

  useEffect(() => {
    const handleFetchTags = (): void => {
      if (tagType === "promptType")
        eventBus.emit("tags.promptType.fetch", searchTagValue);
      else eventBus.emit("tags.resourceType.fetch", searchTagValue);
    };

    if (searchTagValue) {
      const timeoutId = setTimeout(handleFetchTags, 300);
      return () => clearTimeout(timeoutId);
    }
    handleFetchTags();
  }, [searchTagValue, tagType]);

  const paginatedTags = useMemo(
    () =>
      tagType === "promptType" ? paginatedPromptTags : paginatedResourceTags,
    [tagType, paginatedPromptTags, paginatedResourceTags],
  );

  return paginatedTags;
};
export default useGenerationTags;
