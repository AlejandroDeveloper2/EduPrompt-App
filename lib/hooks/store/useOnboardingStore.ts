import { useStore } from "zustand";

import { OnboardingStore } from "@/lib/store";

const useOnboardingStore = () => {
  return useStore(OnboardingStore);
};

export default useOnboardingStore;
