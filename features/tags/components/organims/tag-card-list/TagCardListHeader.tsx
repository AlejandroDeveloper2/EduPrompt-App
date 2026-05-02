import { View } from "react-native";

import { AppColors } from "@/shared/styles";

import { useTagListUI, useTagSelection } from "@/features/tags/hooks/core";
import { useTagFiltersStore } from "@/features/tags/store";

import { ScreenSection, Typography } from "@/shared/components/atoms";
import { FilterTag, Input } from "@/shared/components/molecules";
import { SelectionOptionsBar } from "@/shared/components/organims";

import { dynamicStyles } from "./TagCardList.style";

const TagCardListHeader = () => {
  const { size, t, actions } = useTagListUI();
  const selectionLogic = useTagSelection();
  const {
    searchTagValue,
    tagTypeFilter,
    onSearchTagValueChange,
    onTagTypeFilterChange,
  } = useTagFiltersStore();

  const styles = dynamicStyles(size);

  return (
    <View style={styles.ListHeaderContainer}>
      {selectionLogic.selectionMode && (
        <SelectionOptionsBar
          isAllSelected={selectionLogic.isAllSelected}
          selectionMode={selectionLogic.selectionMode}
          actionsDisabled={false}
          actions={actions}
          selectionCount={selectionLogic.selectionCount}
          toggleSelectAll={selectionLogic.toggleSelectAll}
          disableSelectionMode={() => selectionLogic.toggleSelectionMode(false)}
        />
      )}
      <ScreenSection
        description={t("tags_translations.tag_list_labels.description")}
        title={t("tags_translations.tag_list_labels.title")}
        icon="pricetag-outline"
      />
      <Input<{ searchValue: string }>
        name="searchValue"
        value={searchTagValue}
        icon="search-outline"
        placeholder={t(
          "tags_translations.tag_list_labels.search_input_placeholder",
        )}
        onChange={(_, value) => onSearchTagValueChange(value)}
        onClearInput={() => onSearchTagValueChange("")}
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
            active={tagTypeFilter === "resource_tag"}
            onPressFilter={() => onTagTypeFilterChange("resource_tag")}
          />
          <FilterTag
            icon="chatbox-ellipses-outline"
            label={t(
              "tags_translations.tag_list_labels.tag_type_filters_labels.prompts",
            )}
            active={tagTypeFilter === "prompt_tag"}
            onPressFilter={() => onTagTypeFilterChange("prompt_tag")}
          />
        </View>
      </View>
    </View>
  );
};

export default TagCardListHeader;
