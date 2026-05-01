import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";
import { dynamicStyles } from "./PromptCard.style";

import { Prompt } from "../../../types";

import { AppColors } from "@/shared/styles";

import { usePromptCardLogic } from "@/features/prompts/hooks/core";

import {
  Badge,
  Checkbox,
  MaterialIcon,
  SyncronizationIndicator,
  Typography,
} from "@/shared/components/atoms";

interface PromptCardProps {
  promptData: Prompt;
  totalRecords: number;
  onEditPrompt?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PromptCard = ({
  promptData,
  onEditPrompt,
  totalRecords,
}: PromptCardProps) => {
  const { promptTitle } = promptData;

  const {
    size,
    isSelected,
    animatedCardStyle,
    tags,
    toggleSelection,
    selectionMode,
    t,
  } = usePromptCardLogic(promptData);

  const styles = dynamicStyles(size);

  return (
    <AnimatedPressable
      style={[styles.CardContainer, animatedCardStyle]}
      onPress={onEditPrompt && !selectionMode ? onEditPrompt : () => {}}
    >
      <View style={styles.CardHeader}>
        <View style={styles.CardTags}>
          <Badge
            label={
              tags.find((t) => t.tagId === promptData.tag)?.name ??
              t("prompts_translations.prompt_list_labels.no_tag_name_badge")
            }
            variant="primary"
          />
          <SyncronizationIndicator synced={promptData.sync} />
        </View>
        {onEditPrompt && !selectionMode && (
          <MaterialIcon
            name="pencil-outline"
            size={size === "mobile" ? 20 : 24}
            color={AppColors.neutral[1000]}
            onPress={onEditPrompt}
          />
        )}
      </View>
      <View style={styles.CardContent}>
        <Typography
          text={promptTitle}
          weight="medium"
          type="button"
          textAlign="left"
          color={AppColors.neutral[1000]}
          width={250}
          icon="chatbox-outline"
        />
        <Checkbox
          checked={isSelected}
          onCheck={() => toggleSelection(promptData.promptId, totalRecords)}
        />
      </View>
    </AnimatedPressable>
  );
};

export default PromptCard;
