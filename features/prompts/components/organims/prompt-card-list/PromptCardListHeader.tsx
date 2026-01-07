import { ScrollView, View } from "react-native";

import { Tag } from "@/features/tags/types";

import { eventBus } from "@/core/events/EventBus";

import { AppColors } from "@/shared/styles";

import { usePromptFiltersContext } from "@/features/prompts/hooks/context";
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
          searchInputPlaceholder="Buscar etiqueta por nombre"
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
        <Input<{ searchPromptValue: string }>
          name="searchPromptValue"
          value={searchPromptValue}
          icon="search-outline"
          placeholder="Buscar prompts por titulo"
          onChange={(_, value) => onSearchPromptValueChange(value)}
          onClearInput={() => onSearchPromptValueChange("")}
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
