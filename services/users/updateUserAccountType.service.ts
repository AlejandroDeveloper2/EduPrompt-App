import { axiosClient } from "@/lib/config/axiosClient";

import { ServerResponse } from "@/lib/types";

export const patchUserAccountType = async (
  isPremiumUser: boolean
): Promise<void> => {
  await axiosClient.patch<ServerResponse<null>>("/users/account-type", {
    isPremiumUser,
  });
};
