import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { useAuthStore } from "../../store";

import { useShallow } from "zustand/react/shallow";
import { postLogin } from "../../services";

const useLoginMutation = () => {
  const router = useRouter();

  const setAuthTokens = useAuthStore(
    useShallow((state) => state.setAuthTokens),
  );

  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      const { token, refreshToken } = data;
      setAuthTokens(token, refreshToken);
      router.replace("/(app)/(tabs)");
    },
  });
};

export default useLoginMutation;
