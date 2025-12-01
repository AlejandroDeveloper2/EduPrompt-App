import { useRouter } from "expo-router";
import { useEffect } from "react";

import { useAuthStore } from "../store";

const useCheckAuth = (): void => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) router.replace("/(tabs)");
  }, [isAuthenticated, router]);
};

export default useCheckAuth;
