import { useRouter } from "expo-router";
import { useEffect } from "react";

import { getSessionToken } from "@/lib/helpers";

const useCheckAuth = (): void => {
  const router = useRouter();
  useEffect(() => {
    const checkUserSession = async () => {
      const token = await getSessionToken();
      if (!token) {
        router.replace("/auth");
        return;
      }
      router.replace("/(tabs)");
    };
    checkUserSession();
  }, [router]);
};

export default useCheckAuth;
