import { useState } from "react";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { DownloadedFile } from "@/features/my-files/types";

import { AppColors } from "@/shared/styles";

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
  folderName: string;
  creationDate: string;
  files: DownloadedFile[];
  folderUri: string;
  onEditFolderName: () => void;
  onOpenFolder: () => void;
}

const FileFolder = ({
  folderName,
  creationDate,
  files,
  folderUri,
  onEditFolderName,
  onOpenFolder,
}: FileFolderProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const size = useScreenDimensionsStore();
  const animatedFileFolderStyle = useAnimatedFileFolder(isSelected);

  const fileFolderStyle = FileFolderStyle(size);

  return (
    <Animated.View
      style={[fileFolderStyle.FileFolderContainer, animatedFileFolderStyle]}
    >
      <View style={fileFolderStyle.Header}>
        <Typography
          text={folderName}
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
            text={`${files.length} Archivos`}
            weight="bold"
            type="caption"
            textAlign="left"
            color={AppColors.neutral[600]}
            width="auto"
            icon="document-outline"
          />
          <Typography
            text={new Date(creationDate).toLocaleDateString()}
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
          onCheck={() => setIsSelected(!isSelected)}
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
