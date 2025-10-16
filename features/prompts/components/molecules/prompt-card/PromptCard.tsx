import { useState } from "react";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { Prompt } from "../../../types";

import { AppColors } from "@/shared/styles";

import { useAnimatedCard } from "@/shared/hooks/animations";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import {
  Badge,
  Checkbox,
  MaterialIcon,
  Typography,
} from "@/shared/components/atoms";

import { PromptCardStyle } from "./PromptCard.style";

interface PromptCardProps {
  promptData: Prompt;
  onEditPrompt: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PromptCard = ({ promptData, onEditPrompt }: PromptCardProps) => {
  const { promptTitle } = promptData;

  const [isSelected, setIsSelected] = useState<boolean>(false);

  const size = useScreenDimensionsStore();
  const animatedCardStyle = useAnimatedCard(isSelected);

  const promptCardStyle = PromptCardStyle(size);

  return (
    <AnimatedPressable
      style={[promptCardStyle.CardContainer, animatedCardStyle]}
      onPress={onEditPrompt}
    >
      <View style={promptCardStyle.CardHeader}>
        <View style={promptCardStyle.CardTags}>
          <Badge label={promptData.tag} variant="primary" />
        </View>
        <MaterialIcon
          name="pencil-outline"
          size={size === "mobile" ? 20 : 24}
          color={AppColors.neutral[1000]}
          onPress={onEditPrompt}
        />
      </View>
      <View style={promptCardStyle.CardContent}>
        <Typography
          text={promptTitle}
          weight="medium"
          type="button"
          textAlign="left"
          color={AppColors.neutral[1000]}
          width="auto"
          icon="chatbox-outline"
        />
        <Checkbox
          checked={isSelected}
          onCheck={() => setIsSelected(!isSelected)}
        />
      </View>
    </AnimatedPressable>
  );
};

export default PromptCard;
