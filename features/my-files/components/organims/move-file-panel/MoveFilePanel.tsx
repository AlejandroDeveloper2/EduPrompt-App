import { FlatList } from "react-native";

import { AppColors } from "@/shared/styles";

import { useMoveFilePanelLogic } from "@/features/my-files/hooks/core";

import {
  Button,
  Empty,
  LoadingTextIndicator,
} from "@/shared/components/molecules";
import { SelectableFolder } from "../../molecules";
import FolderListHeader from "../folder-list/FolderListHeader";

import { MoveFilePanelStyle } from "./MoveFilePanel.style";

interface MoveFilePanelProps {
  originFolderId: string;
}

const MoveFilePanel = ({ originFolderId }: MoveFilePanelProps) => {
  const {
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
    /** Move Files */
    moveFiles,
  } = useMoveFilePanelLogic();

  const moveFilePanelStyle = MoveFilePanelStyle(size);

  return (
    <FlatList
      style={moveFilePanelStyle.ListContainer}
      contentContainerStyle={moveFilePanelStyle.ListContent}
      data={filteredElements.filter(
        (folder) => folder.folderId !== originFolderId
      )}
      horizontal={false}
      windowSize={5}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      numColumns={size === "laptop" ? 2 : 1}
      renderItem={({ item }) => (
        <SelectableFolder
          data={item}
          selectedFolderInfo={selectedFolderInfo}
          onSelectFolderInfo={(folderInfo) => setSelectedFolderInfo(folderInfo)}
        />
      )}
      keyExtractor={(item) => item.folderId}
      showsVerticalScrollIndicator={false}
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
        <Empty message="No hay carpetas creados" icon="folder-outline" />
      }
      ListFooterComponent={
        <>
          {isLoading && loadingMessage ? (
            <LoadingTextIndicator
              message={loadingMessage}
              color={AppColors.primary[400]}
            />
          ) : null}
          <Button
            icon="move-outline"
            variant="primary"
            width="100%"
            label="Mover"
            disabled={selectedFolderInfo === null}
            onPress={() =>
              selectedFolderInfo
                ? moveFiles(originFolderId, selectedFolderInfo.folderId)
                : () => {}
            }
          />
        </>
      }
    />
  );
};

export default MoveFilePanel;
