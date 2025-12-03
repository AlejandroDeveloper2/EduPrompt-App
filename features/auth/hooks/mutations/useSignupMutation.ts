import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { postSignup } from "../../services";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";

const useSignupMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: postSignup,
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
export default useSignupMutation;
