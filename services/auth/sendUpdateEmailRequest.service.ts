import { axiosClient } from "@/lib/config/axiosClient";

import { ServerResponse } from "@/lib/types";

export const postEmailChangeRequest = async (
  updatedEmail: string
): Promise<{ updatedEmail: string }> => {
  const { data } = await axiosClient.post<
    ServerResponse<{ updatedEmail: string }>
  >("/auth/change-email/request", { updatedEmail });

  return data.data;
};
