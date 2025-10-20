import axios, { AxiosError, type AxiosInstance } from "axios";

import { ServerErrorResponse } from "../types";

import { config } from "./enviromentVariables";

import { addSessionToken, getSessionToken } from "@/shared/helpers";
import { AppError, ErrorCodeType } from "@/shared/utils";

/** Cliente de axios para integración con la api de edu prompt */
export const axiosClient: AxiosInstance = axios.create({
  baseURL: config.eduPromptApiUrl,
  withCredentials: true,
});

/* Interceptor para requests (ej. añadir tokens) */
axiosClient.interceptors.request.use(
  async (config) => {
    // Aquí inyectas el token si existe
    const token = await getSessionToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* Interceptor para responses (manejo de errores específicos)*/
axiosClient.interceptors.response.use(
  async (response) => {
    const accessToken = response.headers["x-access-token"] as string;
    if (accessToken) await addSessionToken(accessToken);
    return response;
  },
  async (error) => {
    const axiosError = error as AxiosError<ServerErrorResponse>;
    let appError;

    if (axiosError.response) {
      const errorMessageCode = axiosError.response.data.name as ErrorCodeType;
      const status = axiosError.response.status;
      const description = axiosError.response.data.description;
      const isOperational = axiosError.response.data.isOperational;

      if (status < 500 && status >= 400) {
        console.log("⚠️ Error del cliente: ", errorMessageCode);
      }

      if (status >= 500) {
        console.log("🚨 Error del servidor: ", axiosError.message);
      }

      appError = new AppError(
        errorMessageCode,
        status,
        description,
        isOperational
      );
    }

    return Promise.reject(appError);
  }
);
