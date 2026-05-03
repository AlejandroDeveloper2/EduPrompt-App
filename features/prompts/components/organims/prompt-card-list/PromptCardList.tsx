import { FlatList } from "react-native";

import { AppColors, Spacing } from "@/shared/styles";

import { usePromptCardListLogic } from "@/features/prompts/hooks/core";

import { Empty, LoadingTextIndicator } from "@/shared/components/molecules";
import { Alert, FetchingErrorPanel } from "@/shared/components/organims";
import { PromptCard } from "../../molecules";
import PromptCardListHeader from "./PromptCardListHeader";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";
import { dynamicStyles } from "./PromptCardList.style";

const PromptCardList = () => {
  const {
    size,
    prompts,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    confirmPromptDeleteDialog,
    handleViewPrompt,
    isPending: isDeleting,
    removeManyPrompts,
    t,
    selectedPromptIds,
    selectionMode,
  } = usePromptCardListLogic();

  const styles = dynamicStyles(size);

  if (isError)
    return (
      <FetchingErrorPanel
        message={t(
          "prompts_translations.prompt_list_labels.error_loading_prompts_msg",
        )}
        refetch={refetch}
      />
    );

  return (
    <>
      <Alert
        isOpen={confirmPromptDeleteDialog.isOpen}
        title={t(
          "prompts_translations.prompt_list_labels.confirm_delete_alert_labels.title",
        )}
        variant="danger"
        message={t(
          "prompts_translations.prompt_list_labels.confirm_delete_alert_labels.message",
        )}
        acceptButtonLabel={t(
          "prompts_translations.prompt_list_labels.confirm_delete_alert_labels.btn_accept",
        )}
        acceptButtonIcon="trash-bin-outline"
        closeAlert={confirmPromptDeleteDialog.closeAlert}
        onCancel={confirmPromptDeleteDialog.closeAlert}
        onAccept={() => {
          const selectedPrompts = Array.from(selectedPromptIds);
          removeManyPrompts(selectedPrompts, {
            onSuccess: () => confirmPromptDeleteDialog.closeAlert(),
          });
        }}
        loading={isDeleting}
        loadingMessage={t(
          "prompts_translations.prompt_list_labels.confirm_delete_alert_labels.deleting_prompt_msg",
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
        data={prompts}
        renderItem={({ item }) => (
          <PromptCard
            promptData={item}
            onEditPrompt={() => handleViewPrompt(item)}
            totalRecords={prompts.length}
          />
        )}
        showsVerticalScrollIndicator={false}
        windowSize={5}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        keyExtractor={(item) => item.promptId}
        ListEmptyComponent={
          <Empty
            message={t(
              "prompts_translations.prompt_list_labels.no_prompts_msg",
            )}
            icon="pricetag-outline"
          />
        }
        ListHeaderComponent={<PromptCardListHeader />}
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
                "prompts_translations.prompt_list_labels.loading_prompts_msg",
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

export default PromptCardList;
