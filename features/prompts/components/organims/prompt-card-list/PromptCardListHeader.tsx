import { ScrollView, View } from "react-native";

import { Tag } from "@/features/tags/types";

import { eventBus } from "@/core/events/EventBus";

import { AppColors } from "@/shared/styles";

import { usePromptFiltersContext } from "@/features/prompts/hooks/context";
import { useSyncPromptsMutation } from "@/features/prompts/hooks/mutations";
import { usePopUp, useTranslations } from "@/shared/hooks/core";
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

import { PromptCardListStyle } from "./PromptCardList.style";

interface PromptCardListHeaderProps {
  isDataSync: boolean;
}

const PromptCardListHeader = ({ isDataSync }: PromptCardListHeaderProps) => {
  const size = useScreenDimensionsStore();

  const userProfile = useEventbusValue("userProfile.user.updated", null);
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const { isOpen, openPopUp, closePopUp } = usePopUp();

  const { isPending, syncPrompts } = useSyncPromptsMutation();

  const {
    searchPromptValue,
    searchTagValue,
    tagFilter,
    onSearchPromptValueChange,
    onSearchTagValueChange,
    paginatedTags,
    onTagFilterChange,
  } = usePromptFiltersContext();

  const { t } = useTranslations();

  const promptCardListStyle = PromptCardListStyle(size);

  return (
    <>
      <PopUp
        title={t(
          "prompts_translations.prompt_list_labels.tag_list_labels_popup.title",
        )}
        icon="pricetag-outline"
        isOpen={isOpen}
        onClose={closePopUp}
      >
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
              if (
                paginatedTags.hasNextPage &&
                !paginatedTags.isFetchingNextPage
              )
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
          }}
        />
      </PopUp>
      <View style={promptCardListStyle.ListHeaderContainer}>
        {userProfile &&
          !isDataSync &&
          !userProfile.userPreferences.autoSync &&
          isAuthenticated && (
            <InfoCard
              title={t(
                "prompts_translations.prompt_list_labels.syncronization_card_labels.title",
              )}
              description={t(
                "prompts_translations.prompt_list_labels.syncronization_card_labels.description",
              )}
              buttonData={{
                onPress: syncPrompts,
                icon: "sync-outline",
                label: t(
                  "prompts_translations.prompt_list_labels.syncronization_card_labels.btn_sync",
                ),
                loading: isPending,
                loadingMessage: t(
                  "prompts_translations.prompt_list_labels.syncronization_card_labels.loading_text",
                ),
              }}
            />
          )}
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
        <View style={promptCardListStyle.FiltersContainer}>
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
            contentContainerStyle={promptCardListStyle.FiltersRow}
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
              active={isOpen}
              icon="search-outline"
              onPress={openPopUp}
            />
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default PromptCardListHeader;
