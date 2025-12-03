import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";

import { postEmailVerificationCode } from "../../services";

const useActivateAccountMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: postEmailVerificationCode,
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

export default useActivateAccountMutation;
