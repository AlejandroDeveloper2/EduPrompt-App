import { useMutation } from "@tanstack/react-query";

import { ChangePassPayload } from "../../types";

import { showToast } from "@/shared/context";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useAuthStore } from "../store";
import useLogout from "./useLogout";

import { generateToastKey } from "@/shared/helpers";
import { patchUserPassword } from "../../services";

const useChangeUserPassword = () => {
  const { isConnected } = useCheckNetwork();

  const { token } = useAuthStore();

  const logout = useLogout();

  return useMutation({
    mutationFn: async (changePassPayload: ChangePassPayload) => {
      if (isConnected && token) {
        await patchUserPassword(changePassPayload);
      }
    },
    onSuccess: () => {
      logout.mutate();
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message:
          "Tu contraseña se ha cambiado con éxito. Inicia sesión de nuevo",
      });
    },
  });
};

export default useChangeUserPassword;
