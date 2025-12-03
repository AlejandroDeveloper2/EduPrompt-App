import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";

export const patchUsername = async (userName: string): Promise<void> => {
  await axiosClient.patch<ServerResponse<null>>("/users/username", {
    userName,
  });
};
