import { View } from "react-native";

import { TagType } from "@/features/tags/types";
import { AppColors } from "@/shared/styles";

import { useSyncTagMutation } from "@/features/tags/hooks/mutations";
import { useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { ScreenSection, Typography } from "@/shared/components/atoms";
import { FilterTag, InfoCard, Input } from "@/shared/components/molecules";

import { TagCardListStyle } from "./TagCardList.style";

interface TagListHeaderProps {
  isDataSync: boolean;
  selectedFilter: TagType;
  searchValue: string;
  onChangeFilter: (filter: TagType) => void;
  handleSearchChange: (text: string) => void;
  onClearSearchInput: () => void;
}

const TagCardListHeader = ({
  isDataSync,
  selectedFilter,
  searchValue,
  handleSearchChange,
  onClearSearchInput,
  onChangeFilter,
}: TagListHeaderProps) => {
  const size = useScreenDimensionsStore();

  const userProfile = useEventbusValue("userProfile.user.updated", null);
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const { isPending, syncTags } = useSyncTagMutation();

  const { t } = useTranslations();

  const tagCardListStyle = TagCardListStyle(size);

  return (
    <View style={tagCardListStyle.ListHeaderContainer}>
      {userProfile &&
        !isDataSync &&
        !userProfile.userPreferences.autoSync &&
        isAuthenticated && (
          <InfoCard
            title={t(
              "tags-translations.tag-list-labels.syncronization-card-labels.title"
            )}
            description={t(
              "tags-translations.tag-list-labels.syncronization-card-labels.description"
            )}
            buttonData={{
              onPress: syncTags,
              icon: "sync-outline",
              label: t(
                "tags-translations.tag-list-labels.syncronization-card-labels.btn-sync"
              ),
              loading: isPending,
              loadingMessage: t(
                "tags-translations.tag-list-labels.syncronization-card-labels.loading-text"
              ),
            }}
          />
        )}
      <ScreenSection
        description={t("tags-translations.tag-list-labels.description")}
        title={t("tags-translations.tag-list-labels.title")}
        icon="pricetag-outline"
      />
      <Input<{ searchValue: string }>
        name="searchValue"
        value={searchValue}
        icon="search-outline"
        placeholder={t(
          "tags-translations.tag-list-labels.search-input-placeholder"
        )}
        onChange={(_, value) => handleSearchChange(value)}
        onClearInput={onClearSearchInput}
      />
      <View style={tagCardListStyle.FiltersContainer}>
        <Typography
          text={t(
            "tags-translations.tag-list-labels.tag-type-filters-labels.title"
          )}
          weight="bold"
          type="button"
          textAlign="left"
          color={AppColors.neutral[1000]}
          width="auto"
          icon="filter-outline"
        />
        <View style={tagCardListStyle.FiltersRow}>
          <FilterTag
            icon="book-outline"
            label={t(
              "tags-translations.tag-list-labels.tag-type-filters-labels.resources"
            )}
            active={selectedFilter === "resource_tag"}
            onPressFilter={() => onChangeFilter("resource_tag")}
          />
          <FilterTag
            icon="chatbox-ellipses-outline"
            label={t(
              "tags-translations.tag-list-labels.tag-type-filters-labels.prompts"
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
