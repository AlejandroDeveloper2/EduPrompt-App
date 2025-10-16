import { ImageBackground, View } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useScreenDimensionsStore } from "@/shared/hooks/store";
import { useAnimatedOnboarding } from "../../../hooks/animations";
import { useOnboardingStore } from "../../../hooks/store";

import { LogoV2 } from "@/shared/components/atoms";
import { Button, Stepper } from "@/shared/components/molecules";
import { OnboardingDescription } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";
import { OnboardingTemplateStyle } from "./OnboardingTemplate.style";

import EduPromptBackground from "@/assets/images/eduprompt-background.png";

const OnboardingTemplate = () => {
  const insets = useSafeAreaInsets();

  const size = useScreenDimensionsStore();
  const { currentStep, steps, goToExactStep } = useOnboardingStore();
  const {
    animatedOnboardingStyle,
    animatedLogoStyle,
    animatedBoxStyle,
    runReverseAnimation,
  } = useAnimatedOnboarding();

  const onBoardingTemplateStyle = OnboardingTemplateStyle(size, insets);

  return (
    <View style={GlobalStyles.RootContainer}>
      <ImageBackground
        style={onBoardingTemplateStyle.Container}
        source={EduPromptBackground}
      >
        <View style={onBoardingTemplateStyle.OpacityLayer} />
        <LogoV2 style={animatedLogoStyle} />
        <Animated.View
          style={[onBoardingTemplateStyle.StepContainerBox, animatedBoxStyle]}
        >
          <Button
            icon="play-skip-forward-outline"
            width="auto"
            variant="neutral"
            style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}
            disabled={currentStep.stepId === "5"}
            onPress={() =>
              runReverseAnimation(() =>
                goToExactStep(steps[steps.length - 1].stepId)
              )
            }
          />
          <OnboardingDescription
            animatedOnboardingStyle={animatedOnboardingStyle}
            runReverseAnimation={runReverseAnimation}
          />
          <Stepper
            steps={steps}
            currentStep={currentStep}
            onActive={(stepId) =>
              runReverseAnimation(() => goToExactStep(stepId))
            }
          />
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

export default OnboardingTemplate;
