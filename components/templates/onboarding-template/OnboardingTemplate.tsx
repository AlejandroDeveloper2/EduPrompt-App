import { View } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAnimatedOnboarding } from "@/lib/hooks/animations";
import {
  useOnboardingStore,
  useScreenDimensionsStore,
} from "@/lib/hooks/store";

import { LogoV2 } from "@/components/atoms";
import { Button, Stepper } from "@/components/molecules";
import { OnboardingDescription } from "@/components/organims";

import { GlobalStyles } from "@/styles/GlobalStyles.style";
import { OnboardingTemplateStyle } from "./OnboardingTemplate.style";

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
      <View style={onBoardingTemplateStyle.Container}>
        <LogoV2 style={animatedLogoStyle} />
        <Animated.View
          style={[onBoardingTemplateStyle.StepContainerBox, animatedBoxStyle]}
        >
          <Button
            icon="play-skip-forward-outline"
            width="auto"
            variant="neutral"
            style={{ position: "absolute", top: 20, right: 20 }}
            disabled={currentStep.stepId === "4"}
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
            style={{
              position: "absolute",
              bottom: 20,
              alignSelf: "center",
            }}
            onActive={(stepId) =>
              runReverseAnimation(() => goToExactStep(stepId))
            }
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default OnboardingTemplate;
