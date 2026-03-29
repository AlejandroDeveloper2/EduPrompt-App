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
    t,
  } = useFileListLogic();

  const fileListStyle = FileListStyle(size);

  return (
    <>
      <PopUp
        icon="information-circle-outline"
        title={t(
          "my_files_translations.file_list_labels.confirm_delete_alert_labels.title",
        )}
        isOpen={confirmFileDeletePopUp.isOpen}
        onClose={confirmFileDeletePopUp.closePopUp}
      >
        <Alert
          variant="danger"
          message={t(
            "my_files_translations.file_list_labels.confirm_delete_alert_labels.message",
          )}
          acceptButtonLabel={t(
            "my_files_translations.file_list_labels.confirm_delete_alert_labels.btn_accept",
          )}
          acceptButtonIcon="trash-bin-outline"
          onCancel={confirmFileDeletePopUp.closePopUp}
          onAccept={() => {
            deleteManyFiles(folderId);
            confirmFileDeletePopUp.closePopUp();
          }}
        />
      </PopUp>
      <PopUp
        title={t(
          "my_files_translations.file_list_labels.update_file_name_popup_labels.title",
        )}
        icon="pencil-outline"
        isOpen={editFileNamePopUp.isOpen}
        onClose={editFileNamePopUp.closePopUp}
        scrollable
      >
        {selectedFileInfo && (
          <EditFileNameForm
            folderId={folderId}
            fileId={selectedFileInfo.fileId}
            fileName={selectedFileInfo.name}
            onClosePopUp={editFileNamePopUp.closePopUp}
          />
        )}
      </PopUp>
      <PopUp
        title={t(
          "my_files_translations.file_list_labels.move_files_popup_labels.title",
        )}
        icon="move-outline"
        isOpen={moveFilesPopUp.isOpen}
        onClose={moveFilesPopUp.closePopUp}
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
              editFileNamePopUp.openPopUp();
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
          <Empty
            message={t("my_files_translations.file_list_labels.no_files_msg")}
            icon="document-outline"
          />
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
