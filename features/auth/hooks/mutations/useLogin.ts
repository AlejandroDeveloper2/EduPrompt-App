import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { LoginCredentials } from "../../types";

import { addSessionToken } from "@/shared/helpers";
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
      router.replace("/(tabs)");
    },
  });
};

export default useLogin;
