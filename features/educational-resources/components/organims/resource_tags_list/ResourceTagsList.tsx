import { useRouter } from "expo-router";
import { View } from "react-native";

import { Tag } from "@/features/tags/types";

import { eventBus } from "@/core/events/EventBus";
import { AppColors } from "@/shared/styles";

import { useResourceTags } from "@/features/educational-resources/hooks/core";
import { useResourceFiltersStore } from "@/features/educational-resources/store";
import { useTranslations } from "@/shared/hooks/core";

import { Typography } from "@/shared/components/atoms";
import {
  ComposedDropdownOptionList,
  TagSelectionPanel,
} from "@/shared/components/organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const ResourceTagsList = () => {
  const router = useRouter();
  const { t } = useTranslations();
  const {
    searchTagValue,
    tagFilter,
    onSearchTagValueChange,
    onTagFilterChange,
  } = useResourceFiltersStore();
  const paginatedTags = useResourceTags();

  return (
    <>
      <View style={GlobalStyles.SheetHeaderContainer}>
        <View style={GlobalStyles.ClosePopUpDragIndicator} />
        <Typography
          text={t(
            "resources_translations.resources_list_labels.tag_list_popup_labels.title",
          )}
          weight="medium"
          type="h2"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="100%"
          icon="pricetag-outline"
        />
      </View>
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
            if (paginatedTags.hasNextPage && !paginatedTags.isFetchingNextPage)
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
          router.back();
        }}
      />
    </>
  );
};

export default ResourceTagsList;
