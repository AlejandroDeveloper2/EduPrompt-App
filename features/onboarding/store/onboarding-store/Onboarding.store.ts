import { router } from "expo-router";
import Storage from "expo-sqlite/kv-store";
import { create } from "zustand";

import { OnboardingStoreType } from "./store-types";

import { ONBOARDING_STEPS } from "../../constants";

const STORAGE_KEY: string = "isOnboardingCompleted";

export const OnboardingStore = create<OnboardingStoreType>((set, get) => ({
  isCompleting: false,
  steps: ONBOARDING_STEPS["es"],
  currentStep: ONBOARDING_STEPS["es"][0],

  handleNextStep: (): void => {
    const nextStepId = parseInt(get().currentStep.stepId) + 1;
    const nextStep = get().steps.find(
      (step) => step.stepId === String(nextStepId)
    );

    if (!nextStep) {
      console.error("Invalid Next Step");
      return;
    }

    set({ currentStep: nextStep });
  },
  handlePreviousStep: (): void => {
    const previousStepId = parseInt(get().currentStep.stepId) - 1;

    const previousStep = get().steps.find(
      (step) => step.stepId === String(previousStepId)
    );

    if (!previousStep) {
      console.error("Invalid Previous Step");
      return;
    }

    set({ currentStep: previousStep });
  },
  goToExactStep: (stepId: string): void => {
    const targetStep = get().steps.find((step) => step.stepId === stepId);

    if (!targetStep) {
      console.error("Step Not Found");
      return;
    }

    set({ currentStep: targetStep });
  },
  completeOnboarding: async () => {
    set({ isCompleting: true });
    try {
      await Storage.setItem(STORAGE_KEY, JSON.stringify(true));
      router.replace("/auth");
    } catch (e: unknown) {
      console.error(e);
    } finally {
      set({ isCompleting: false });
    }
  },
  checkIfOnboardingDone: async () => {
    try {
      const isCompleted = await Storage.getItem(STORAGE_KEY);
      const isOnboardingCompleted = isCompleted ? Boolean(isCompleted) : false;

      return isOnboardingCompleted;
    } catch (e: unknown) {
      console.error(e);
      return false;
    }
  },
}));
