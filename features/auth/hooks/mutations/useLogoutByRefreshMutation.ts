import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { eventBus } from "@/core/events/EventBus";

import { postLogoutByRefresh } from "../../services";

import { useAuthStore } from "../store";

const useLogoutByRefreshMutation = () => {
  const router = useRouter();
  const { clearAuthTokens } = useAuthStore();

  return useMutation({
    mutationFn: postLogoutByRefresh,
    onSuccess: () => {
      eventBus.clearAll();
      clearAuthTokens();
      router.replace("/auth");
    },
  });
};

export default useLogoutByRefreshMutation;
