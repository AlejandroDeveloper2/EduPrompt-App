import { useEffect } from "react";

import { useOnboardingStore } from "../store";

const useCheckOnboarding = () => {
  const { checkIfOnboardingDone } = useOnboardingStore();

  useEffect(() => {
    checkIfOnboardingDone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useCheckOnboarding;
