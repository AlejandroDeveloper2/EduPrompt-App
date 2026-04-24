import { OnboardingStep } from "../../types";

export interface OnboardingStoreType {
  isCompleting: boolean;
  steps: OnboardingStep[];
  currentStep: OnboardingStep;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  goToExactStep: (stepId: string) => void;
  completeOnboarding: () => Promise<void>;
  checkIfOnboardingDone: () => Promise<boolean>;
}
