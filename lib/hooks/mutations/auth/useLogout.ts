import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { removeSessionToken } from "@/lib/helpers";
import { postLogout } from "@/services/auth";

const useLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      return await postLogout();
    },
    onSuccess: async () => {
      await removeSessionToken();
      router.replace("/auth");
    },
  });
};

export default useLogout;
