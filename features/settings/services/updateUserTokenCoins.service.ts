import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";

export const patchUserTokenCoins = async (amount: number): Promise<void> => {
  await axiosClient.patch<ServerResponse<null>>("/users/token-coins", {
    tokenCoins: amount,
  });
};
