/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { FlatList, View } from "react-native";

import { TagType } from "@/features/tags/types";
import { AppColors } from "@/shared/styles";

import { eventBus } from "@/core/events/EventBus";
import { SELECTION_MODE_ACTIONS } from "@/features/tags/constants";

import { useDeleteManyTags } from "@/features/tags/hooks/core";
import { useTagsQuery } from "@/features/tags/hooks/queries";
import { useTagsSelectionStore } from "@/features/tags/hooks/store";
import { useListFilters } from "@/shared/hooks/core";
import {
  useScreenDimensionsStore,
  useSelectionModeStore,
} from "@/shared/hooks/store";

import {
  Button,
  Empty,
  LoadingTextIndicator,
} from "@/shared/components/molecules";
import { TagCard } from "../../molecules";
import TagCardListHeader from "./TagCardListHeader";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";
import { TagCardListStyle } from "./TagCardList.style";

const TagCardList = () => {
  const size = useScreenDimensionsStore();
  const { selectionCount, isAllSelected, clearSelection, selectAll } =
    useTagsSelectionStore();
  const {
    selectionMode,
    allSelected,
    enableSelectionMode,
    disableSelectionMode,
  } = useSelectionModeStore();

  const {
    searchValue,
    selectedFilter,
    handleSearchChange,
    onClearSearchInput,
    onFilterChange,
  } = useListFilters<TagType>("resource_tag");

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useTagsQuery({ name: searchValue, type: selectedFilter }, { limit: 10 });

  const { removeManyTags } = useDeleteManyTags();

  const tags = useMemo(
    () => data?.pages.flatMap((p) => p.records) ?? [],
    [data]
  );

  /** Emitimos el cambio de elementos seleccionados */
  useEffect(() => {
    eventBus.emit("selectionMode.selectedElements.updated", selectionCount);
  }, [selectionCount]);

  /** Emitimos el flag para validar si se ha seleccionado todo */
  useEffect(() => {
    eventBus.emit("selectionMode.isAllSelected.updated", isAllSelected);
  }, [isAllSelected]);

  /** Validamos si hay elementos seleccionados */
  useEffect(() => {
    if (selectionCount > 0)
      enableSelectionMode(SELECTION_MODE_ACTIONS(removeManyTags));
    else disableSelectionMode();
  }, [selectionCount]);

  /** Validamos si el modo selección esta activo */
  useEffect(() => {
    if (!selectionMode) clearSelection();
  }, [selectionMode]);

  /** Validamos si todos los elementos estan seleccionados */
  useEffect(() => {
    if (allSelected) selectAll(tags.map((tag) => tag.tagId));
    else if (!allSelected && isAllSelected) clearSelection();
  }, [allSelected]);

  const tagCardListStyle = TagCardListStyle(size);

  if (isError)
    return (
      <View
        style={{
          marginTop: 24,
          alignItems: "center",
          gap: 12,
          justifyContent: "center",
        }}
      >
        <Empty
          message="Ha ocurrido un error al cargar las etiquetas"
          icon="close-outline"
        />
        <Button
          icon="reload-outline"
          variant="primary"
          width="auto"
          label="Reintentar"
          onPress={refetch}
        />
      </View>
    );

  return (
    <FlatList
      style={[tagCardListStyle.ListContainer, GlobalStyles.PageDimensions]}
      contentContainerStyle={[
        tagCardListStyle.ListContent,
        GlobalStyles.PageContent,
      ]}
      numColumns={size === "laptop" ? 2 : 1}
      data={tags}
      renderItem={({ item }) => (
        <TagCard
          data={item}
          onEdit={() => console.log("Edit")}
          totalRecords={tags.length}
        />
      )}
      showsVerticalScrollIndicator={false}
      windowSize={5}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      keyExtractor={(item) => item.tagId}
      ListEmptyComponent={
        <Empty message="No hay resultados" icon="pricetag-outline" />
      }
      ListHeaderComponent={
        <TagCardListHeader
          isDataSync={tags.every((t) => t.sync)}
          searchValue={searchValue}
          selectedFilter={selectedFilter}
          onChangeFilter={onFilterChange}
          handleSearchChange={handleSearchChange}
          onClearSearchInput={onClearSearchInput}
        />
      }
      onEndReachedThreshold={0.4}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      ListFooterComponent={() =>
        isFetchingNextPage ? (
          <LoadingTextIndicator
            color={AppColors.primary[400]}
            message="Cargando mas etiquetas..."
          />
        ) : null
      }
      refreshing={isRefetching || isLoading}
      onRefresh={() => refetch()}
    />
  );
};

export default TagCardList;
