import { axiosClient } from "@/lib/config/axiosClient";

import { ServerResponse } from "@/lib/types";
import { LoginCredentials, LoginResponse } from "@/lib/types/data-types";

export const postLogin = async (
  userCredentials: LoginCredentials
): Promise<LoginResponse> => {
  const { data } = await axiosClient.post<ServerResponse<LoginResponse>>(
    "/auth/login",
    userCredentials
  );
  return data.data;
};
