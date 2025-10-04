import { axiosClient } from "@/lib/config/axiosClient";

import { ServerResponse } from "@/lib/types";

export const patchUsername = async (userName: string): Promise<void> => {
  await axiosClient.patch<ServerResponse<null>>("/users/username", {
    userName,
  });
};
