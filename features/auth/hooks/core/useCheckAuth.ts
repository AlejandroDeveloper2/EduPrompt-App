import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { useAuthStore } from "../../store";

const useCheckAuth = (): void => {
  const router = useRouter();
  const isAuthenticated = useAuthStore(
    useShallow((state) => state.isAuthenticated),
  );

  useEffect(() => {
    if (isAuthenticated) router.replace("/(app)/(tabs)");
  }, [isAuthenticated, router]);
};

export default useCheckAuth;
