import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Tag } from "@/features/tags/types";
import { ProviderProps, TagFiltersContextType } from "./types";

import { eventBus } from "@/core/events/EventBus";

import { useEventbusValue } from "@/shared/hooks/events";

const TagFiltersContext = createContext<TagFiltersContextType | undefined>(
  undefined,
);

export const TagFiltersProvider = ({ children }: ProviderProps) => {
  const [searchTagValue, setSearchTagValue] = useState<string>("");
  const [tagFilter, setTagFilter] = useState<Tag | null>(null);
  const [tagType, setTagTypeState] = useState<"promptType" | "resourceType">(
    "promptType",
  );

  const onSearchTagValueChange = (value: string): void => {
    setSearchTagValue(value);
  };

  const onTagFilterChange = (selectedTag: Tag | null): void => {
    setTagFilter(selectedTag);
  };

  const setTagType = useCallback(
    (type: "promptType" | "resourceType"): void => {
      if (type === tagType) return;
      setTagTypeState(type);
      setSearchTagValue("");
      setTagFilter(null);
    },
    [tagType],
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

    // Si hay texto de búsqueda aplicar debounce, si no, fetch inmediato
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
