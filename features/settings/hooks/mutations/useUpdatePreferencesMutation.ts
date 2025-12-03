import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UserPreferences } from "../../types";

import { patchUserPreferences } from "../../services";

const useUpdatePreferencesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUserPreferences,
    onMutate: async (newPreferences: Partial<UserPreferences>) => {
      await queryClient.cancelQueries({ queryKey: ["user_profile"] });

      // Obtener el estado actual
      const previousUser = queryClient.getQueryData<{
        userPreferences: UserPreferences;
      }>(["user_profile"]);

      // Actualizar cache de manera optimista
      if (previousUser) {
        queryClient.setQueryData(["user_profile"], {
          ...previousUser,
          userPreferences: {
            ...previousUser.userPreferences,
            ...newPreferences,
          },
        });
      }
      // Retornar el contexto para rollback en caso de error
      return { previousUser };
    },
    onError: (error, _newPreferences, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(["user_profile"], context.previousUser);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user_profile"] });
    },
  });
};

export default useUpdatePreferencesMutation;
