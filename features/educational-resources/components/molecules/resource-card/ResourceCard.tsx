import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { EducationalResource } from "../../../types";

import { AppColors } from "@/shared/styles";

import { useResourceCardLogic } from "@/features/educational-resources/hooks/core";

import {
  Badge,
  Checkbox,
  MaterialIcon,
  SyncronizationIndicator,
  Typography,
} from "@/shared/components/atoms";

import { dynamicStyles } from "./ResourceCard.style";

interface ResourceCardProps {
  resourceData: EducationalResource;
  icon: keyof typeof Ionicons.glyphMap;
  totalRecords: number;
  onViewResource?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ResourceCard = ({
  resourceData,
  icon,
  totalRecords,
  onViewResource,
}: ResourceCardProps) => {
  const { title, format, groupTag, creationDate } = resourceData;

  const {
    size,
    isSelected,
    animatedCardStyle,
    selectionMode,
    tags,
    t,
    toggleSelection,
  } = useResourceCardLogic(resourceData);

  const styles = dynamicStyles(size);

  return (
    <AnimatedPressable
      style={[styles.CardContainer, animatedCardStyle]}
      onPress={onViewResource && !selectionMode ? onViewResource : () => {}}
    >
      <View style={styles.CardHeader}>
        <View style={styles.CardTags}>
          <Badge label={format} variant="primary" />
          <Badge
            label={
              tags.find((t) => t.tagId === groupTag)?.name ??
              t(
                "resources_translations.resources_list_labels.no_resource_tag_label",
              )
            }
            variant="neutral"
          />
          <SyncronizationIndicator synced={resourceData.sync} />
        </View>
        {onViewResource && !selectionMode && (
          <MaterialIcon
            name="pencil-outline"
            size={size === "mobile" ? 20 : 24}
            color={AppColors.neutral[1000]}
            onPress={onViewResource}
          />
        )}
      </View>
      <View style={styles.CardContent}>
        <Typography
          text={title}
          weight="medium"
          type="button"
          textAlign="left"
          color={AppColors.neutral[1000]}
          width={250}
          icon={icon}
        />
        <Checkbox
          checked={isSelected}
          onCheck={() => toggleSelection(resourceData.resourceId, totalRecords)}
        />
      </View>
      <Typography
        text={new Date(creationDate).toLocaleDateString()}
        weight="light"
        type="caption"
        textAlign="left"
        color={AppColors.neutral[600]}
        width="auto"
        icon="calendar-outline"
      />
    </AnimatedPressable>
  );
};

export default ResourceCard;
