import { axiosClient } from "@/lib/config/axiosClient";

import { ServerResponse } from "@/lib/types";
import { UserStats } from "@/lib/types/data-types";

export const putUserStats = async (
  updatedUserStats: Omit<UserStats, "sync" | "userName" | "email">
): Promise<void> => {
  await axiosClient.put<ServerResponse<null>>(
    "/users/sync/stats",
    updatedUserStats
  );
};
