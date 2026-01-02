import { useEffect } from "react";
import { ScrollView, View } from "react-native";

import { ResourceFormatKey } from "@/features/educational-resources/types";
import { Tag } from "@/features/tags/types";

import { eventBus } from "@/core/events/EventBus";

import { FORMAT_FILTERS } from "@/shared/constants";
import { AppColors } from "@/shared/styles";

import { useSyncResourcesMutation } from "@/features/educational-resources/hooks/mutations";
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

import { PreviewResourceListStyle } from "./PreviewResourceList.style";

interface PreviewResourceHeaderProps {
  isDataSync: boolean;
  selectedTagFilter: Tag | null;
  selectedFormatFilter: ResourceFormatKey | null;
  searchValue: string;
  onChangeTagFilter: (filter: Tag | null) => void;
  onChangeFormatFilter: (filter: ResourceFormatKey | null) => void;
  handleSearchChange: (text: string) => void;
  onClearSearchInput: () => void;
}

const PreviewResourceHeader = ({
  isDataSync,
  selectedTagFilter,
  selectedFormatFilter,
  searchValue,
  onChangeTagFilter,
  onChangeFormatFilter,
  handleSearchChange,
  onClearSearchInput,
}: PreviewResourceHeaderProps) => {
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
    eventBus.emit("tags.fetch", { type: "resource_tag" });
  }, []);

  const paginatedTags = useEventbusValue("tags.list.pagination.updated", {
    tags: [],
    hasNextPage: false,
    isFetchingNextPage: false,
    refreshing: false,
  });

  const { isPending, syncResources } = useSyncResourcesMutation();

  const previewResourceListStyle = PreviewResourceListStyle(size);

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
          ControlPanelComponent={<TagSelectionPanel tagType="resource_tag" />}
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
          selectedOption={selectedTagFilter}
          onSelectOption={(option) => {
            onChangeTagFilter(option);
          }}
        />
      </PopUp>
      <View style={previewResourceListStyle.ListHeaderContainer}>
        {userProfile &&
          !isDataSync &&
          !userProfile.userPreferences.autoSync &&
          isAuthenticated && (
            <InfoCard
              title="Sincronización de datos"
              description="Hay datos sin sincronizar toca el siguiente botón para sincronizar tus datos"
              buttonData={{
                onPress: syncResources,
                icon: "sync-outline",
                label: "Sincronizar",
                loading: isPending,
                loadingMessage: "Sincronizando datos...",
              }}
            />
          )}
        <ScreenSection
          description="Revisa y gestiona fácilmente las vistas previas de todos los recursos que has generado con Edu Prompt, todo en un solo lugar. "
          title="Mis Recursos"
          icon="book-outline"
        />
        <Input<{ searchValue: string }>
          name="searchValue"
          value={searchValue}
          icon="search-outline"
          placeholder="Buscar recurso por titulo"
          onChange={(_, value) => handleSearchChange(value)}
          onClearInput={onClearSearchInput}
        />
        <View style={previewResourceListStyle.FilterSection}>
          <Typography
            text="Filtrar por formato"
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
            {FORMAT_FILTERS["es"].map((filter) => (
              <FilterTag
                key={filter.label}
                icon={filter.icon}
                label={filter.label}
                active={filter.formatKey === selectedFormatFilter}
                onPressFilter={() => onChangeFormatFilter(filter.formatKey)}
              />
            ))}
          </ScrollView>
        </View>
        {paginatedTags.tags.length > 0 && (
          <View style={previewResourceListStyle.FilterSection}>
            <Typography
              text="Filtrar por etiqueta"
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
                label="Todos"
                active={selectedTagFilter === null}
                onPressFilter={() => onChangeTagFilter(null)}
              />
              {paginatedTags.tags.slice(0, 3).map((tag) => (
                <FilterTag
                  key={tag.tagId}
                  icon="pricetag-outline"
                  label={tag.name}
                  active={selectedTagFilter?.tagId === tag.tagId}
                  onPressFilter={() => onChangeTagFilter(tag)}
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
