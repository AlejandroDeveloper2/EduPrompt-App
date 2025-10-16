import { useState } from "react";
import { FlatList } from "react-native";

import { Folder } from "../../../types";

import { AppColors } from "@/shared/styles";

import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { Empty, LoadingTextIndicator } from "@/shared/components/molecules";
import { FileFolder } from "../../molecules";

const downloadedResources: Folder[] = [];

const DownloadedFileList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const size = useScreenDimensionsStore();

  return (
    <FlatList
      data={downloadedResources}
      numColumns={size === "laptop" ? 2 : 1}
      renderItem={({ item }) => (
        <FileFolder
          {...item}
          onEditFolderName={() => {}}
          onOpenFolder={() => {}}
        />
      )}
      keyExtractor={(item) => item.folderId}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<></>}
      ListEmptyComponent={
        <Empty message="No hay carpetas creadas" icon="folder-outline" />
      }
      onEndReached={(info) =>
        info.distanceFromEnd === 0 ? setLoading(true) : setLoading(false)
      }
      ListFooterComponent={
        loading ? (
          <LoadingTextIndicator
            message="Cargando carpetas..."
            color={AppColors.primary[400]}
          />
        ) : null
      }
    />
  );
};

export default DownloadedFileList;
