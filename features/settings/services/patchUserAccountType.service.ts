import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";

export const patchUserAccountType = async (
  isPremiumUser: boolean
): Promise<void> => {
  await axiosClient.patch<ServerResponse<null>>("/users/account-type", {
    isPremiumUser,
  });
};
