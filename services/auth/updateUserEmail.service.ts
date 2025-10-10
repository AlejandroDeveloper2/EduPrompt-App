import { axiosClient } from "@/lib/config/axiosClient";

import { ServerResponse } from "@/lib/types";
import { EmailUpdatePayload } from "@/lib/types/data-types";

export const patchUserEmail = async (
  emailUpdatePayload: EmailUpdatePayload
): Promise<void> => {
  await axiosClient.patch<ServerResponse<null>>(
    "/auth/change-email",
    emailUpdatePayload
  );
};
