import { axiosClient } from "@/lib/config/axiosClient";

import { ServerResponse } from "@/lib/types";

export const postNewEmailVerificationCode = async (
  email: string
): Promise<void> => {
  await axiosClient.post<ServerResponse<null>>("/auth/resend-email-code", {
    email,
  });
};
