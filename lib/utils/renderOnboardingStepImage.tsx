import {
  FourthImage,
  IntroImage,
  SecondImage,
  ThirdImage,
} from "@/assets/illustrations";

export const renderOnboardingStepImage = (
  stepIllustration:
    | "FirstStepImage"
    | "SecondStepImage"
    | "ThirdStepImage"
    | "FourthStepImage"
) => {
  const Illustrations = {
    FirstStepImage: <IntroImage />,
    SecondStepImage: <SecondImage />,
    ThirdStepImage: <ThirdImage />,
    FourthStepImage: <FourthImage />,
  };
  return Illustrations[stepIllustration];
};
