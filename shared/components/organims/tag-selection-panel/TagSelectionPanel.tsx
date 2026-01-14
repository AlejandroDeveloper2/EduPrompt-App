import { View } from "react-native";

import { TagType } from "@/features/tags/types";

import { useTranslations } from "@/shared/hooks/core";

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
  const { t } = useTranslations();

  return (
    <View style={TagSelectionPanelStyle.Container}>
      <CreateTagForm tagType={tagType} />
      <Input<{ searchValue: string }>
        name="searchValue"
        value={searchValue}
        icon="search-outline"
        placeholder={t(
          "common-translations.tag-selection-panel-labels.search-input-placeholder"
        )}
        onChange={(_, value) => onSearchChange(value)}
        onClearInput={() => onSearchChange("")}
      />
    </View>
  );
};

export default TagSelectionPanel;
