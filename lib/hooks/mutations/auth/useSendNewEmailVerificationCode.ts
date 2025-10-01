import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { showToast } from "@/lib/context";
import { generateToastKey } from "@/lib/helpers";

import { postNewEmailVerificationCode } from "@/services/auth";

const useSendNewEmailVerification = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (code: string) => {
      await postNewEmailVerificationCode(code);
    },
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

export default useSendNewEmailVerification;
