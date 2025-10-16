import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";

export const postNewEmailVerificationCode = async (
  email: string
): Promise<void> => {
  await axiosClient.post<ServerResponse<null>>("/auth/resend-email-code", {
    email,
  });
};
