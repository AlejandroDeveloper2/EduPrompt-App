import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { ChangePassPayload } from "../types";

export const patchUserPassword = async (
  changePassPayload: ChangePassPayload
): Promise<void> => {
  await axiosClient.patch<ServerResponse<null>>(
    "/auth/change-password",
    changePassPayload
  );
};
