import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";

import { postResetPassRequest } from "../../services";

const useSendResetPassRequest = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (email: string) => {
      await postResetPassRequest(email);
    },
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message:
          "Se ha enviado un correo electrónico con las instrucciones, revisa tu bandeja de entrada",
        toastDuration: 4000,
      });
      router.navigate("/auth/verify_reset_pass_code_screen");
    },
  });
};

export default useSendResetPassRequest;
