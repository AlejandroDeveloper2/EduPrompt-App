import { View } from "react-native";

import { TagType } from "@/features/tags/types";
import { AppColors } from "@/shared/styles";

import { useResponsive, useTranslations } from "@/shared/hooks/core";

import { ScreenSection, Typography } from "@/shared/components/atoms";
import { FilterTag, Input } from "@/shared/components/molecules";

import { dynamicStyles } from "./TagCardList.style";

interface TagListHeaderProps {
  selectedFilter: TagType;
  searchValue: string;
  onChangeFilter: (filter: TagType) => void;
  handleSearchChange: (text: string) => void;
  onClearSearchInput: () => void;
}

const TagCardListHeader = ({
  selectedFilter,
  searchValue,
  handleSearchChange,
  onClearSearchInput,
  onChangeFilter,
}: TagListHeaderProps) => {
  const size = useResponsive();
  const { t } = useTranslations();

  const styles = dynamicStyles(size);

  return (
    <View style={styles.ListHeaderContainer}>
      <ScreenSection
        description={t("tags_translations.tag_list_labels.description")}
        title={t("tags_translations.tag_list_labels.title")}
        icon="pricetag-outline"
      />
      <Input<{ searchValue: string }>
        name="searchValue"
        value={searchValue}
        icon="search-outline"
        placeholder={t(
          "tags_translations.tag_list_labels.search_input_placeholder",
        )}
        onChange={(_, value) => handleSearchChange(value)}
        onClearInput={onClearSearchInput}
      />
      <View style={styles.FiltersContainer}>
        <Typography
          text={t(
            "tags_translations.tag_list_labels.tag_type_filters_labels.title",
          )}
          weight="bold"
          type="button"
          textAlign="left"
          color={AppColors.neutral[1000]}
          width="auto"
          icon="filter-outline"
        />
        <View style={styles.FiltersRow}>
          <FilterTag
            icon="book-outline"
            label={t(
              "tags_translations.tag_list_labels.tag_type_filters_labels.resources",
            )}
            active={selectedFilter === "resource_tag"}
            onPressFilter={() => onChangeFilter("resource_tag")}
          />
          <FilterTag
            icon="chatbox-ellipses-outline"
            label={t(
              "tags_translations.tag_list_labels.tag_type_filters_labels.prompts",
            )}
            active={selectedFilter === "prompt_tag"}
            onPressFilter={() => onChangeFilter("prompt_tag")}
          />
        </View>
      </View>
    </View>
  );
};

export default TagCardListHeader;
