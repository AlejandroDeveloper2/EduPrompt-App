import { Step } from "../../types/data-types";

export interface OnboardingStoreType {
  steps: Step[];
  currentStep: Step;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  goToExactStep: (stepId: string) => void;
  completeOnboarding: () => Promise<void>;
  checkIfOnboardingDone: () => Promise<void>;
}
