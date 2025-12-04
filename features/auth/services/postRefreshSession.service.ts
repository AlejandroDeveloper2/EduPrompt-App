import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";

export const postRefreshSession = async (): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const { data } = await axiosClient.post<
    ServerResponse<{ accessToken: string; refreshToken: string }>
  >("/auth/refresh", {});
  return data.data;
};
