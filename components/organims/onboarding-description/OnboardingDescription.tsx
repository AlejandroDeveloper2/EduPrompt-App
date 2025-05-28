import { View } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "@/styles";

import {
  useOnboardingStore,
  useScreenDimensionsStore,
} from "@/lib/hooks/store";

import { renderOnboardingStepImage } from "@/lib/utils";

import { ScreenSection } from "@/components/atoms";
import { Button } from "@/components/molecules";

import { OnboardingDescriptionStyle } from "./OnboardingDescription.style";

interface OnboardingDescriptionProps {
  runReverseAnimation: (callback: () => void) => void;
  animatedOnboardingStyle: {
    opacity: number;
    transform: {
      translateX: number;
    }[];
  };
}

const OnboardingDescription = ({
  runReverseAnimation,
  animatedOnboardingStyle,
}: OnboardingDescriptionProps) => {
  const size = useScreenDimensionsStore();
  const {
    currentStep,
    handleNextStep,
    handlePreviousStep,
    completeOnboarding,
  } = useOnboardingStore();

  const onboardingDescriptionStyle = OnboardingDescriptionStyle(size);
  const Illustration = renderOnboardingStepImage(currentStep.stepIllustration);

  return (
    <Animated.View
      style={[onboardingDescriptionStyle.StepContent, animatedOnboardingStyle]}
    >
      {Illustration}
      <View style={onboardingDescriptionStyle.StepDescription}>
        <ScreenSection
          description={currentStep.description}
          title={currentStep.stepTitle}
          icon={currentStep.stepIcon}
          color={AppColors.primary[400]}
        />
        <View style={onboardingDescriptionStyle.StepOptions}>
          {currentStep.stepId !== "1" && (
            <Button
              icon="chevron-back-outline"
              label="Anterior"
              width="100%"
              variant="neutral"
              style={{ flex: size === "mobile" ? undefined : 1 }}
              onPress={() => runReverseAnimation(handlePreviousStep)}
            />
          )}
          <Button
            icon={
              currentStep.stepId === "4"
                ? "star-outline"
                : "chevron-forward-outline"
            }
            label={currentStep.stepId === "4" ? "Empezar" : "Siguiente"}
            width="100%"
            variant="primary"
            style={{ flex: size === "mobile" ? undefined : 1 }}
            onPress={
              currentStep.stepId === "4"
                ? completeOnboarding
                : () => runReverseAnimation(handleNextStep)
            }
          />
        </View>
      </View>
    </Animated.View>
  );
};

export default OnboardingDescription;
