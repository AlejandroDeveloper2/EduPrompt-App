import { View } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors, Spacing } from "@/shared/styles";

import { useScreenDimensionsStore } from "@/shared/hooks/store";
import { useOnboardingStore } from "../../../hooks/store";

import { renderOnboardingStepImage } from "../../../utils";

import { ScreenSection } from "@/shared/components/atoms";
import { Button } from "@/shared/components/molecules";

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
    isCompleting,
    currentStep,
    handleNextStep,
    handlePreviousStep,
    completeOnboarding,
  } = useOnboardingStore();

  const onboardingDescriptionStyle = OnboardingDescriptionStyle(size);
  const Illustration = renderOnboardingStepImage(currentStep.stepIllustration);

  return (
    <Animated.ScrollView
      key={currentStep.stepId}
      style={[onboardingDescriptionStyle.StepContent, animatedOnboardingStyle]}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: Spacing.spacing_xl,
        flexGrow: 1,
      }}
    >
      {Illustration}
      <View style={onboardingDescriptionStyle.StepDescription}>
        <ScreenSection
          description={currentStep.description}
          title={currentStep.stepTitle}
          icon={currentStep.stepIcon}
          color={AppColors.primary[400]}
          fullTitleWidth
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
              currentStep.stepId === "5"
                ? "star-outline"
                : "chevron-forward-outline"
            }
            label={currentStep.stepId === "5" ? "Empezar" : "Siguiente"}
            width="100%"
            variant="primary"
            style={{ flex: size === "mobile" ? undefined : 1 }}
            loading={isCompleting}
            loadingMessage="Cargando..."
            disabled={isCompleting}
            onPress={
              currentStep.stepId === "5"
                ? async () => await completeOnboarding()
                : () => runReverseAnimation(handleNextStep)
            }
          />
        </View>
      </View>
    </Animated.ScrollView>
  );
};

export default OnboardingDescription;
