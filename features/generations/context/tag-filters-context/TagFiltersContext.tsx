import { createContext, useCallback, useEffect, useState } from "react";

import { Tag } from "@/features/tags/types";
import { ProviderProps, TagFiltersContextType } from "./types";

import { eventBus } from "@/core/events/EventBus";

import { useEventbusValue } from "@/shared/hooks/events";

const TagFiltersContext = createContext<TagFiltersContextType | undefined>(
  undefined
);

export const TagFiltersProvider = ({ children }: ProviderProps) => {
  const [searchTagValue, setSearchTagValue] = useState<string>("");
  const [tagFilter, setTagFilter] = useState<Tag | null>(null);
  const [tagType, setTagType] = useState<"promptType" | "resourceType">(
    "promptType"
  );

  const onSearchTagValueChange = (value: string): void => {
    setSearchTagValue(value);
  };

  const onTagFilterChange = (selectedTag: Tag | null): void => {
    setTagFilter(selectedTag);
  };

  const paginatedTags = useEventbusValue(`tags.list.${tagType}.updated`, {
    tags: [],
    hasNextPage: false,
    isFetchingNextPage: false,
    refreshing: false,
  });

  const emitFetchTags = useCallback(() => {
    eventBus.emit(`tags.${tagType}.fetch`, searchTagValue);
  }, [searchTagValue, tagType]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      emitFetchTags();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [emitFetchTags]);

  return (
    <TagFiltersContext.Provider
      value={{
        searchTagValue,
        tagFilter,
        paginatedTags,
        onSearchTagValueChange,
        onTagFilterChange,
        setTagType,
      }}
    >
      {children}
    </TagFiltersContext.Provider>
  );
};

export default TagFiltersContext;
