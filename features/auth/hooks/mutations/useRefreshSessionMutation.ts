import { useMutation } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

import { postRefreshSession } from "../../services";

import { useAuthStore } from "../../store";

const useRefreshSessionMutation = () => {
  const setAuthTokens = useAuthStore(
    useShallow((state) => state.setAuthTokens),
  );

  return useMutation({
    mutationFn: postRefreshSession,
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data;
      setAuthTokens(accessToken, refreshToken);
    },
  });
};

export default useRefreshSessionMutation;
