import { FlatList } from "react-native";

import { AppColors } from "@/shared/styles";

import { useFileListLogic } from "@/features/my-files/hooks/core";

import { Empty, LoadingTextIndicator } from "@/shared/components/molecules";
import { Alert, PopUp } from "@/shared/components/organims";
import { FileCard } from "../../molecules";
import EditFileNameForm from "../edit-file-name-form/EditFileNameForm";
import MoveFilePanel from "../move-file-panel/MoveFilePanel";
import DownloadedFileListHeader from "./DownloadedFileListHeader";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";
import { FileListStyle } from "./DownloadedFileList.style";

const DownloadedFileList = () => {
  const {
    /** Size */
    size,
    /** Filters */
    format,
    searchValue,
    filteredElements,
    handleSearchChange,
    onClearSearchInput,
    onChangeFormat,
    /** Loading */
    isLoading,
    loadingMessage,
    /** File Info*/
    folder,
    folderId,
    selectedFileInfo,
    setSelectedFileInfo,
    /** Pop ups */
    editFileNamePopUp,
    moveFilesPopUp,
    confirmFileDeletePopUp,
    /** Get File Icon */
    fileIcon,
    /** Delete Files */
    deleteManyFiles,
  } = useFileListLogic();

  const fileListStyle = FileListStyle(size);

  return (
    <>
      <PopUp
        icon="information-circle-outline"
        title="Alerta"
        {...confirmFileDeletePopUp}
        gesture={confirmFileDeletePopUp.dragGesture}
      >
        <Alert
          variant="danger"
          message="¿Estas seguro que deseas eliminar los archivos?"
          acceptButtonLabel="Eliminar"
          acceptButtonIcon="trash-bin-outline"
          onCancel={confirmFileDeletePopUp.onClosePopUp}
          onAccept={() => {
            deleteManyFiles(folderId);
            confirmFileDeletePopUp.onClosePopUp();
          }}
        />
      </PopUp>
      <PopUp
        title="Editar nombre del archivo"
        icon="pencil-outline"
        gesture={editFileNamePopUp.dragGesture}
        {...editFileNamePopUp}
      >
        {selectedFileInfo && (
          <EditFileNameForm
            folderId={folderId}
            fileId={selectedFileInfo.fileId}
            fileName={selectedFileInfo.name}
            onClosePopUp={editFileNamePopUp.onClosePopUp}
          />
        )}
      </PopUp>
      <PopUp
        title="Mover archivo a carpeta"
        icon="move-outline"
        gesture={moveFilesPopUp.dragGesture}
        {...moveFilesPopUp}
      >
        <MoveFilePanel originFolderId={folderId} />
      </PopUp>
      <FlatList
        style={[fileListStyle.ListContainer, GlobalStyles.PageDimensions]}
        contentContainerStyle={fileListStyle.ListContent}
        data={filteredElements}
        horizontal={false}
        windowSize={5}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        numColumns={size === "laptop" ? 2 : 1}
        renderItem={({ item }) => (
          <FileCard
            fileData={item}
            icon={fileIcon(item.formatKey)}
            totalRecords={folder?.files.length ?? 0}
            onEditFileName={() => {
              setSelectedFileInfo(item);
              editFileNamePopUp.onOpenPopUp();
            }}
          />
        )}
        keyExtractor={(item) => item.fileId}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <DownloadedFileListHeader
            format={format}
            searchValue={searchValue}
            onChangeFormat={onChangeFormat}
            onSearchValueChange={handleSearchChange}
            onClearSearchInput={onClearSearchInput}
          />
        }
        ListEmptyComponent={
          <Empty message="No hay archivos creados" icon="document-outline" />
        }
        ListFooterComponent={
          isLoading && loadingMessage ? (
            <LoadingTextIndicator
              message={loadingMessage}
              color={AppColors.primary[400]}
            />
          ) : null
        }
      />
    </>
  );
};

export default DownloadedFileList;
