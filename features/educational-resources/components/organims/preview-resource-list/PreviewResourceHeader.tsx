import { useMemo } from "react";
import { ScrollView, View } from "react-native";

import { Tag } from "@/features/tags/types";

import { eventBus } from "@/core/events/EventBus";

import { FORMAT_FILTERS } from "@/shared/constants";
import { AppColors } from "@/shared/styles";

import { useResourcesFiltersContext } from "@/features/educational-resources/hooks/context";
import { usePopUp, useTranslations } from "@/shared/hooks/core";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { ScreenSection, Typography } from "@/shared/components/atoms";
import { FilterTag, Input, NavItem } from "@/shared/components/molecules";
import {
  ComposedDropdownOptionList,
  PopUp,
  TagSelectionPanel,
} from "@/shared/components/organims";

import { dynamicStyles } from "./PreviewResourceList.style";

interface PreviewResourceHeaderProps {
  isDataSync: boolean;
}

const PreviewResourceHeader = ({ isDataSync }: PreviewResourceHeaderProps) => {
  const size = useScreenDimensionsStore();

  const { isOpen, openPopUp, closePopUp } = usePopUp();

  const {
    searchResourceValue,
    searchTagValue,
    tagFilter,
    formatFilter,
    onSearchResourceValueChange,
    onSearchTagValueChange,
    paginatedTags,
    onTagFilterChange,
    onFormatFilterChange,
  } = useResourcesFiltersContext();

  const { t, lang } = useTranslations();

  const styles = useMemo(() => dynamicStyles(size), [size]);

  return (
    <>
      <PopUp
        title={t(
          "resources_translations.resources_list_labels.tag_list_popup_labels.title",
        )}
        icon="pricetag-outline"
        isOpen={isOpen}
        onClose={closePopUp}
      >
        <ComposedDropdownOptionList<Tag>
          ControlPanelComponent={
            <TagSelectionPanel
              tagType="resource_tag"
              searchValue={searchTagValue}
              onSearchChange={(value) => onSearchTagValueChange(value)}
            />
          }
          infinitePaginationOptions={{
            ...paginatedTags,
            onRefetch: () =>
              eventBus.emit("tags.resourceType.refetch.requested", undefined),
            onEndReached: () => {
              if (
                paginatedTags.hasNextPage &&
                !paginatedTags.isFetchingNextPage
              )
                eventBus.emit(
                  "tags.resourceType.fetchNextPage.requested",
                  undefined,
                );
            },
          }}
          optionList={paginatedTags.tags}
          optionIdkey="tagId"
          optionLabelKey="name"
          searchInputPlaceholder={t(
            "resources_translations.resources_list_labels.tag_list_popup_labels.search_input_placeholder",
          )}
          selectedOption={tagFilter}
          onSelectOption={(option) => {
            onTagFilterChange(option);
          }}
        />
      </PopUp>
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
                active={isOpen}
                icon="search-outline"
                onPress={openPopUp}
              />
            </ScrollView>
          </View>
        )}
      </View>
    </>
  );
};

export default PreviewResourceHeader;
