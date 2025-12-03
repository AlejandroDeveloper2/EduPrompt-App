import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { UserPreferences } from "../types";

export const patchUserPreferences = async (
  updatedUserPreferences: Partial<UserPreferences>
): Promise<void> => {
  await axiosClient.patch<ServerResponse<null>>("/users/preferences", {
    ...updatedUserPreferences,
  });
};
