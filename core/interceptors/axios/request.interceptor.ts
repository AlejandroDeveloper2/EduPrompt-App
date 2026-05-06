import { InternalAxiosRequestConfig } from "axios";

import { useAuthStore } from "@/features/auth/store";

export const axiosRequestInterceptor = async (
  config: InternalAxiosRequestConfig
) => {
  const { token, refreshToken } = useAuthStore.getState();

  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (refreshToken) config.headers["x-refresh-token"] = refreshToken;

  return config;
};
