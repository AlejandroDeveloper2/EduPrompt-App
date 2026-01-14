import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UserStats } from "../../types";

import { useTranslations } from "@/shared/hooks/core";

import { showToast } from "@/shared/context";

import { generateToastKey } from "@/shared/helpers";

import { patchUsername } from "../../services";

const useUpdateUsernameMutation = () => {
  const queryClient = useQueryClient();

  const { t } = useTranslations();

  return useMutation({
    mutationFn: patchUsername,

    onMutate: async (newUsername: string) => {
      await queryClient.cancelQueries({ queryKey: ["user_profile"] });

      // Obtener el estado actual
      const previousUserStats = queryClient.getQueryData<UserStats>([
        "user_profile",
      ]);

      // Actualizar cache de manera optimista
      if (previousUserStats) {
        queryClient.setQueryData(["user_profile"], {
          ...previousUserStats,
          userName: newUsername,
        });
      }

      // Retornar el contexto para rollback en caso de error
      return { previousUserStats };
    },
    onError: (error, _newUserStats, context) => {
      if (context?.previousUserStats) {
        queryClient.setQueryData(["user_profile"], context.previousUserStats);
      }
    },
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "settings-translations.module-success-messages.username-updated-msg"
        ),
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user_profile"] });
    },
  });
};

export default useUpdateUsernameMutation;
