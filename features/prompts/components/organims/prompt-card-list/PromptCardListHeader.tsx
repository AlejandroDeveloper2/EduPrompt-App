import { ScrollView, View } from "react-native";

import { Tag } from "@/features/tags/types";

import { eventBus } from "@/core/events/EventBus";

import { AppColors } from "@/shared/styles";

import { usePromptFiltersContext } from "@/features/prompts/hooks/context";
import { useSyncPromptsMutation } from "@/features/prompts/hooks/mutations";
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

import { PromptCardListStyle } from "./PromptCardList.style";

interface PromptCardListHeaderProps {
  isDataSync: boolean;
}

const PromptCardListHeader = ({ isDataSync }: PromptCardListHeaderProps) => {
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
          "prompts-translations.prompt-list-labels.tag-list-labels-popup.title"
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
                  undefined
                );
            },
          }}
          optionList={paginatedTags.tags}
          optionIdkey="tagId"
          optionLabelKey="name"
          searchInputPlaceholder={t(
            "prompts-translations.prompt-list-labels.tag-list-labels-popup.search-input-placeholder"
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
                "prompts-translations.prompt-list-labels.syncronization-card-labels.title"
              )}
              description={t(
                "prompts-translations.prompt-list-labels.syncronization-card-labels.description"
              )}
              buttonData={{
                onPress: syncPrompts,
                icon: "sync-outline",
                label: t(
                  "prompts-translations.prompt-list-labels.syncronization-card-labels.btn-sync"
                ),
                loading: isPending,
                loadingMessage: t(
                  "prompts-translations.prompt-list-labels.syncronization-card-labels.loading-text"
                ),
              }}
            />
          )}
        <ScreenSection
          description={t("prompts-translations.prompt-list-labels.description")}
          title={t("prompts-translations.prompt-list-labels.title")}
          icon="bulb-outline"
        />
        <Input<{ searchPromptValue: string }>
          name="searchPromptValue"
          value={searchPromptValue}
          icon="search-outline"
          placeholder={t(
            "prompts-translations.prompt-list-labels.search-input-placeholder"
          )}
          onChange={(_, value) => onSearchPromptValueChange(value)}
          onClearInput={() => onSearchPromptValueChange("")}
        />
        <View style={promptCardListStyle.FiltersContainer}>
          <Typography
            text={t(
              "prompts-translations.prompt-list-labels.prompt-tag-filters-labels.title"
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
                "prompts-translations.prompt-list-labels.prompt-tag-filters-labels.all-filter"
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
      </View>
    </>
  );
};

export default PromptCardListHeader;
