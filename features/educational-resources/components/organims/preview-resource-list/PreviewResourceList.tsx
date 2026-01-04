import { FlatList, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { SectionComponentMap, SectionId } from "./types";

import { AppColors, Spacing } from "@/shared/styles";

import { eventBus } from "@/core/events/EventBus";

import { RESOURCE_PREVIEW_TABS } from "./constants";

import {
  useResourceCardListLogic,
  useUpdateResourceFormLogic,
} from "@/features/educational-resources/hooks/core";

import {
  Button,
  Empty,
  LoadingTextIndicator,
  ResourceViewer,
  Tabulator,
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
    /** Resources preview popup tabs */
    activePreviewTab,
    setActivePreviewTab,
    /** Preview viewer */
    viewerType,
  } = useResourceCardListLogic(RESOURCE_PREVIEW_TABS[0]);

  const { isPending, tagsPagination, selectedTag, form } =
    useUpdateResourceFormLogic(
      selectedResource,
      updateResourcePopUp.onClosePopUp
    );

  const Section: SectionComponentMap = {
    "tab-1": (
      <ScrollView style={{ width: "100%", maxHeight: 500 }}>
        <ResourceViewer
          viewerType={viewerType}
          content={
            selectedResource ? selectedResource.content : "Sin contenido..."
          }
          scroll={false}
        />
      </ScrollView>
    ),
    "tab-2": (
      <UpdateResourceForm
        isLoading={isPending}
        selectedTag={selectedTag}
        form={form}
        onTagSelectionMode={() => setIsTagSelection(true)}
        onClosePopUp={updateResourcePopUp.onClosePopUp}
      />
    ),
  };

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
        title={isTagSelection ? "Seleccionar etiqueta" : "Visualizar recurso"}
        icon={isTagSelection ? "pricetag-outline" : "eye-outline"}
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
          <View style={previewResourceListStyle.ViewPreviewContainer}>
            <Tabulator
              tabs={RESOURCE_PREVIEW_TABS}
              activeTab={activePreviewTab}
              onSwitchTab={(tab) => {
                setActivePreviewTab(tab);
              }}
            />
            {Section[activePreviewTab.tabId as SectionId]}
          </View>
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
