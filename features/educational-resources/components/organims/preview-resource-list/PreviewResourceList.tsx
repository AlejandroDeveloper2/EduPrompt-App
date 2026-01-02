import { FlatList, View } from "react-native";

import { AppColors, Spacing } from "@/shared/styles";

import { eventBus } from "@/core/events/EventBus";

import {
  useResourceCardListLogic,
  useUpdateResourceFormLogic,
} from "@/features/educational-resources/hooks/core";

import {
  Button,
  Empty,
  LoadingTextIndicator,
} from "@/shared/components/molecules";
import { ResourceCard } from "../../molecules";
import PreviewResourceHeader from "./PreviewResourceHeader";

import {
  ComposedDropdownOptionList,
  PopUp,
  TagSelectionPanel,
} from "@/shared/components/organims";
import UpdateResourceForm from "../update-resource-form/UpdateResourceForm";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";
import { PreviewResourceListStyle } from "./PreviewResourceList.style";

const PreviewResourceList = () => {
  const {
    /** Size */
    size,
    /**Tag selection */
    isTagSelection,
    setIsTagSelection,
    /** Search filters */
    searchValue,
    selectedTagFilter,
    selectedFormatFilter,
    handleSearchChange,
    onClearSearchInput,
    onTagFilterChange,
    onFormatFilterChange,
    /** Query */
    resources,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    /** PopUp Controls */
    updateResourcePopUp,
    /** Resource Id  */
    selectedResource,
    setSelectedResource,
  } = useResourceCardListLogic();

  const { isPending, tagsPagination, selectedTag, form } =
    useUpdateResourceFormLogic(
      selectedResource,
      updateResourcePopUp.onClosePopUp
    );

  const previewResourceListStyle = PreviewResourceListStyle(size);

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
          message="Ha ocurrido un error al cargar los recursos educativos"
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
    <>
      <PopUp
        title={isTagSelection ? "Seleccionar etiqueta" : "Actualizar recurso"}
        icon={isTagSelection ? "pricetag-outline" : "pencil-outline"}
        isPopUpMounted={updateResourcePopUp.isPopUpMounted}
        gesture={updateResourcePopUp.dragGesture}
        animatedPopUpStyle={updateResourcePopUp.animatedPopUpStyle}
        style={{ maxHeight: "auto" }}
        onClosePopUp={() => {
          updateResourcePopUp.onClosePopUp();
          setSelectedResource(null);
        }}
      >
        {isTagSelection ? (
          <ComposedDropdownOptionList<{
            tagId: string;
            type: "prompt_tag" | "resource_tag";
            name: string;
          }>
            ControlPanelComponent={<TagSelectionPanel tagType="resource_tag" />}
            infinitePaginationOptions={{
              ...tagsPagination,
              onRefetch: () =>
                eventBus.emit("tags.refetch.requested", undefined),
              onEndReached: () => {
                if (
                  tagsPagination.hasNextPage &&
                  !tagsPagination.isFetchingNextPage
                )
                  eventBus.emit("tags.fetchNextPage.requested", undefined);
              },
            }}
            optionList={tagsPagination.tags}
            optionIdkey="tagId"
            optionLabelKey="name"
            searchInputPlaceholder="Buscar etiqueta por nombre"
            selectedOption={selectedTag}
            onSelectOption={(option) => {
              form.handleChange("groupTag", option.tagId);
              setIsTagSelection(false);
            }}
            FooterComponent={
              <Button
                label="Cancelar selección"
                icon="close-outline"
                width="100%"
                variant="neutral"
                onPress={() => setIsTagSelection(false)}
                style={{ marginVertical: Spacing.spacing_xl }}
              />
            }
          />
        ) : (
          <UpdateResourceForm
            isLoading={isPending}
            selectedTag={selectedTag}
            form={form}
            selectedResource={selectedResource}
            onTagSelectionMode={() => setIsTagSelection(true)}
            onClosePopUp={updateResourcePopUp.onClosePopUp}
          />
        )}
      </PopUp>
      <FlatList
        style={[
          previewResourceListStyle.ListContainer,
          GlobalStyles.PageDimensions,
        ]}
        contentContainerStyle={[
          previewResourceListStyle.ListContent,
          GlobalStyles.PageContent,
        ]}
        numColumns={size === "laptop" ? 2 : 1}
        windowSize={5}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        data={resources}
        renderItem={({ item }) => (
          <ResourceCard
            resourceData={item}
            icon="add"
            totalRecords={resources.length}
            onViewResource={() => {
              setSelectedResource(item);
              updateResourcePopUp.onOpenPopUp();
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.resourceId}
        ListHeaderComponent={
          <PreviewResourceHeader
            searchValue={searchValue}
            isDataSync={resources.every((r) => r.sync)}
            handleSearchChange={handleSearchChange}
            onClearSearchInput={onClearSearchInput}
            onChangeFormatFilter={onFormatFilterChange}
            onChangeTagFilter={onTagFilterChange}
            selectedFormatFilter={selectedFormatFilter}
            selectedTagFilter={selectedTagFilter}
          />
        }
        ListEmptyComponent={
          <Empty message="No hay recursos guardados" icon="book-outline" />
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
              message="Cargando mas prompts..."
            />
          ) : null
        }
        refreshing={isRefetching || isLoading}
        onRefresh={() => refetch()}
      />
    </>
  );
};

export default PreviewResourceList;
