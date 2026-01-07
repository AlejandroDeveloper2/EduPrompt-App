import { createContext, useCallback, useEffect, useState } from "react";

import { Tag } from "@/features/tags/types";
import { PromptFiltersContextType, ProviderProps } from "./types";

import { eventBus } from "@/core/events/EventBus";

import { useEventbusValue } from "@/shared/hooks/events";

const PromptFiltersContext = createContext<
  PromptFiltersContextType | undefined
>(undefined);

export const PromptFiltersProvider = ({ children }: ProviderProps) => {
  const [searchPromptValue, setSearchPromptValue] = useState<string>("");
  const [searchTagValue, setSearchTagValue] = useState<string>("");
  const [tagFilter, setTagFilter] = useState<Tag | null>(null);

  const onSearchPromptValueChange = (value: string): void => {
    setSearchPromptValue(value);
  };

  const onSearchTagValueChange = (value: string): void => {
    setSearchTagValue(value);
  };

  const onTagFilterChange = (selectedTag: Tag | null): void => {
    setTagFilter(selectedTag);
  };

  const paginatedTags = useEventbusValue("tags.list.promptType.updated", {
    tags: [],
    hasNextPage: false,
    isFetchingNextPage: false,
    refreshing: false,
  });

  const emitFetchTags = useCallback(() => {
    eventBus.emit("tags.promptType.fetch", searchTagValue);
  }, [searchTagValue]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      emitFetchTags();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [emitFetchTags]);

  return (
    <PromptFiltersContext.Provider
      value={{
        searchPromptValue,
        searchTagValue,
        tagFilter,
        paginatedTags,
        onSearchPromptValueChange,
        onSearchTagValueChange,
        onTagFilterChange,
      }}
    >
      {children}
    </PromptFiltersContext.Provider>
  );
};

export default PromptFiltersContext;
