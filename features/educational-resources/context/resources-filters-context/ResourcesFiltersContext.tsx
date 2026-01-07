import { createContext, useCallback, useEffect, useState } from "react";

import { Tag } from "@/features/tags/types";
import { ResourceFormatKey } from "../../types";
import { ProviderProps, ResourcesFiltersContextType } from "./types";

import { eventBus } from "@/core/events/EventBus";

import { useEventbusValue } from "@/shared/hooks/events";

const ResourcesFiltersContext = createContext<
  ResourcesFiltersContextType | undefined
>(undefined);

export const ResourcesFiltersProvider = ({ children }: ProviderProps) => {
  const [searchResourceValue, setSearchResourceValue] = useState<string>("");
  const [searchTagValue, setSearchTagValue] = useState<string>("");
  const [formatFilter, setFormatFilter] = useState<ResourceFormatKey | null>(
    null
  );
  const [tagFilter, setTagFilter] = useState<Tag | null>(null);

  const onSearchResourceValueChange = (value: string): void => {
    setSearchResourceValue(value);
  };

  const onSearchTagValueChange = (value: string): void => {
    setSearchTagValue(value);
  };

  const onFormatFilterChange = (
    selectedFormat: ResourceFormatKey | null
  ): void => {
    setFormatFilter(selectedFormat);
  };

  const onTagFilterChange = (selectedTag: Tag | null): void => {
    setTagFilter(selectedTag);
  };

  const paginatedTags = useEventbusValue("tags.list.resourceType.updated", {
    tags: [],
    hasNextPage: false,
    isFetchingNextPage: false,
    refreshing: false,
  });

  const emitFetchTags = useCallback(() => {
    eventBus.emit("tags.resourceType.fetch", searchTagValue);
  }, [searchTagValue]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      emitFetchTags();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [emitFetchTags]);

  return (
    <ResourcesFiltersContext.Provider
      value={{
        searchResourceValue,
        searchTagValue,
        formatFilter,
        tagFilter,
        paginatedTags,
        onSearchResourceValueChange,
        onSearchTagValueChange,
        onFormatFilterChange,
        onTagFilterChange,
      }}
    >
      {children}
    </ResourcesFiltersContext.Provider>
  );
};

export default ResourcesFiltersContext;
