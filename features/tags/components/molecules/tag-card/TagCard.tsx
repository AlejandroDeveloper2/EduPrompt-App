import { useMemo } from "react";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { Tag } from "@/features/tags/types";
import { AppColors } from "@/shared/styles";

import { useTagsSelectionStore } from "@/features/tags/hooks/store";
import { useAnimatedCard } from "@/shared/hooks/animations";
import { useTranslations } from "@/shared/hooks/core";
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

import { TagCardStyle } from "./TagCard.style";

interface TagCardProps {
  data: Tag;
  totalRecords: number;
  onEdit?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const TagCard = ({ data, totalRecords, onEdit }: TagCardProps) => {
  const size = useScreenDimensionsStore();
  const { selectedTagIds, toggleSelection } = useTagsSelectionStore();
  const { selectionMode } = useSelectionModeStore();

  const isSelected: boolean = useMemo(
    () => selectedTagIds.has(data.tagId),
    [data.tagId, selectedTagIds]
  );

  const animatedCardStyle = useAnimatedCard(isSelected);

  const { t } = useTranslations();

  const tagCardStyle = TagCardStyle(size);

  return (
    <AnimatedPressable
      style={[animatedCardStyle, tagCardStyle.CardContainer]}
      onPress={onEdit && !selectionMode ? onEdit : () => {}}
    >
      <View style={tagCardStyle.CardHeader}>
        <View style={tagCardStyle.CardTags}>
          <Badge
            label={
              data.type === "prompt_tag"
                ? t("tags-translations.tag-list-labels.prompt-tag-badge")
                : t("tags-translations.tag-list-labels.resource-tag-badge")
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
      <View style={tagCardStyle.CardContent}>
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
