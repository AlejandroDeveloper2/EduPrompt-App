import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { LoginCredentials, LoginResponse } from "../types";

export const postLogin = async (
  userCredentials: LoginCredentials
): Promise<LoginResponse> => {
  const { data } = await axiosClient.post<ServerResponse<LoginResponse>>(
    "/auth/login",
    userCredentials
  );
  return data.data;
};
