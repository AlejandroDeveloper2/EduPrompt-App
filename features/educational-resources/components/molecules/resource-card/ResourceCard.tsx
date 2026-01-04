import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { EducationalResource } from "../../../types";

import { AppColors } from "@/shared/styles";

import { useResourcesSelectionStore } from "@/features/educational-resources/hooks/store";
import { useAnimatedCard } from "@/shared/hooks/animations";
import { useEventbusValue } from "@/shared/hooks/events";
import {
  useScreenDimensionsStore,
  useSelectionModeStore,
} from "@/shared/hooks/store";

import {
  Badge,
  Checkbox,
  MaterialIcon,
  SyncronizationIndicator,
  Typography,
} from "@/shared/components/atoms";

import { ResourceCardStyle } from "./ResourceCard.style";

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

  const size = useScreenDimensionsStore();
  const { selectedResourceIds, toggleSelection } = useResourcesSelectionStore();
  const { selectionMode } = useSelectionModeStore();

  const { tags } = useEventbusValue("tags.list.pagination.updated", {
    tags: [],
    hasNextPage: false,
    isFetchingNextPage: false,
    refreshing: false,
  });

  const isSelected: boolean = useMemo(
    () => selectedResourceIds.has(resourceData.resourceId),
    [resourceData.resourceId, selectedResourceIds]
  );

  const animatedCardStyle = useAnimatedCard(isSelected);

  const resourceCardStyle = ResourceCardStyle(size);

  return (
    <AnimatedPressable
      style={[resourceCardStyle.CardContainer, animatedCardStyle]}
      onPress={onViewResource && !selectionMode ? onViewResource : () => {}}
    >
      <View style={resourceCardStyle.CardHeader}>
        <View style={resourceCardStyle.CardTags}>
          <Badge label={format} variant="primary" />
          <Badge
            label={
              tags.find((t) => t.tagId === groupTag)?.name ?? "Sin etiqueta"
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
      <View style={resourceCardStyle.CardContent}>
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
