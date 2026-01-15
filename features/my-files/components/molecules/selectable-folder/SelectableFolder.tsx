import { useMemo } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

import { Folder } from "@/features/my-files/types";

import { AppColors } from "@/shared/styles";

import { useAnimatedFileFolder } from "@/features/my-files/hooks/animations";
import { useTranslations } from "@/shared/hooks/core";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { Checkbox, Typography } from "@/shared/components/atoms";

import { FileFolderStyle } from "../file-folder/FIleFolder.style";

interface SelectableFolderProps {
  data: Folder;
  selectedFolderInfo: Pick<Folder, "folderId" | "folderName"> | null;
  onSelectFolderInfo: (
    selectedFolder: Pick<Folder, "folderId" | "folderName">
  ) => void;
}

const SelectableFolder = ({
  data,
  selectedFolderInfo,
  onSelectFolderInfo,
}: SelectableFolderProps) => {
  const size = useScreenDimensionsStore();

  const isSelected: boolean = useMemo(
    () => data.folderId === selectedFolderInfo?.folderId,
    [data.folderId, selectedFolderInfo?.folderId]
  );

  const animatedFileFolderStyle = useAnimatedFileFolder(isSelected);

  const { t } = useTranslations();

  const fileFolderStyle = FileFolderStyle(size);

  return (
    <Animated.View
      style={[fileFolderStyle.FileFolderContainer, animatedFileFolderStyle]}
    >
      <View style={fileFolderStyle.Header}>
        <Typography
          text={data.folderName}
          weight="medium"
          type="paragraph"
          textAlign="left"
          color={AppColors.neutral[1000]}
          width="auto"
          icon="folder-outline"
        />
      </View>
      <View style={fileFolderStyle.MetadataContainer}>
        <View style={fileFolderStyle.Metadata}>
          <Typography
            text={`${data.files.length} ${t(
              "my-files-translations.folder-list-labels.files-count-label"
            )}`}
            weight="bold"
            type="caption"
            textAlign="left"
            color={AppColors.neutral[600]}
            width="auto"
            icon="document-outline"
          />
          <Typography
            text={new Date(data.creationDate).toLocaleDateString()}
            weight="regular"
            type="caption"
            textAlign="left"
            color={AppColors.neutral[600]}
            width="auto"
            icon="calendar-outline"
          />
        </View>
        <Checkbox
          checked={isSelected}
          onCheck={() => onSelectFolderInfo(data)}
        />
      </View>
    </Animated.View>
  );
};

export default SelectableFolder;
