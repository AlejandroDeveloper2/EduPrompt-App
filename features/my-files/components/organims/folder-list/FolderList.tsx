import { FlatList } from "react-native";

import { AppColors } from "@/shared/styles";

import { useFolderListLogic } from "@/features/my-files/hooks/core";

import { Empty, LoadingTextIndicator } from "@/shared/components/molecules";
import { Alert, PopUp } from "@/shared/components/organims";
import { FileFolder } from "../../molecules";
import EditFolderNameForm from "../edit-folder-name-form/EditFolderNameForm";
import FolderListHeader from "./FolderListHeader";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";
import { FolderListStyle } from "./FolderList.style";

const FolderList = () => {
  const {
    router,
    /** Size */
    size,
    /** Filters */
    order,
    searchValue,
    filteredElements,
    handleSearchChange,
    onClearSearchInput,
    onChangeOrder,
    /** Loading */
    isLoading,
    loadingMessage,
    /** Folder Info*/
    selectedFolderInfo,
    setSelectedFolderInfo,
    /** Edit Folder name pop up */
    confirmFolderDeletePopUp,
    editFolderNamePopUp: {
      onClosePopUp,
      dragGesture,
      animatedPopUpStyle,
      isPopUpMounted,
      onOpenPopUp,
    },
    deleteManyFolders,
  } = useFolderListLogic();

  const folderListStyle = FolderListStyle(size);

  return (
    <>
      <PopUp
        icon="information-circle-outline"
        title="Alerta"
        {...confirmFolderDeletePopUp}
        gesture={confirmFolderDeletePopUp.dragGesture}
      >
        <Alert
          variant="danger"
          message="¿Estas seguro que deseas eliminar las carpetas?"
          acceptButtonLabel="Eliminar"
          acceptButtonIcon="trash-bin-outline"
          onCancel={confirmFolderDeletePopUp.onClosePopUp}
          onAccept={() => {
            deleteManyFolders();
            confirmFolderDeletePopUp.onClosePopUp();
          }}
        />
      </PopUp>
      <PopUp
        gesture={dragGesture}
        title="Editar nombre de la carpeta"
        icon="pencil-outline"
        onClosePopUp={onClosePopUp}
        animatedPopUpStyle={animatedPopUpStyle}
        isPopUpMounted={isPopUpMounted}
      >
        {selectedFolderInfo && (
          <EditFolderNameForm
            folderId={selectedFolderInfo.folderId}
            folderName={selectedFolderInfo.folderName}
            onClosePopUp={onClosePopUp}
          />
        )}
      </PopUp>
      <FlatList
        style={[folderListStyle.ListContainer, GlobalStyles.PageDimensions]}
        contentContainerStyle={folderListStyle.ListContent}
        data={filteredElements}
        horizontal={false}
        windowSize={5}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        numColumns={size === "laptop" ? 2 : 1}
        renderItem={({ item }) => (
          <FileFolder
            data={item}
            totalRecords={filteredElements.length}
            onEditFolderName={() => {
              setSelectedFolderInfo({
                folderId: item.folderId,
                folderName: item.folderName,
              });
              onOpenPopUp();
            }}
            onOpenFolder={() =>
              router.navigate(`/(tabs)/files_screen/${item.folderId}`)
            }
          />
        )}
        keyExtractor={(item) => item.folderId}
        ListHeaderComponent={
          <FolderListHeader
            order={order}
            searchValue={searchValue}
            onChangeOrder={onChangeOrder}
            onSearchValueChange={handleSearchChange}
            onClearSearchInput={onClearSearchInput}
          />
        }
        ListEmptyComponent={
          <Empty message="No hay carpetas ahora mismo" icon="folder-outline" />
        }
        ListFooterComponent={
          isLoading ? (
            <LoadingTextIndicator
              message={loadingMessage ?? "..."}
              color={AppColors.primary[400]}
            />
          ) : null
        }
      />
    </>
  );
};

export default FolderList;
