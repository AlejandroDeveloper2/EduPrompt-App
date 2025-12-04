import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { eventBus } from "@/core/events/EventBus";

import { postLogout } from "../../services";

import { tokenManager } from "@/shared/utils";

import { useAuthStore } from "../store";

const useLogoutMutation = () => {
  const router = useRouter();
  const { clearAuthTokens } = useAuthStore();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      eventBus.clearAll();
      tokenManager.clearTokens();
      clearAuthTokens();
      router.replace("/auth");
    },
  });
};

export default useLogoutMutation;
