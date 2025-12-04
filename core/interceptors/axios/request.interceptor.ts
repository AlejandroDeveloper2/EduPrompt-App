import { InternalAxiosRequestConfig } from "axios";

import { eventBus } from "@/core/events/EventBus";

export const axiosRequestInterceptor = async (
  config: InternalAxiosRequestConfig
) => {
  const { token, refreshToken } = eventBus.getLast("auth.tokens.getted") ?? {
    token: null,
    refreshToken: null,
  };

  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (refreshToken) config.headers["x-refresh-token"] = refreshToken;

  return config;
};
