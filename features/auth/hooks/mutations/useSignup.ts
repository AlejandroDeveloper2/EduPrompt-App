import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { SignupPayload } from "../../types";

import { postSignup } from "../../services";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";

const useSignup = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (signupPayload: SignupPayload) => {
      await postSignup(signupPayload);
    },
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message:
          "Cuenta creada exitosamente, se ha enviado un código de verificación a su correo electrónico.",
        toastDuration: 4000,
      });
      router.replace("/auth/account_activation_screen");
    },
  });
};
export default useSignup;
