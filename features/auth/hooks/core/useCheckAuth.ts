import { useRouter } from "expo-router";
import { useEffect } from "react";

import { getSessionToken } from "@/shared/utils";

const useCheckAuth = (): void => {
  const router = useRouter();
  useEffect(() => {
    const checkUserSession = () => {
      const token = getSessionToken();
      if (!token) return;
      router.replace("/(tabs)");
    };
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useCheckAuth;
