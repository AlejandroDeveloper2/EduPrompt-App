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
  Alert,
  ComposedDropdownOptionList,
  FetchingErrorPanel,
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
    searchTagValue,
    paginatedTags,
    onSearchTagValueChange,
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
    confirmDeletePopUp,
    /** Resource Id  */
    selectedResource,
    setSelectedResource,
    /** Resources preview popup tabs */
    activePreviewTab,
    setActivePreviewTab,
    /** Preview viewer */
    viewerType,
    /**Actions */
    isPending: isDeleting,
    removeManyResources,
  } = useResourceCardListLogic(RESOURCE_PREVIEW_TABS[0]);

  const { isPending, selectedTag, form } = useUpdateResourceFormLogic(
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
        selectedTag={selectedTag}
        isLoading={isPending}
        form={form}
        onTagSelectionMode={() => setIsTagSelection(true)}
        onClosePopUp={updateResourcePopUp.onClosePopUp}
      />
    ),
  };

  const previewResourceListStyle = PreviewResourceListStyle(size);

  if (isError)
    return (
      <FetchingErrorPanel
        message="Ha ocurrido un error al cargar los recursos educativos"
        refetch={refetch}
      />
    );
  return (
    <>
      <PopUp
        icon="information-circle-outline"
        title="Alerta"
        {...confirmDeletePopUp}
        gesture={confirmDeletePopUp.dragGesture}
      >
        <Alert
          variant="danger"
          message="¿Estas seguro que deseas eliminar los recursos?"
          acceptButtonLabel="Eliminar"
          acceptButtonIcon="trash-bin-outline"
          onCancel={confirmDeletePopUp.onClosePopUp}
          onAccept={removeManyResources}
          loading={isDeleting}
          loadingMessage="Eliminando..."
        />
      </PopUp>
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
            ControlPanelComponent={
              <TagSelectionPanel
                tagType="resource_tag"
                searchValue={searchTagValue}
                onSearchChange={onSearchTagValueChange}
              />
            }
            infinitePaginationOptions={{
              ...paginatedTags,
              onRefetch: () =>
                eventBus.emit("tags.resourceType.refetch.requested", undefined),
              onEndReached: () => {
                if (
                  paginatedTags.hasNextPage &&
                  !paginatedTags.isFetchingNextPage
                )
                  eventBus.emit(
                    "tags.resourceType.fetchNextPage.requested",
                    undefined
                  );
              },
            }}
            optionList={paginatedTags.tags}
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
          <PreviewResourceHeader isDataSync={resources.every((r) => r.sync)} />
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
