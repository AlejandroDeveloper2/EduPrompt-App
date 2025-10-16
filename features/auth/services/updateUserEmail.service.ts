import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { EmailUpdatePayload } from "../types";

export const patchUserEmail = async (
  emailUpdatePayload: EmailUpdatePayload
): Promise<void> => {
  await axiosClient.patch<ServerResponse<null>>(
    "/auth/change-email",
    emailUpdatePayload
  );
};
