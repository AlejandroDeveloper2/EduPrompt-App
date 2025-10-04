import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UserPreferences } from "@/lib/types/data-types";

import { showToast } from "@/lib/context";

import { useCheckNetwork } from "../../core";
import { useUserOfflineStore } from "../../store";

import { generateToastKey, getSessionToken } from "@/lib/helpers";
import { patchUserPreferences } from "@/services/users";

const useUpdateUserPreferences = () => {
  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();

  const { updateLocalUserPreferences, markAsSynced } = useUserOfflineStore();

  return useMutation({
    mutationFn: async (userPreferences: Partial<UserPreferences>) => {
      const token = await getSessionToken();
      updateLocalUserPreferences(userPreferences, false);

      if (isConnected && token) {
        await patchUserPreferences(userPreferences);
        markAsSynced();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_profile"] });
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "Preferencias de usuario actualizadas con éxito",
      });
    },
  });
};

export default useUpdateUserPreferences;
