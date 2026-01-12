import { useMemo } from "react";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { Folder } from "@/features/my-files/types";

import { AppColors } from "@/shared/styles";

import { useFilesSelectionStore } from "@/features/my-files/hooks/store";
import { useScreenDimensionsStore } from "@/shared/hooks/store";
import { useAnimatedFileFolder } from "../../../hooks/animations";

import {
  Checkbox,
  Ionicon,
  MaterialIcon,
  Typography,
} from "@/shared/components/atoms";

import { FileFolderStyle } from "./FIleFolder.style";

interface FileFolderProps {
  data: Folder;
  totalRecords: number;
  onEditFolderName: () => void;
  onOpenFolder: () => void;
}

const FileFolder = ({
  data,
  totalRecords,
  onEditFolderName,
  onOpenFolder,
}: FileFolderProps) => {
  const size = useScreenDimensionsStore();
  const { selectedElementIds, toggleSelection } = useFilesSelectionStore();

  const isSelected: boolean = useMemo(
    () => selectedElementIds.has(data.folderId),
    [data.folderId, selectedElementIds]
  );

  const animatedFileFolderStyle = useAnimatedFileFolder(isSelected);

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
        <MaterialIcon
          name="pencil-outline"
          size={size === "mobile" ? 20 : 24}
          color={AppColors.neutral[1000]}
          onPress={onEditFolderName}
        />
      </View>
      <View style={fileFolderStyle.MetadataContainer}>
        <View style={fileFolderStyle.Metadata}>
          <Typography
            text={`${data.files.length} Archivos`}
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
          onCheck={() => toggleSelection(data.folderId, totalRecords)}
        />
      </View>
      <Pressable
        style={fileFolderStyle.OpenFolderPressable}
        onPress={onOpenFolder}
      >
        <Ionicon
          name="chevron-forward-outline"
          size={size === "mobile" ? 20 : 24}
          color={AppColors.basic.white}
        />
      </Pressable>
    </Animated.View>
  );
};

export default FileFolder;
