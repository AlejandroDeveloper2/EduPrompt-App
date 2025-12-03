import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";

export const postLogout = async (): Promise<void> => {
  await axiosClient.post<ServerResponse<null>>("/auth/logout", {});
};
