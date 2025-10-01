import { axiosClient } from "@/lib/config/axiosClient";

import { ServerResponse } from "@/lib/types";
import { ResetPassCodeResponse } from "@/lib/types/data-types";

export const postResetPassCode = async (
  code: string
): Promise<ResetPassCodeResponse> => {
  const { data } = await axiosClient.post<
    ServerResponse<ResetPassCodeResponse>
  >("/auth/reset-password/validate", { code });

  return data.data;
};
