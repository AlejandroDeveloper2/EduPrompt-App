import { View } from "react-native";

import { TagType } from "@/features/tags/types";

import { Input } from "../../molecules";
import CreateTagForm from "../create-tag-form/CreateTagForm";

import { TagSelectionPanelStyle } from "./TagSelectionPanel.style";

interface TagSelectionPanelProps {
  tagType: TagType;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const TagSelectionPanel = ({
  tagType,
  searchValue,
  onSearchChange,
}: TagSelectionPanelProps) => {
  return (
    <View style={TagSelectionPanelStyle.Container}>
      <CreateTagForm tagType={tagType} />
      <Input<{ searchValue: string }>
        name="searchValue"
        value={searchValue}
        icon="search-outline"
        placeholder="Buscar etiquetas por nombre"
        onChange={(_, value) => onSearchChange(value)}
        onClearInput={() => onSearchChange("")}
      />
    </View>
  );
};

export default TagSelectionPanel;
