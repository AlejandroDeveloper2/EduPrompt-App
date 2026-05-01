import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { useEventbusValue } from "@/shared/hooks/events";
import { usePromptFiltersStore } from "../../store";

import { eventBus } from "@/core/events/EventBus";

const usePromptTags = () => {
  const searchTagValue = usePromptFiltersStore(
    useShallow((state) => state.searchTagValue),
  );

  const paginatedTags = useEventbusValue("tags.list.promptType.updated", {
    tags: [],
    hasNextPage: false,
    isFetchingNextPage: false,
    refreshing: false,
  });

  useEffect(() => {
    const id = setTimeout(() => {
      eventBus.emit("tags.promptType.fetch", searchTagValue);
    }, 300);
    return () => clearTimeout(id);
  }, [searchTagValue]);

  return paginatedTags;
};

export default usePromptTags;
