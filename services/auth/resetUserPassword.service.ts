import { axiosClient } from "@/lib/config/axiosClient";

import { ServerResponse } from "@/lib/types";
import { ResetPassPayload } from "@/lib/types/data-types";

export const patchUserPasswordReset = async (
  resetPassPayload: ResetPassPayload
): Promise<void> => {
  await axiosClient.patch<ServerResponse<null>>(
    `/auth/reset-password/${resetPassPayload.userId}`,
    { newPassword: resetPassPayload.newPassword }
  );
};
