import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

import { TagType } from "@/features/tags/types";

import { eventBus } from "@/core/events/EventBus";

import { Input } from "../../molecules";
import CreateTagForm from "../create-tag-form/CreateTagForm";

import { TagSelectionPanelStyle } from "./TagSelectionPanel.style";

interface TagSelectionPanelProps {
  tagType: TagType;
}

const TagSelectionPanel = ({ tagType }: TagSelectionPanelProps) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const emitFetchTags = useCallback(() => {
    eventBus.emit("tags.fetch", { type: tagType, name: searchValue });
  }, [tagType, searchValue]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      emitFetchTags();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [emitFetchTags]);

  return (
    <View style={TagSelectionPanelStyle.Container}>
      <CreateTagForm tagType={tagType} />
      <Input<{ searchValue: string }>
        name="searchValue"
        value={searchValue}
        icon="search-outline"
        placeholder="Buscar etiquetas por nombre"
        onChange={(_, value) => setSearchValue(value)}
        onClearInput={() => setSearchValue("")}
      />
    </View>
  );
};

export default TagSelectionPanel;
