import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { useAuthStore } from "../store";

import { tokenManager } from "@/shared/utils";
import { postLogin } from "../../services";

const useLoginMutation = () => {
  const router = useRouter();

  const { setAuthTokens } = useAuthStore();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      const { token, refreshToken } = data;
      tokenManager.setTokens(token, refreshToken);
      setAuthTokens(token, refreshToken);
      router.replace("/(tabs)");
    },
  });
};

export default useLoginMutation;
