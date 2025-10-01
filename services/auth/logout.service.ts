import { axiosClient } from "@/lib/config/axiosClient";

import { ServerResponse } from "@/lib/types";

export const postLogout = async (): Promise<void> => {
  await axiosClient.post<ServerResponse<null>>("/auth/logout", {});
};
