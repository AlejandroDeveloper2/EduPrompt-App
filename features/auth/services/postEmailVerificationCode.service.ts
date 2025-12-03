import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";

export const postEmailVerificationCode = async (
  code: string
): Promise<void> => {
  await axiosClient.post<ServerResponse<null>>("/auth/verify-email", { code });
};
