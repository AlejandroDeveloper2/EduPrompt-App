import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { DownloadedFile } from "../../../types";

import { AppColors } from "@/shared/styles";

import { useFilesSelectionStore } from "@/features/my-files/hooks/store";
import { useAnimatedCard } from "@/shared/hooks/animations";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import {
  Badge,
  Checkbox,
  MaterialIcon,
  Typography,
} from "@/shared/components/atoms";

import { FileCardStyle } from "./FileCard.style";

interface FileCardProps {
  fileData: DownloadedFile;
  totalRecords: number;
  icon: keyof typeof Ionicons.glyphMap;
  onEditFileName: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const FileCard = ({
  fileData,
  totalRecords,
  icon,
  onEditFileName,
}: FileCardProps) => {
  const { name, format, downloadDate, fileSize, fileExtension } = fileData;

  const { selectedElementIds, toggleSelection } = useFilesSelectionStore();

  const isSelected: boolean = useMemo(
    () => selectedElementIds.has(fileData.fileId),
    [fileData.fileId, selectedElementIds]
  );

  const size = useScreenDimensionsStore();
  const animatedCardStyle = useAnimatedCard(isSelected);

  const fileCardStyle = FileCardStyle(size);

  return (
    <AnimatedPressable
      style={[fileCardStyle.CardContainer, animatedCardStyle]}
      onPress={onEditFileName}
    >
      <View style={fileCardStyle.CardHeader}>
        <View style={fileCardStyle.CardTags}>
          <Badge label={format} variant="primary" />
        </View>
        <MaterialIcon
          name="pencil-outline"
          size={size === "mobile" ? 20 : 24}
          color={AppColors.neutral[1000]}
          onPress={onEditFileName}
        />
      </View>
      <View style={fileCardStyle.CardContent}>
        <Typography
          text={`${name}.${fileExtension}`}
          weight="medium"
          type="button"
          textAlign="left"
          color={AppColors.neutral[1000]}
          width="auto"
          icon={icon}
        />
        <Checkbox
          checked={isSelected}
          onCheck={() => toggleSelection(fileData.fileId, totalRecords)}
        />
      </View>
      <View style={fileCardStyle.FileMetadata}>
        <Typography
          text={fileSize}
          weight="bold"
          type="caption"
          textAlign="left"
          color={AppColors.neutral[600]}
          width="auto"
          icon="server-outline"
        />
        <Typography
          text={new Date(downloadDate).toLocaleDateString()}
          weight="light"
          type="caption"
          textAlign="left"
          color={AppColors.neutral[600]}
          width="auto"
          icon="download-outline"
        />
      </View>
    </AnimatedPressable>
  );
};

export default FileCard;
