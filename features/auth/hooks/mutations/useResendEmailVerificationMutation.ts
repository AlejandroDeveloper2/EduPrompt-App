import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";

import { postNewEmailVerificationCode } from "../../services";

const useResendEmailVerificationMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: postNewEmailVerificationCode,
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message:
          "Se ha enviado un nuevo código de activación a tu correo electrónico",
        toastDuration: 4000,
      });
      router.replace("/auth/account_activation_screen");
    },
  });
};

export default useResendEmailVerificationMutation;
