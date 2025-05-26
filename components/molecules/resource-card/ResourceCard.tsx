import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { EducationalResource } from "@/lib/types/data-types";

import { AppColors } from "@/styles";

import { useAnimatedCard } from "@/lib/hooks/animations";
import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { Badge, Checkbox, MaterialIcon, Typography } from "@/components/atoms";

import { ResourceCardStyle } from "./ResourceCard.style";

interface ResourceCardProps {
  resourceData: EducationalResource;
  icon: keyof typeof Ionicons.glyphMap;
  onViewResource: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ResourceCard = ({
  resourceData,
  icon,
  onViewResource,
}: ResourceCardProps) => {
  const { title, format, groupTag, creationDate } = resourceData;

  const [isSelected, setIsSelected] = useState<boolean>(false);

  const size = useScreenDimensionsStore();
  const animatedCardStyle = useAnimatedCard(isSelected);

  const resourceCardStyle = ResourceCardStyle(size);

  return (
    <AnimatedPressable
      style={[resourceCardStyle.CardContainer, animatedCardStyle]}
      onPress={onViewResource}
    >
      <View style={resourceCardStyle.CardHeader}>
        <View style={resourceCardStyle.CardTags}>
          <Badge label={format} variant="primary" />
          <Badge label={groupTag} variant="neutral" />
        </View>
        <MaterialIcon
          name="pencil-outline"
          size={size === "mobile" ? 20 : 24}
          color={AppColors.neutral[1000]}
          onPress={() => {}}
        />
      </View>
      <View style={resourceCardStyle.CardContent}>
        <Typography
          text={title}
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
      <Typography
        text={creationDate}
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
