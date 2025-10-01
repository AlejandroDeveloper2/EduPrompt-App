import { axiosClient } from "@/lib/config/axiosClient";

import { ServerResponse } from "@/lib/types";

export const postEmailVerificationCode = async (
  code: string
): Promise<void> => {
  await axiosClient.post<ServerResponse<null>>("/auth/verify-email", { code });
};
