import { useRouter } from "expo-router";
import { useEffect } from "react";

import { useOnboardingStore } from "../store";

const useCheckOnboarding = () => {
  const { checkIfOnboardingDone } = useOnboardingStore();

  const router = useRouter();

  useEffect(() => {
    const validateOnboardingStatus = async () => {
      const isOnboardingCompleted = await checkIfOnboardingDone();

      if (isOnboardingCompleted) router.replace("/auth");
      else router.replace("/onboarding");
    };
    validateOnboardingStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
};

export default useCheckOnboarding;
