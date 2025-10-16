import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";

import { postEmailVerificationCode } from "../../services";

const useActivateAccount = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (code: string) => {
      await postEmailVerificationCode(code);
    },
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "Cuenta activada exitosamente, ya puedes iniciar sesión",
        toastDuration: 4000,
      });
      router.replace("/auth");
    },
  });
};

export default useActivateAccount;
