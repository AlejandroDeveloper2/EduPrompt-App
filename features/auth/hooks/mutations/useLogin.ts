import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { LoginCredentials } from "../../types";

import { useAuthStore } from "../store";

import { postLogin } from "../../services";

const useLogin = () => {
  const router = useRouter();

  const { setAuthTokens } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const loginResponse = await postLogin(credentials);
      return loginResponse;
    },
    onSuccess: (data) => {
      const { token, refreshToken } = data;
      setAuthTokens(token, refreshToken);
      router.replace("/(tabs)");
    },
  });
};

export default useLogin;
