import { useMutation } from "@tanstack/react-query";

import { showToast } from "@/shared/context";

import { useTranslations } from "@/shared/hooks/core";
import useLogout from "./useLogoutMutation";

import { generateToastKey } from "@/shared/helpers";
import { patchUserPassword } from "../../services";

const useChangePasswordMutation = () => {
  const logout = useLogout();

  const { t } = useTranslations();

  return useMutation({
    mutationFn: patchUserPassword,
    onSuccess: () => {
      logout.mutate();
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "auth_translations.module_success_messages.password_changed_msg"
        ),
      });
    },
  });
};

export default useChangePasswordMutation;
