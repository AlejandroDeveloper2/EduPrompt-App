import { FlatList } from "react-native";

import { AppColors } from "@/shared/styles";

import { useTagCardListLogic } from "@/features/tags/hooks/core";

import { Empty, LoadingTextIndicator } from "@/shared/components/molecules";
import { Alert, FetchingErrorPanel, PopUp } from "@/shared/components/organims";
import { TagCard } from "../../molecules";
import UpdateTagForm from "../update-tag-form/UpdateTagForm";
import TagCardListHeader from "./TagCardListHeader";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";
import { dynamicStyles } from "./TagCardList.style";

const TagCardList = () => {
  const {
    /** Size */
    size,
    /** Search filters */
    searchValue,
    selectedFilter,
    handleSearchChange,
    onClearSearchInput,
    onFilterChange,
    /** Query */
    tags,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    /** Popup controls */
    confirmTagDeleteDialog,
    updateTagPopUp,
    /** Tag Id  */
    selectedTag,
    setSelectedTag,
    selectedTagIds,
    /** Actions */
    isPending,
    removeManyTags,
    /**Translations */
    t,
  } = useTagCardListLogic();

  const styles = dynamicStyles(size);

  if (isError)
    return (
      <FetchingErrorPanel
        message={t("tags_translations.tag_list_labels.error_loading_tags_msg")}
        refetch={refetch}
      />
    );
  return (
    <>
      <Alert
        isOpen={confirmTagDeleteDialog.isOpen}
        title={t(
          "tags_translations.tag_list_labels.confirm_delete_alert_labels.title",
        )}
        variant="danger"
        message={t(
          "tags_translations.tag_list_labels.confirm_delete_alert_labels.message",
        )}
        acceptButtonLabel={t(
          "tags_translations.tag_list_labels.confirm_delete_alert_labels.btn_accept",
        )}
        acceptButtonIcon="trash-bin-outline"
        onCancel={confirmTagDeleteDialog.closeAlert}
        onAccept={() => {
          const tagsToDelete = Array.from(selectedTagIds);
          removeManyTags(tagsToDelete, {
            onSuccess: () => confirmTagDeleteDialog.closeAlert(),
          });
        }}
        closeAlert={confirmTagDeleteDialog.closeAlert}
        loading={isPending}
        loadingMessage={t(
          "tags_translations.tag_list_labels.confirm_delete_alert_labels.deleting_tag_msg",
        )}
      />
      <PopUp
        title={t(
          "tags_translations.tag_list_labels.update_tag_popup_labels.title",
        )}
        icon="pencil-outline"
        isOpen={updateTagPopUp.isOpen}
        onClose={() => {
          updateTagPopUp.closePopUp();
          setSelectedTag(null);
        }}
        scrollable
      >
        <UpdateTagForm
          selectedTag={selectedTag}
          onClosePopup={updateTagPopUp.closePopUp}
        />
      </PopUp>
      <FlatList
        style={[styles.ListContainer, GlobalStyles.PageDimensions]}
        contentContainerStyle={[styles.ListContent, GlobalStyles.PageContent]}
        numColumns={size === "laptop" ? 2 : 1}
        data={tags}
        renderItem={({ item }) => (
          <TagCard
            data={item}
            onEdit={() => {
              setSelectedTag(item);
              updateTagPopUp.openPopUp();
            }}
            totalRecords={tags.length}
          />
        )}
        showsVerticalScrollIndicator={false}
        windowSize={5}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        keyExtractor={(item) => item.tagId}
        ListEmptyComponent={
          <Empty
            message={t("tags_translations.tag_list_labels.no_tags_msg")}
            icon="pricetag-outline"
          />
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
              message={t("tags_translations.tag_list_labels.loading_tags_msg")}
            />
          ) : null
        }
        refreshing={isRefetching || isLoading}
        onRefresh={() => refetch()}
      />
    </>
  );
};

export default TagCardList;
