import { useMutation, useQueryClient } from "@tanstack/react-query";

import { showToast } from "@/lib/context";

import { useCheckNetwork } from "../../core";
import { useUserOfflineStore } from "../../store";

import { generateToastKey, getSessionToken } from "@/lib/helpers";
import { patchUserEmail } from "@/services/users";

const useUpdateEmail = () => {
  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();

  const { userStats, setUserStats, markAsSynced } = useUserOfflineStore();

  return useMutation({
    mutationFn: async (newEmail: string) => {
      const token = await getSessionToken();
      setUserStats({ ...userStats, email: newEmail, sync: false });

      if (isConnected && token) {
        await patchUserEmail(newEmail);
        markAsSynced();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_profile"] });
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "Correo electrónico actualizado con éxito",
      });
    },
  });
};

export default useUpdateEmail;
