import { axiosClient } from "@/lib/config/axiosClient";

import { ServerResponse } from "@/lib/types";

export const postResetPassRequest = async (email: string): Promise<void> => {
  await axiosClient.post<ServerResponse<null>>("/auth/reset-password/request", {
    email,
  });
};
