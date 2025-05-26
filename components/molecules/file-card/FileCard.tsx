import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { DownloadedResource } from "@/lib/types/data-types";

import { AppColors } from "@/styles";

import { useAnimatedCard } from "@/lib/hooks/animations";
import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { Badge, Checkbox, MaterialIcon, Typography } from "@/components/atoms";

import { FileCardStyle } from "./FileCard.style";

interface FileCardProps {
  fileData: DownloadedResource;
  icon: keyof typeof Ionicons.glyphMap;
  onEditFileName: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const FileCard = ({ fileData, icon, onEditFileName }: FileCardProps) => {
  const { name, format, downloadDate, fileSize, fileExtension } = fileData;

  const [isSelected, setIsSelected] = useState<boolean>(false);

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
          onCheck={() => setIsSelected(!isSelected)}
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
          text={downloadDate}
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
