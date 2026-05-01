import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { Tag } from "@/features/tags/types";
import { AppColors } from "@/shared/styles";

import { useTagCardLogic } from "@/features/tags/hooks/core";

import {
  Badge,
  Checkbox,
  MaterialIcon,
  SyncronizationIndicator,
  Typography,
} from "@/shared/components/atoms";

import { dynamicStyles } from "./TagCard.style";

interface TagCardProps {
  data: Tag;
  totalRecords: number;
  onEdit?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const TagCard = ({ data, totalRecords, onEdit }: TagCardProps) => {
  const {
    size,
    isSelected,
    animatedCardStyle,
    toggleSelection,
    selectionMode,
    t,
  } = useTagCardLogic(data);

  const styles = dynamicStyles(size);

  return (
    <AnimatedPressable
      style={[animatedCardStyle, styles.CardContainer]}
      onPress={onEdit && !selectionMode ? onEdit : () => {}}
    >
      <View style={styles.CardHeader}>
        <View style={styles.CardTags}>
          <Badge
            label={
              data.type === "prompt_tag"
                ? t("tags_translations.tag_list_labels.prompt_tag_badge")
                : t("tags_translations.tag_list_labels.resource_tag_badge")
            }
            variant="primary"
          />
          <SyncronizationIndicator synced={data.sync} />
        </View>
        {onEdit && !selectionMode && (
          <MaterialIcon
            name="pencil-outline"
            size={size === "mobile" ? 20 : 24}
            color={AppColors.neutral[1000]}
            onPress={onEdit}
          />
        )}
      </View>
      <View style={styles.CardContent}>
        <Typography
          text={data.name}
          weight="medium"
          type="button"
          textAlign="left"
          color={AppColors.neutral[1000]}
          width="auto"
          icon="pricetag-outline"
        />
        <Checkbox
          checked={isSelected}
          onCheck={() => toggleSelection(data.tagId, totalRecords)}
        />
      </View>
    </AnimatedPressable>
  );
};

export default TagCard;
