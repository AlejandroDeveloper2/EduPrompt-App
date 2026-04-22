import { View } from "react-native";

import { TagType } from "@/features/tags/types";

import { useTranslations } from "@/shared/hooks/core";

import { Input } from "../../molecules";
import CreateTagForm from "../create-tag-form/CreateTagForm";

import { styles } from "./TagSelectionPanel.style";

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
    <View style={styles.Container}>
      <CreateTagForm tagType={tagType} />
      <Input<{ searchValue: string }>
        name="searchValue"
        value={searchValue}
        icon="search-outline"
        placeholder={t(
          "common_translations.tag_selection_panel_labels.search_input_placeholder",
        )}
        onChange={(_, value) => onSearchChange(value)}
        onClearInput={() => onSearchChange("")}
      />
    </View>
  );
};

export default TagSelectionPanel;
