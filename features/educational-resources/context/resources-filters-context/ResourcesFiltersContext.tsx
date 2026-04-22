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
  const [searchResourceValue, setSearchResourceValue] = useState("");
  const [searchTagValue, setSearchTagValue] = useState("");
  const [formatFilter, setFormatFilter] = useState<ResourceFormatKey | null>(
    null,
  );
  const [tagFilter, setTagFilter] = useState<Tag | null>(null);

  const onSearchResourceValueChange = useCallback((value: string) => {
    setSearchResourceValue(value);
  }, []);

  const onSearchTagValueChange = useCallback((value: string) => {
    setSearchTagValue(value);
  }, []);

  const onFormatFilterChange = useCallback(
    (format: ResourceFormatKey | null) => {
      setFormatFilter(format);
    },
    [],
  );

  const onTagFilterChange = useCallback((tag: Tag | null) => {
    setTagFilter(tag);
  }, []);

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
