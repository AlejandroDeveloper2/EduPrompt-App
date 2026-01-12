import { FlatList } from "react-native";

import { AppColors } from "@/shared/styles";

import { useTagCardListLogic } from "@/features/tags/hooks/core";

import { Empty, LoadingTextIndicator } from "@/shared/components/molecules";
import { Alert, FetchingErrorPanel, PopUp } from "@/shared/components/organims";
import { TagCard } from "../../molecules";
import UpdateTagForm from "../update-tag-form/UpdateTagForm";
import TagCardListHeader from "./TagCardListHeader";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";
import { TagCardListStyle } from "./TagCardList.style";

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
    confirmTagDeletePopUp,
    updateTagPopUp,
    /** Tag Id  */
    selectedTag,
    setSelectedTag,
    /** Actions */
    isPending,
    removeManyTags,
  } = useTagCardListLogic();

  const tagCardListStyle = TagCardListStyle(size);

  if (isError)
    return (
      <FetchingErrorPanel
        message="Ha ocurrido un error al cargar las etiquetas"
        refetch={refetch}
      />
    );
  return (
    <>
      <PopUp
        icon="information-circle-outline"
        title="Alerta"
        {...confirmTagDeletePopUp}
        gesture={confirmTagDeletePopUp.dragGesture}
      >
        <Alert
          variant="danger"
          message="¿Estas seguro que deseas eliminar las etiquetas?"
          acceptButtonLabel="Eliminar"
          acceptButtonIcon="trash-bin-outline"
          onCancel={confirmTagDeletePopUp.onClosePopUp}
          onAccept={removeManyTags}
          loading={isPending}
          loadingMessage="Eliminando..."
        />
      </PopUp>
      <PopUp
        title="Actualizar etiqueta"
        icon="pencil-outline"
        isPopUpMounted={updateTagPopUp.isPopUpMounted}
        gesture={updateTagPopUp.dragGesture}
        animatedPopUpStyle={updateTagPopUp.animatedPopUpStyle}
        onClosePopUp={() => {
          updateTagPopUp.onClosePopUp();
          setSelectedTag(null);
        }}
      >
        <UpdateTagForm
          selectedTag={selectedTag}
          onClosePopup={updateTagPopUp.onClosePopUp}
        />
      </PopUp>
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
            onEdit={() => {
              setSelectedTag(item);
              updateTagPopUp.onOpenPopUp();
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
    </>
  );
};

export default TagCardList;
