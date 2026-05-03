import { useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { eventBus } from "@/core/events/EventBus";

import {
  useGenerationPromptViewStore,
  useGenerationTagsStore,
} from "../../store";
import useGenerationTags from "./useGenerationTags";

const usePromptSelectionPanel = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const { tags } = useGenerationTags();

  const { tagFilter, onTagFilterChange } = useGenerationTagsStore(
    useShallow((state) => ({
      tagFilter: state.tagFilter,
      onTagFilterChange: state.onTagFilterChange,
    })),
  );

  const setIsTagSelection = useGenerationPromptViewStore(
    useShallow((state) => state.setIsTagSelection),
  );

  const emitFetchPrompts = useCallback(() => {
    eventBus.emit("prompts.fetch", {
      title: searchValue,
      tag: tagFilter ? tagFilter.tagId : undefined,
    });
  }, [searchValue, tagFilter]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      emitFetchPrompts();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [emitFetchPrompts]);

  return {
    tagFilter,
    tags,
    searchValue,
    setSearchValue,
    onTagFilterChange,
    setIsTagSelection,
  };
};

export default usePromptSelectionPanel;
