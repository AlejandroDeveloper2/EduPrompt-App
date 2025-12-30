import { useEffect } from "react";
import { ScrollView, View } from "react-native";

import { Tag } from "@/features/tags/types";

import { eventBus } from "@/core/events/EventBus";

import { AppColors } from "@/shared/styles";

import { useSyncPromptsMutation } from "@/features/prompts/hooks/mutations";
import { useAnimatedPopUp } from "@/shared/hooks/animations";
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
  selectedFilter: Tag | null;
  searchValue: string;
  onChangeFilter: (filter: Tag | null) => void;
  handleSearchChange: (text: string) => void;
  onClearSearchInput: () => void;
}

const PromptCardListHeader = ({
  isDataSync,
  selectedFilter,
  searchValue,
  handleSearchChange,
  onClearSearchInput,
  onChangeFilter,
}: PromptCardListHeaderProps) => {
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

  useEffect(() => {
    eventBus.emit("tags.fetch", { type: "prompt_tag" });
  }, []);

  const paginatedTags = useEventbusValue("tags.list.pagination.updated", {
    tags: [],
    hasNextPage: false,
    isFetchingNextPage: false,
    refreshing: false,
  });

  const { isPending, syncPrompts } = useSyncPromptsMutation();

  const promptCardListStyle = PromptCardListStyle(size);

  return (
    <>
      <PopUp
        title="Etiquetas"
        icon="pricetag-outline"
        isPopUpMounted={isPopUpMounted}
        gesture={dragGesture}
        animatedPopUpStyle={animatedPopUpStyle}
        onClosePopUp={onClosePopUp}
      >
        <ComposedDropdownOptionList<Tag>
          ControlPanelComponent={<TagSelectionPanel tagType="prompt_tag" />}
          infinitePaginationOptions={{
            ...paginatedTags,
            onRefetch: () => eventBus.emit("tags.refetch.requested", undefined),
            onEndReached: () => {
              if (
                paginatedTags.hasNextPage &&
                !paginatedTags.isFetchingNextPage
              )
                eventBus.emit("tags.fetchNextPage.requested", undefined);
            },
          }}
          optionList={paginatedTags.tags}
          optionIdkey="tagId"
          optionLabelKey="name"
          searchInputPlaceholder="Buscar etiqueta por nombre"
          selectedOption={selectedFilter}
          onSelectOption={(option) => {
            onChangeFilter(option);
          }}
        />
      </PopUp>
      <View style={promptCardListStyle.ListHeaderContainer}>
        {userProfile &&
          !isDataSync &&
          !userProfile.userPreferences.autoSync &&
          isAuthenticated && (
            <InfoCard
              title="Sincronización de datos"
              description="Hay datos sin sincronizar toca el siguiente botón para sincronizar tus datos"
              buttonData={{
                onPress: syncPrompts,
                icon: "sync-outline",
                label: "Sincronizar",
                loading: isPending,
                loadingMessage: "Sincronizando datos...",
              }}
            />
          )}
        <ScreenSection
          description="Revisa y gestiona fácilmente los prompts que has usado para generar tus recursos educativos."
          title="Mis prompts"
          icon="bulb-outline"
        />
        <Input<{ searchValue: string }>
          name="searchValue"
          value={searchValue}
          icon="search-outline"
          placeholder="Buscar prompts por titulo"
          onChange={(_, value) => handleSearchChange(value)}
          onClearInput={onClearSearchInput}
        />
        <View style={promptCardListStyle.FiltersContainer}>
          <Typography
            text="Filtrar por etiqueta"
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
              label="Todos"
              active={selectedFilter === null}
              onPressFilter={() => onChangeFilter(null)}
            />
            {paginatedTags.tags.slice(0, 3).map((tag) => (
              <FilterTag
                key={tag.tagId}
                icon="pricetag-outline"
                label={tag.name}
                active={selectedFilter?.tagId === tag.tagId}
                onPressFilter={() => onChangeFilter(tag)}
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
