import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { eventBus } from "@/core/events/EventBus";

import { postLogout } from "../../services";

import { useAuthStore } from "../store";

const useLogoutMutation = () => {
  const router = useRouter();
  const { clearAuthTokens } = useAuthStore();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: async () => {
      await clearAuthTokens();
      eventBus.clearAll();
      router.replace("/auth");
    },
  });
};

export default useLogoutMutation;
