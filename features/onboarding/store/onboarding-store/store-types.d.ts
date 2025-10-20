import { Step } from "@/core/types";

export interface OnboardingStoreType {
  isCompleting: boolean;
  steps: Step[];
  currentStep: Step;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  goToExactStep: (stepId: string) => void;
  completeOnboarding: () => Promise<void>;
  checkIfOnboardingDone: () => Promise<boolean>;
}
