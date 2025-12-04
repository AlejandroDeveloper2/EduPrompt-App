import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { useAuthStore } from "../store";

import { postLogin } from "../../services";

const useLoginMutation = () => {
  const router = useRouter();

  const { setAuthTokens } = useAuthStore();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      const { token, refreshToken } = data;
      setAuthTokens(token, refreshToken);
      router.replace("/(tabs)");
    },
  });
};

export default useLoginMutation;
