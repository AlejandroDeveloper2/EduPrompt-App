import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";

import { AppColors } from "@/shared/styles";

import { usePromptTags } from "@/features/prompts/hooks/core";
import { usePromptFiltersStore } from "@/features/prompts/store";
import { useResponsive, useTranslations } from "@/shared/hooks/core";

import { ScreenSection, Typography } from "@/shared/components/atoms";
import { FilterTag, Input, NavItem } from "@/shared/components/molecules";

import { dynamicStyles } from "./PromptCardList.style";

interface PromptCardListHeaderProps {
  isDataSync: boolean;
}

const PromptCardListHeader = ({ isDataSync }: PromptCardListHeaderProps) => {
  const router = useRouter();
  const size = useResponsive();
  const { t } = useTranslations();

  const {
    searchPromptValue,
    tagFilter,
    onSearchPromptValueChange,
    onTagFilterChange,
  } = usePromptFiltersStore();

  const paginatedTags = usePromptTags();

  const styles = dynamicStyles(size);

  return (
    <View style={styles.ListHeaderContainer}>
      <ScreenSection
        description={t("prompts_translations.prompt_list_labels.description")}
        title={t("prompts_translations.prompt_list_labels.title")}
        icon="bulb-outline"
      />
      <Input<{ searchPromptValue: string }>
        name="searchPromptValue"
        value={searchPromptValue}
        icon="search-outline"
        placeholder={t(
          "prompts_translations.prompt_list_labels.search_input_placeholder",
        )}
        onChange={(_, value) => onSearchPromptValueChange(value)}
        onClearInput={() => onSearchPromptValueChange("")}
      />
      <View style={styles.FiltersContainer}>
        <Typography
          text={t(
            "prompts_translations.prompt_list_labels.prompt_tag_filters_labels.title",
          )}
          weight="bold"
          type="button"
          textAlign="left"
          color={AppColors.neutral[1000]}
          width="auto"
          icon="filter-outline"
        />
        <ScrollView
          horizontal
          contentContainerStyle={styles.FiltersRow}
          showsHorizontalScrollIndicator={false}
        >
          <FilterTag
            icon="star-outline"
            label={t(
              "prompts_translations.prompt_list_labels.prompt_tag_filters_labels.all_filter",
            )}
            active={tagFilter === null}
            onPressFilter={() => onTagFilterChange(null)}
          />
          {paginatedTags.tags.slice(0, 3).map((tag) => (
            <FilterTag
              key={tag.tagId}
              icon="pricetag-outline"
              label={tag.name}
              active={tagFilter?.tagId === tag.tagId}
              onPressFilter={() => onTagFilterChange(tag)}
            />
          ))}
          <NavItem
            active={false}
            icon="search-outline"
            onPress={() => router.navigate("/(app)/prompt_tags_sheet")}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default PromptCardListHeader;
