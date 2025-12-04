import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { eventBus } from "@/core/events/EventBus";

import { postLogoutByRefresh } from "../../services";

import { useAuthStore } from "../store";

import { tokenManager } from "@/shared/utils";

const useLogoutByRefreshMutation = () => {
  const router = useRouter();
  const { clearAuthTokens } = useAuthStore();

  return useMutation({
    mutationFn: postLogoutByRefresh,
    onSuccess: () => {
      eventBus.clearAll();
      tokenManager.clearTokens();
      clearAuthTokens();

      router.replace("/auth");
    },
  });
};

export default useLogoutByRefreshMutation;
