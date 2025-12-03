import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";

export const postResetPassRequest = async (email: string): Promise<void> => {
  await axiosClient.post<ServerResponse<null>>("/auth/reset-password/request", {
    email,
  });
};
