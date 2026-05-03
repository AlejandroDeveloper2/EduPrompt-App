import { ScrollView, View } from "react-native";

import { FORMAT_FILTERS } from "@/shared/constants";
import { AppColors } from "@/shared/styles";

import { useResourceListUI } from "@/features/educational-resources/hooks/core";
import { useResourceFiltersStore } from "@/features/educational-resources/store";

import { ScreenSection, Typography } from "@/shared/components/atoms";
import { FilterTag, Input, NavItem } from "@/shared/components/molecules";

import { dynamicStyles } from "./PreviewResourceList.style";

const PreviewResourceHeader = () => {
  const { router, size, t, lang, paginatedTags } = useResourceListUI();

  const {
    searchResourceValue,
    tagFilter,
    formatFilter,
    onSearchResourceValueChange,
    onTagFilterChange,
    onFormatFilterChange,
  } = useResourceFiltersStore();

  const styles = dynamicStyles(size);

  return (
    <View style={styles.ListHeaderContainer}>
      <ScreenSection
        description={t(
          "resources_translations.resources_list_labels.description",
        )}
        title={t("resources_translations.resources_list_labels.title")}
        icon="book-outline"
      />
      <Input<{ searchResourceValue: string }>
        name="searchResourceValue"
        value={searchResourceValue}
        icon="search-outline"
        placeholder={t(
          "resources_translations.resources_list_labels.search_input_placeholder",
        )}
        onChange={(_, value) => onSearchResourceValueChange(value)}
        onClearInput={() => onSearchResourceValueChange("")}
      />
      <View style={styles.FilterSection}>
        <Typography
          text={t(
            "resources_translations.resources_list_labels.format_filters_labels.title",
          )}
          weight="medium"
          type="paragraph"
          textAlign="left"
          color={AppColors.neutral[1000]}
          width="auto"
          icon="filter-outline"
        />
        <ScrollView
          contentContainerStyle={styles.Filters}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {FORMAT_FILTERS[lang].map((filter) => (
            <FilterTag
              key={filter.label}
              icon={filter.icon}
              label={filter.label}
              active={filter.formatKey === formatFilter}
              onPressFilter={() => onFormatFilterChange(filter.formatKey)}
            />
          ))}
        </ScrollView>
      </View>
      {paginatedTags.tags.length > 0 && (
        <View style={styles.FilterSection}>
          <Typography
            text={t(
              "resources_translations.resources_list_labels.tag_filters_labels.title",
            )}
            weight="medium"
            type="paragraph"
            textAlign="left"
            color={AppColors.neutral[1000]}
            width="auto"
            icon="filter-outline"
          />
          <ScrollView
            contentContainerStyle={styles.Filters}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <FilterTag
              icon="star-outline"
              label={t(
                "resources_translations.resources_list_labels.tag_filters_labels.all_tags",
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
              onPress={() => router.navigate("/(app)/resource_tags_sheet")}
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default PreviewResourceHeader;
