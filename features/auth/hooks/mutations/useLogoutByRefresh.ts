import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { postLogoutByRefresh } from "../../services";

import { useAuthStore } from "../store";

const useLogoutByRefresh = () => {
  const router = useRouter();
  const { clearAuthTokens } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      return await postLogoutByRefresh();
    },
    onSuccess: () => {
      clearAuthTokens();
      router.replace("/auth");
    },
  });
};

export default useLogoutByRefresh;
