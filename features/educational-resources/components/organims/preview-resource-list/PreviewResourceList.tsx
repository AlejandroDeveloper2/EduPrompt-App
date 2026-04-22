import { FlatList } from "react-native";

import { AppColors } from "@/shared/styles";

import { useResourceListLogic } from "@/features/educational-resources/hooks/core";
import { useResponsive } from "@/shared/hooks/core";

import { Empty, LoadingTextIndicator } from "@/shared/components/molecules";
import { Alert, FetchingErrorPanel, PopUp } from "@/shared/components/organims";
import { ResourceCard } from "../../molecules";
import PreviewResourceHeader from "./PreviewResourceHeader";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";
import { dynamicStyles } from "./PreviewResourceList.style";

const PreviewResourceList = () => {
  const size = useResponsive();
  const {
    resources,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    confirmDeletePopUp,
    isPending: isDeleting,
    removeManyResources,
    selectedResourceIds,
    handleViewResource,
    t,
  } = useResourceListLogic();

  const styles = dynamicStyles(size);

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
            const selectedResources = Array.from(selectedResourceIds);
            removeManyResources(selectedResources, {
              onSuccess: () => confirmDeletePopUp.closePopUp(),
            });
          }}
          loading={isDeleting}
          loadingMessage={t(
            "resources_translations.resources_list_labels.confirm_delete_alert_labels.deleting_resources_msg",
          )}
        />
      </PopUp>
      <FlatList
        style={[styles.ListContainer, GlobalStyles.PageDimensions]}
        contentContainerStyle={[styles.ListContent, GlobalStyles.PageContent]}
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
            onViewResource={() => handleViewResource(item)}
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
