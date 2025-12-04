import { useMutation } from "@tanstack/react-query";

import { postRefreshSession } from "../../services";

import { useAuthStore } from "../store";

const useRefreshSessionMutation = () => {
  const { setAuthTokens } = useAuthStore();

  return useMutation({
    mutationFn: postRefreshSession,
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data;
      setAuthTokens(accessToken, refreshToken);
    },
  });
};

export default useRefreshSessionMutation;
