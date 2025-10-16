import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { User } from "../types";

export const getUserProfile = async (): Promise<User> => {
  const { data } = await axiosClient.get<ServerResponse<User>>(
    "/users/profile"
  );
  return data.data;
};
