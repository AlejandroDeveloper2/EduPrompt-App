import { useMutation } from "@tanstack/react-query";

import { ChangePassPayload } from "@/lib/types/data-types";

import { showToast } from "@/lib/context";

import { useCheckNetwork } from "../../core";
import useLogout from "./useLogout";

import { generateToastKey, getSessionToken } from "@/lib/helpers";
import { patchUserPassword } from "@/services/auth";

const useChangeUserPassword = () => {
  const { isConnected } = useCheckNetwork();

  const logout = useLogout();

  return useMutation({
    mutationFn: async (changePassPayload: ChangePassPayload) => {
      const token = await getSessionToken();
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
