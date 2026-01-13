import { FlatList } from "react-native";

import { AppColors, Spacing } from "@/shared/styles";

import { eventBus } from "@/core/events/EventBus";

import {
  usePromptCardListLogic,
  useUpdatePromptFormLogic,
} from "@/features/prompts/hooks/core";

import {
  Button,
  Empty,
  LoadingTextIndicator,
} from "@/shared/components/molecules";
import {
  Alert,
  ComposedDropdownOptionList,
  FetchingErrorPanel,
  PopUp,
  TagSelectionPanel,
} from "@/shared/components/organims";
import { PromptCard } from "../../molecules";
import UpdatePromptForm from "../update-prompt-form/UpdatePromptForm";
import PromptCardListHeader from "./PromptCardListHeader";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";
import { PromptCardListStyle } from "./PromptCardList.style";

const PromptCardList = () => {
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
    prompts,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    /** PopUp Controls */
    updatePromptPopUp,
    confirmPromptDeletePopUp,
    /** Prompt Id  */
    selectedPrompt,
    setSelectedPrompt,
    /** Actions */
    isPending: isDeleting,
    removeManyPrompts,
  } = usePromptCardListLogic();

  const { isPending, selectedTag, form } = useUpdatePromptFormLogic(
    selectedPrompt,
    updatePromptPopUp.onClosePopUp
  );

  const promptCardListStyle = PromptCardListStyle(size);

  if (isError)
    return (
      <FetchingErrorPanel
        message="Ha ocurrido un error al cargar los prompts"
        refetch={refetch}
      />
    );

  return (
    <>
      <PopUp
        icon="information-circle-outline"
        title="Alerta"
        {...confirmPromptDeletePopUp}
        gesture={confirmPromptDeletePopUp.dragGesture}
      >
        <Alert
          variant="danger"
          message="¿Estas seguro que deseas eliminar los prompts?"
          acceptButtonLabel="Eliminar"
          acceptButtonIcon="trash-bin-outline"
          onCancel={confirmPromptDeletePopUp.onClosePopUp}
          onAccept={() => {
            removeManyPrompts();
            confirmPromptDeletePopUp.onClosePopUp();
          }}
          loading={isDeleting}
          loadingMessage="Eliminando..."
        />
      </PopUp>
      <PopUp
        title={isTagSelection ? "Seleccionar etiqueta" : "Actualizar prompt"}
        icon={isTagSelection ? "pricetag-outline" : "pencil-outline"}
        isPopUpMounted={updatePromptPopUp.isPopUpMounted}
        gesture={updatePromptPopUp.dragGesture}
        animatedPopUpStyle={updatePromptPopUp.animatedPopUpStyle}
        style={{ maxHeight: "auto" }}
        onClosePopUp={() => {
          updatePromptPopUp.onClosePopUp();
          setSelectedPrompt(null);
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
                tagType="prompt_tag"
                searchValue={searchTagValue}
                onSearchChange={onSearchTagValueChange}
              />
            }
            infinitePaginationOptions={{
              ...paginatedTags,
              onRefetch: () =>
                eventBus.emit("tags.promptType.refetch.requested", undefined),
              onEndReached: () => {
                if (
                  paginatedTags.hasNextPage &&
                  !paginatedTags.isFetchingNextPage
                )
                  eventBus.emit(
                    "tags.promptType.fetchNextPage.requested",
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
              form.handleChange("tag", option.tagId);
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
          <UpdatePromptForm
            isLoading={isPending}
            selectedTag={selectedTag}
            form={form}
            onTagSelectionMode={() => setIsTagSelection(true)}
            onClosePopUp={updatePromptPopUp.onClosePopUp}
          />
        )}
      </PopUp>
      <FlatList
        style={[promptCardListStyle.ListContainer, GlobalStyles.PageDimensions]}
        contentContainerStyle={[
          promptCardListStyle.ListContent,
          GlobalStyles.PageContent,
        ]}
        numColumns={size === "laptop" ? 2 : 1}
        data={prompts}
        renderItem={({ item }) => (
          <PromptCard
            promptData={item}
            onEditPrompt={() => {
              setSelectedPrompt(item);
              updatePromptPopUp.onOpenPopUp();
            }}
            totalRecords={prompts.length}
          />
        )}
        showsVerticalScrollIndicator={false}
        windowSize={5}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        keyExtractor={(item) => item.promptId}
        ListEmptyComponent={
          <Empty message="No hay resultados" icon="pricetag-outline" />
        }
        ListHeaderComponent={
          <PromptCardListHeader isDataSync={prompts.every((p) => p.sync)} />
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

export default PromptCardList;
