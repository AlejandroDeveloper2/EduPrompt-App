import { useStore } from "zustand";

import { OnboardingStore } from "../../store";

const useOnboardingStore = () => {
  return useStore(OnboardingStore);
};

export default useOnboardingStore;
