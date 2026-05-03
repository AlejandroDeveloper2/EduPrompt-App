import { FlatList } from "react-native";

import { AppColors, Spacing } from "@/shared/styles";

import { useTagCardListLogic } from "@/features/tags/hooks/core";

import { Empty, LoadingTextIndicator } from "@/shared/components/molecules";
import { Alert, FetchingErrorPanel } from "@/shared/components/organims";
import { TagCard } from "../../molecules";
import TagCardListHeader from "./TagCardListHeader";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";
import { dynamicStyles } from "./TagCardList.style";

const TagCardList = () => {
  const {
    size,
    tags,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    confirmTagDeleteDialog,
    handleViewTag,
    selectedTagIds,
    isPending,
    removeManyTags,
    selectionMode,
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
      <FlatList
        style={[styles.ListContainer, GlobalStyles.PageDimensions]}
        contentContainerStyle={[
          styles.ListContent,
          GlobalStyles.PageContent,
          selectionMode && {
            paddingTop: Spacing.spacing_4xl + Spacing.spacing_xl,
          },
        ]}
        numColumns={size === "laptop" ? 2 : 1}
        data={tags}
        renderItem={({ item }) => (
          <TagCard
            data={item}
            onEdit={() => handleViewTag(item)}
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
        ListHeaderComponent={<TagCardListHeader />}
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
