import { useState } from "react";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "@/styles";

import { useAnimatedFileFolder } from "@/lib/hooks/animations";
import { useScreenDimensionsStore } from "@/lib/hooks/store";

import {
  Checkbox,
  Ionicon,
  MaterialIcon,
  Typography,
} from "@/components/atoms";

import { FileFolderStyle } from "./FIleFolder.style";

interface FileFolderProps {
  folderName: string;
  creationDate: string;
  files: number;
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
            text={`${files} Archivos`}
            weight="bold"
            type="caption"
            textAlign="left"
            color={AppColors.neutral[600]}
            width="auto"
            icon="document-outline"
          />
          <Typography
            text={creationDate}
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
