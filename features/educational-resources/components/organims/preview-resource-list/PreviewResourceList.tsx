import { FlatList, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { SectionComponentMap, SectionId } from "./types";

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
    t,
    resourcePreviewTabs,
  } = useResourceCardListLogic();

  const { isPending, selectedTag, form } = useUpdateResourceFormLogic(
    selectedResource,
    updateResourcePopUp.closePopUp,
  );

  const Section: SectionComponentMap = {
    "tab-1": (
      <ScrollView style={{ width: "100%", maxHeight: 500 }}>
        <ResourceViewer
          viewerType={viewerType}
          content={selectedResource ? selectedResource.content : "..."}
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
        onClosePopUp={updateResourcePopUp.closePopUp}
      />
    ),
  };

  const previewResourceListStyle = PreviewResourceListStyle(size);

  if (isError)
    return (
      <FetchingErrorPanel
        message={t(
          "resources_translations.resources_list_labels.fetch_resources_error_msg",
        )}
        refetch={refetch}
      />
    );
  return (
    <>
      <PopUp
        icon="information-circle-outline"
        title={t(
          "resources_translations.resources_list_labels.confirm_delete_alert_labels.title",
        )}
        onClose={confirmDeletePopUp.closePopUp}
        isOpen={confirmDeletePopUp.isOpen}
      >
        <Alert
          variant="danger"
          message={t(
            "resources_translations.resources_list_labels.confirm_delete_alert_labels.message",
          )}
          acceptButtonLabel={t(
            "resources_translations.resources_list_labels.confirm_delete_alert_labels.btn_accept",
          )}
          acceptButtonIcon="trash-bin-outline"
          onCancel={confirmDeletePopUp.closePopUp}
          onAccept={() => {
            removeManyResources();
            confirmDeletePopUp.closePopUp();
          }}
          loading={isDeleting}
          loadingMessage={t(
            "resources_translations.resources_list_labels.confirm_delete_alert_labels.deleting_resources_msg",
          )}
        />
      </PopUp>
      <PopUp
        title={
          isTagSelection
            ? t(
                "resources_translations.resources_list_labels.select_tags_popup_labels.title",
              )
            : t(
                "resources_translations.resources_list_labels.view_resource_popup_labels.title",
              )
        }
        icon={isTagSelection ? "pricetag-outline" : "eye-outline"}
        isOpen={updateResourcePopUp.isOpen}
        onClose={() => {
          updateResourcePopUp.closePopUp();
          setSelectedResource(null);
        }}
        scrollable={!isTagSelection || activePreviewTab.tabId === "tab-2"}
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
                    undefined,
                  );
              },
            }}
            optionList={paginatedTags.tags}
            optionIdkey="tagId"
            optionLabelKey="name"
            searchInputPlaceholder={t(
              "resources_translations.resources_list_labels.select_tags_popup_labels.search_input_placeholder",
            )}
            selectedOption={selectedTag}
            onSelectOption={(option) => {
              form.handleChange("groupTag", option.tagId);
              setIsTagSelection(false);
            }}
            FooterComponent={
              <Button
                label={t(
                  "resources_translations.resources_list_labels.select_tags_popup_labels.btn_cancel_selection",
                )}
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
              tabs={resourcePreviewTabs}
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
              updateResourcePopUp.openPopUp();
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.resourceId}
        ListHeaderComponent={
          <PreviewResourceHeader isDataSync={resources.every((r) => r.sync)} />
        }
        ListEmptyComponent={
          <Empty
            message={t(
              "resources_translations.resources_list_labels.no_resources_msg",
            )}
            icon="book-outline"
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
              message={t(
                "resources_translations.resources_list_labels.loading_resources_msg",
              )}
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
