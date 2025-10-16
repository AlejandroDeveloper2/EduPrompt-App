import {
  FiveImage,
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
    | "FiveStepImage"
) => {
  const Illustrations = {
    FirstStepImage: <IntroImage />,
    SecondStepImage: <SecondImage />,
    ThirdStepImage: <ThirdImage />,
    FourthStepImage: <FourthImage />,
    FiveStepImage: <FiveImage />,
  };
  return Illustrations[stepIllustration];
};
