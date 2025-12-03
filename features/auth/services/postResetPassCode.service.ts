import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { ResetPassCodeResponse } from "../types";

export const postResetPassCode = async (
  code: string
): Promise<ResetPassCodeResponse> => {
  const { data } = await axiosClient.post<
    ServerResponse<ResetPassCodeResponse>
  >("/auth/reset-password/validate", { code });

  return data.data;
};
