import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { useEventbusValue } from "@/shared/hooks/events";
import { useResourceFiltersStore } from "../../store";

import { eventBus } from "@/core/events/EventBus";

const useResourceTags = () => {
  const searchTagValue = useResourceFiltersStore(
    useShallow((state) => state.searchTagValue),
  );

  const paginatedTags = useEventbusValue("tags.list.resourceType.updated", {
    tags: [],
    hasNextPage: false,
    isFetchingNextPage: false,
    refreshing: false,
  });

  useEffect(() => {
    const id = setTimeout(() => {
      eventBus.emit("tags.resourceType.fetch", searchTagValue);
    }, 300);
    return () => clearTimeout(id);
  }, [searchTagValue]);

  return paginatedTags;
};

export default useResourceTags;
