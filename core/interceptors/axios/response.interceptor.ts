import { AxiosError, AxiosInstance } from "axios";

import { eventBus } from "@/core/events/EventBus";
import { ServerErrorResponse } from "@/core/types";

import { AppError, ErrorCodeType } from "@/shared/utils";

let isRefreshing = false;
let requestsQueue: ((tokens: {
  accessToken: string;
  refreshToken: string;
}) => void)[] = [];

export const axiosResponseInterceptor = async (
  error: AxiosError,
  axiosClient: AxiosInstance
) => {
  const axiosError = error as AxiosError<ServerErrorResponse>;

  if (!axiosError.response) {
    return Promise.reject(error);
  }

  const status = axiosError.response.status;
  const body = axiosError.response.data;
  const errorMessageCode = body.name as ErrorCodeType;
  const description = body.description;
  const isOperational = body.isOperational;
  const originalRequest = axiosError.config;

  /* Prevención de loops inifinitos */
  if ((originalRequest as any)?._retry) {
    console.log("⚠️ Evitando loop de refresh infinito");
    return Promise.reject(error);
  }

  /* Validamos el caso de token expirado */
  if (errorMessageCode === "EXPIRED_TOKEN") {
    (originalRequest as any)._retry = true;

    /** Si ya hay un refresco en progreso, esperar */
    if (isRefreshing) {
      return new Promise((resolve) => {
        requestsQueue.push(({ accessToken, refreshToken }) => {
          const retryRequest = {
            ...originalRequest!,
            headers: { ...originalRequest!.headers },
          };

          retryRequest.headers.Authorization = `Bearer ${accessToken}`;
          retryRequest.headers["x-refresh-token"] = refreshToken;

          resolve(axiosClient(retryRequest));
        });
      });
    }

    /** Iniciar refresh */
    isRefreshing = true;
    eventBus.emit("auth.refreshSession.requested", undefined);

    try {
      const newTokens = await new Promise<{
        accessToken: string;
        refreshToken: string;
      }>((resolve) => {
        eventBus.once("auth.refreshSession.completed", resolve);
      });

      isRefreshing = false;

      /** Liberar cola */
      requestsQueue.forEach((cb) => cb(newTokens));
      requestsQueue = [];

      /** Reintento de la request original */
      const retryRequest = {
        ...originalRequest!,
        headers: { ...originalRequest!.headers },
      };

      retryRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
      retryRequest.headers["x-refresh-token"] = newTokens.refreshToken;
      return axiosClient(retryRequest);
    } catch (refreshError) {
      isRefreshing = false;
      requestsQueue = [];
      eventBus.emit("auth.clearTokens", undefined);
      return Promise.reject(refreshError);
    }
  }

  /** 401 normal limpiamos tokens de sesión y redirigimos */
  if (status === 401) {
    eventBus.emit("auth.clearTokens", undefined);
  }

  /** Manejo de errores */
  const appError = new AppError(
    errorMessageCode,
    status,
    description,
    isOperational
  );

  if (status >= 500) console.log("🚨 Error de servidor:", appError);
  if (status >= 400 && status < 500)
    console.log("⚠️ Error del cliente:", appError);

  return Promise.reject(appError);
};
