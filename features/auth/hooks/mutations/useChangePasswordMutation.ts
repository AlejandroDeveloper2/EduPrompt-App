import { useMutation } from "@tanstack/react-query";

import { showToast } from "@/shared/context";

import useLogout from "./useLogoutMutation";

import { generateToastKey } from "@/shared/helpers";
import { patchUserPassword } from "../../services";

const useChangePasswordMutation = () => {
  const logout = useLogout();

  return useMutation({
    mutationFn: patchUserPassword,
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

export default useChangePasswordMutation;
