import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { removeRefreshToken, removeSessionToken } from "@/shared/utils";
import { postLogout } from "../../services";

const useLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      return await postLogout();
    },
    onSuccess: async () => {
      await removeSessionToken();
      await removeRefreshToken();
      router.replace("/auth");
    },
  });
};

export default useLogout;
