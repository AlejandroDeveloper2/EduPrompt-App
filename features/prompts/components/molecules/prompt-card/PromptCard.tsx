import { useMemo } from "react";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { Prompt } from "../../../types";

import { AppColors } from "@/shared/styles";

import { usePromptsSelectionStore } from "@/features/prompts/hooks/store";
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

import { PromptCardStyle } from "./PromptCard.style";

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

  const size = useScreenDimensionsStore();

  const { selectedPromptIds, toggleSelection } = usePromptsSelectionStore();
  const { selectionMode } = useSelectionModeStore();

  const { tags } = useEventbusValue("tags.list.pagination.updated", {
    tags: [],
    hasNextPage: false,
    isFetchingNextPage: false,
    refreshing: false,
  });

  const isSelected: boolean = useMemo(
    () => selectedPromptIds.has(promptData.promptId),
    [promptData.promptId, selectedPromptIds]
  );

  const animatedCardStyle = useAnimatedCard(isSelected);

  const promptCardStyle = PromptCardStyle(size);

  return (
    <AnimatedPressable
      style={[promptCardStyle.CardContainer, animatedCardStyle]}
      onPress={onEditPrompt && !selectionMode ? onEditPrompt : () => {}}
    >
      <View style={promptCardStyle.CardHeader}>
        <View style={promptCardStyle.CardTags}>
          <Badge
            label={
              tags.find((t) => t.tagId === promptData.tag)?.name ??
              "Sin etiqueta"
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
      <View style={promptCardStyle.CardContent}>
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
