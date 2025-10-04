import { axiosClient } from "@/lib/config/axiosClient";

import { ServerResponse } from "@/lib/types";

export const patchUserEmail = async (newEmail: string): Promise<void> => {
  await axiosClient.patch<ServerResponse<null>>("/users/email", {
    newEmail,
  });
};
