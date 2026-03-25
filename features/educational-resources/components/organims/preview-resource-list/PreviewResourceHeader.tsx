import { ScrollView, View } from "react-native";

import { Tag } from "@/features/tags/types";

import { eventBus } from "@/core/events/EventBus";

import { FORMAT_FILTERS } from "@/shared/constants";
import { AppColors } from "@/shared/styles";

import { useResourcesFiltersContext } from "@/features/educational-resources/hooks/context";
import { useSyncResourcesMutation } from "@/features/educational-resources/hooks/mutations";
import { useAnimatedPopUp } from "@/shared/hooks/animations";
import { useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { ScreenSection, Typography } from "@/shared/components/atoms";
import {
  FilterTag,
  InfoCard,
  Input,
  NavItem,
} from "@/shared/components/molecules";
import {
  ComposedDropdownOptionList,
  PopUp,
  TagSelectionPanel,
} from "@/shared/components/organims";

import { PreviewResourceListStyle } from "./PreviewResourceList.style";

interface PreviewResourceHeaderProps {
  isDataSync: boolean;
}

const PreviewResourceHeader = ({ isDataSync }: PreviewResourceHeaderProps) => {
  const size = useScreenDimensionsStore();

  const userProfile = useEventbusValue("userProfile.user.updated", null);
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const {
    isPopUpMounted,
    isPopUpVisible,
    animatedPopUpStyle,
    dragGesture,
    onOpenPopUp,
    onClosePopUp,
  } = useAnimatedPopUp();

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

  const { isPending, syncResources } = useSyncResourcesMutation();

  const { t, lang } = useTranslations();

  const previewResourceListStyle = PreviewResourceListStyle(size);

  return (
    <>
      <PopUp
        title={t(
          "resources_translations.resources_list_labels.tag_list_popup_labels.title"
        )}
        icon="pricetag-outline"
        isPopUpMounted={isPopUpMounted}
        gesture={dragGesture}
        animatedPopUpStyle={animatedPopUpStyle}
        onClosePopUp={onClosePopUp}
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
                  undefined
                );
            },
          }}
          optionList={paginatedTags.tags}
          optionIdkey="tagId"
          optionLabelKey="name"
          searchInputPlaceholder={t(
            "resources_translations.resources_list_labels.tag_list_popup_labels.search_input_placeholder"
          )}
          selectedOption={tagFilter}
          onSelectOption={(option) => {
            onTagFilterChange(option);
          }}
        />
      </PopUp>
      <View style={previewResourceListStyle.ListHeaderContainer}>
        {userProfile &&
          !isDataSync &&
          !userProfile.userPreferences.autoSync &&
          isAuthenticated && (
            <InfoCard
              title={t(
                "resources_translations.resources_list_labels.syncronization_card_labels.title"
              )}
              description={t(
                "resources_translations.resources_list_labels.syncronization_card_labels.description"
              )}
              buttonData={{
                onPress: syncResources,
                icon: "sync-outline",
                label: t(
                  "resources_translations.resources_list_labels.syncronization_card_labels.btn_sync"
                ),
                loading: isPending,
                loadingMessage: t(
                  "resources_translations.resources_list_labels.syncronization_card_labels.loading_text"
                ),
              }}
            />
          )}
        <ScreenSection
          description={t(
            "resources_translations.resources_list_labels.description"
          )}
          title={t("resources_translations.resources_list_labels.title")}
          icon="book-outline"
        />
        <Input<{ searchResourceValue: string }>
          name="searchResourceValue"
          value={searchResourceValue}
          icon="search-outline"
          placeholder={t(
            "resources_translations.resources_list_labels.search_input_placeholder"
          )}
          onChange={(_, value) => onSearchResourceValueChange(value)}
          onClearInput={() => onSearchResourceValueChange("")}
        />
        <View style={previewResourceListStyle.FilterSection}>
          <Typography
            text={t(
              "resources_translations.resources_list_labels.format_filters_labels.title"
            )}
            weight="medium"
            type="paragraph"
            textAlign="left"
            color={AppColors.neutral[1000]}
            width="auto"
            icon="filter-outline"
          />
          <ScrollView
            contentContainerStyle={previewResourceListStyle.Filters}
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
          <View style={previewResourceListStyle.FilterSection}>
            <Typography
              text={t(
                "resources_translations.resources_list_labels.tag_filters_labels.title"
              )}
              weight="medium"
              type="paragraph"
              textAlign="left"
              color={AppColors.neutral[1000]}
              width="auto"
              icon="filter-outline"
            />
            <ScrollView
              contentContainerStyle={previewResourceListStyle.Filters}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <FilterTag
                icon="star-outline"
                label={t(
                  "resources_translations.resources_list_labels.tag_filters_labels.all_tags"
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
                active={isPopUpVisible}
                icon="search-outline"
                onPress={onOpenPopUp}
              />
            </ScrollView>
          </View>
        )}
      </View>
    </>
  );
};

export default PreviewResourceHeader;
