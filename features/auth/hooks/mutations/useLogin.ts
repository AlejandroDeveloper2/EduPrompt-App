import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { LoginCredentials } from "../../types";

import { addRefreshToken, addSessionToken } from "@/shared/utils";
import { postLogin } from "../../services";

const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const loginResponse = await postLogin(credentials);
      return loginResponse;
    },
    onSuccess: async (data) => {
      await addSessionToken(data.token);
      await addRefreshToken(data.refreshToken);
      router.replace("/(tabs)");
    },
  });
};

export default useLogin;
