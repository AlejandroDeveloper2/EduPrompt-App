import { useRouter } from "expo-router";
import { useEffect } from "react";

import { getSessionToken } from "@/lib/helpers";

const useCheckAuth = (): void => {
  const router = useRouter();
  useEffect(() => {
    const checkUserSession = async () => {
      const token = await getSessionToken();
      if (!token) return;
      router.replace("/(tabs)");
    };
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useCheckAuth;
