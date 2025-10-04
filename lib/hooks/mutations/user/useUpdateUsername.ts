import { useMutation, useQueryClient } from "@tanstack/react-query";

import { showToast } from "@/lib/context";

import { useCheckNetwork } from "../../core";
import { useUserOfflineStore } from "../../store";

import { generateToastKey, getSessionToken } from "@/lib/helpers";
import { patchUsername } from "@/services/users";

const useUpdateUsername = () => {
  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();

  const { userStats, setUserStats, markAsSynced } = useUserOfflineStore();

  return useMutation({
    mutationFn: async (userName: string) => {
      const token = await getSessionToken();
      setUserStats({ ...userStats, userName, sync: false });

      if (isConnected && token) {
        await patchUsername(userName);
        markAsSynced();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_profile"] });
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "Nombre de usuario actualizado con éxito",
      });
    },
  });
};

export default useUpdateUsername;
