import { axiosClient } from "@/lib/config/axiosClient";

import { ServerResponse } from "@/lib/types";
import { User } from "@/lib/types/data-types";

export const getUserProfile = async (): Promise<User> => {
  const { data } = await axiosClient.get<ServerResponse<User>>(
    "/users/profile"
  );
  return data.data;
};
