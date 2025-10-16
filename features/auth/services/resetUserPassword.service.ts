import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { ResetPassPayload } from "../types";

export const patchUserPasswordReset = async (
  resetPassPayload: ResetPassPayload
): Promise<void> => {
  await axiosClient.patch<ServerResponse<null>>(
    `/auth/reset-password/${resetPassPayload.userId}`,
    { newPassword: resetPassPayload.newPassword }
  );
};
