import { useMutation, useQueryClient } from "@tanstack/react-query";

import { showToast } from "@/shared/context";

import { User } from "../../types";

import { useTranslations } from "@/shared/hooks/core";

import { generateToastKey } from "@/shared/helpers";
import { patchUserAccountType } from "../../services";

const useUpdateAccountTypeMutation = () => {
  const queryClient = useQueryClient();

  const { t } = useTranslations();

  return useMutation({
    mutationFn: patchUserAccountType,

    onMutate: async (isPremiumUser: boolean) => {
      await queryClient.cancelQueries({ queryKey: ["user_profile"] });
      // Obtener el estado actual
      const previousUser = queryClient.getQueryData<User>(["user_profile"]);

      // Actualizar cache de manera optimista
      if (previousUser) {
        queryClient.setQueryData(["user_profile"], {
          ...previousUser,
          isPremiumUser,
        });
      }
      // Retornar el contexto para rollback en caso de error
      return { previousUser };
    },
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "settings-translations.module-success-messages.user-account-updated-msg"
        ),
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user_profile"] });
    },
  });
};

export default useUpdateAccountTypeMutation;
