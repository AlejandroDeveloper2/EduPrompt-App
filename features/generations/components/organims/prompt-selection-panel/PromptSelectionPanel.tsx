import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { Tag } from "@/features/tags/types";

import { AppColors } from "@/shared/styles";

import { eventBus } from "@/core/events/EventBus";

import { useEventbusValue } from "@/shared/hooks/events";

import { Typography } from "@/shared/components/atoms";
import { FilterTag, Input, NavItem } from "@/shared/components/molecules";

import { PromptSelectionPanelStyle } from "./PromptSelectionPanel.style";

interface PromptSelectionPanelProps {
  isTagSelection: boolean;
  enableTagSelection: () => void;
}

const PromptSelectionPanel = ({
  isTagSelection,
  enableTagSelection,
}: PromptSelectionPanelProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  const { tags } = useEventbusValue("tags.list.promptType.updated", {
    tags: [],
    hasNextPage: false,
    isFetchingNextPage: false,
    refreshing: false,
  });

  const emitFetchPrompts = useCallback(() => {
    eventBus.emit("prompts.fetch", {
      title: searchValue,
      tag: selectedTag ? selectedTag.tagId : undefined,
    });
  }, [searchValue, selectedTag]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      emitFetchPrompts();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [emitFetchPrompts]);

  const { Container, FiltersContainer, FilterList } = PromptSelectionPanelStyle;

  return (
    <View style={Container}>
      <Input<{ searchValue: string }>
        name="searchValue"
        value={searchValue}
        icon="search-outline"
        placeholder="Buscar prompts por titulo"
        onChange={(_, value) => setSearchValue(value)}
        onClearInput={() => setSearchValue("")}
      />
      <View style={FiltersContainer}>
        <Typography
          text="Filtrar por etiqueta"
          weight="bold"
          type="button"
          textAlign="left"
          color={AppColors.neutral[1000]}
          width="auto"
          icon="filter-outline"
        />
        <ScrollView
          horizontal
          contentContainerStyle={FilterList}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          <FilterTag
            icon="star-outline"
            label="Todas"
            active={selectedTag === null}
            onPressFilter={() => setSelectedTag(null)}
          />
          {tags.slice(0, 3).map((tag) => (
            <FilterTag
              key={tag.tagId}
              icon="pricetag-outline"
              label={tag.name}
              active={selectedTag?.tagId === tag.tagId}
              onPressFilter={() => setSelectedTag(tag)}
            />
          ))}
          <NavItem
            active={isTagSelection}
            icon="search-outline"
            onPress={enableTagSelection}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default PromptSelectionPanel;
