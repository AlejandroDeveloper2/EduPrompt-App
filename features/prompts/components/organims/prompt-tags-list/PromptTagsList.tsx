import { useRouter } from "expo-router";
import { View } from "react-native";

import { eventBus } from "@/core/events/EventBus";
import { Tag } from "@/features/tags/types";

import { AppColors } from "@/shared/styles";

import { usePromptTags } from "@/features/prompts/hooks/core";
import { usePromptFiltersStore } from "@/features/prompts/store";
import { useTranslations } from "@/shared/hooks/core";

import { Typography } from "@/shared/components/atoms";
import {
  ComposedDropdownOptionList,
  TagSelectionPanel,
} from "@/shared/components/organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const PromptTagsList = () => {
  const router = useRouter();
  const { t } = useTranslations();
  const {
    searchTagValue,
    tagFilter,
    onSearchTagValueChange,
    onTagFilterChange,
  } = usePromptFiltersStore();
  const paginatedTags = usePromptTags();

  return (
    <>
      <View style={GlobalStyles.SheetHeaderContainer}>
        <View style={GlobalStyles.ClosePopUpDragIndicator} />
        <Typography
          text={t(
            "prompts_translations.prompt_list_labels.tag_list_labels_popup.title",
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
            tagType="prompt_tag"
            searchValue={searchTagValue}
            onSearchChange={(value) => onSearchTagValueChange(value)}
          />
        }
        infinitePaginationOptions={{
          ...paginatedTags,
          onRefetch: () =>
            eventBus.emit("tags.promptType.refetch.requested", undefined),
          onEndReached: () => {
            if (paginatedTags.hasNextPage && !paginatedTags.isFetchingNextPage)
              eventBus.emit(
                "tags.promptType.fetchNextPage.requested",
                undefined,
              );
          },
        }}
        optionList={paginatedTags.tags}
        optionIdkey="tagId"
        optionLabelKey="name"
        searchInputPlaceholder={t(
          "prompts_translations.prompt_list_labels.tag_list_labels_popup.search_input_placeholder",
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

export default PromptTagsList;
