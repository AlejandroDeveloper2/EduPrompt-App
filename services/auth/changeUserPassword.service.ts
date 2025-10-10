import { axiosClient } from "@/lib/config/axiosClient";

import { ServerResponse } from "@/lib/types";
import { ChangePassPayload } from "@/lib/types/data-types";

export const patchUserPassword = async (
  changePassPayload: ChangePassPayload
): Promise<void> => {
  await axiosClient.patch<ServerResponse<null>>(
    "/auth/change-password",
    changePassPayload
  );
};
