import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";

export const postEmailChangeRequest = async (
  updatedEmail: string
): Promise<{ updatedEmail: string }> => {
  const { data } = await axiosClient.post<
    ServerResponse<{ updatedEmail: string }>
  >("/auth/change-email/request", { updatedEmail });

  return data.data;
};
