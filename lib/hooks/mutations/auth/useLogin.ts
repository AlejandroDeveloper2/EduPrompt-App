import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { LoginCredentials } from "@/lib/types/data-types";

import { addSessionToken } from "@/lib/helpers";
import { postLogin } from "@/services/auth";

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
      console.log("Login exitoso:", data);
    },
  });
};

export default useLogin;
