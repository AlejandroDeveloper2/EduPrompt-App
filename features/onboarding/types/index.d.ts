type IllustrationType =
  | "FirstStepImage"
  | "SecondStepImage"
  | "ThirdStepImage"
  | "FourthStepImage"
  | "FiveStepImage";

interface OnboardingStep {
  stepId: string;
  stepIcon: keyof typeof Ionicons.glyphMap;
  stepTitle: string;
  description: string;
  stepIllustration: IllustrationType;
}

export type { IllustrationType, OnboardingStep };
