import axios, { AxiosError, type AxiosInstance } from "axios";

import { config } from "./enviromentVariables";

import {
  axiosRequestInterceptor,
  axiosResponseInterceptor,
} from "../interceptors";

/** Cliente de axios para integración con la api de edu prompt */
export const axiosClient: AxiosInstance = axios.create({
  baseURL: config.eduPromptApiUrl,
});

/* Interceptor para requests */
axiosClient.interceptors.request.use(axiosRequestInterceptor, (error) => {
  return Promise.reject(error);
});

/* Interceptor para responses (manejo de errores específicos) */
axiosClient.interceptors.response.use(
  async (response) => response,
  async (axiosError) =>
    axiosResponseInterceptor(axiosError as AxiosError, axiosClient)
);
