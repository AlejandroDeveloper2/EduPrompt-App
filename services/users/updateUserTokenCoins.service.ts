import { axiosClient } from "@/lib/config/axiosClient";

import { ServerResponse } from "@/lib/types";

export const patchUserTokenCoins = async (amount: number): Promise<void> => {
  await axiosClient.patch<ServerResponse<null>>("/users/token-coins", {
    tokenCoins: amount,
  });
};
