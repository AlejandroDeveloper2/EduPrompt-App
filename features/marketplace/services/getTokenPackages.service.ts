import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { TokenPackage } from "../types";

export const getTokenPackages = async (): Promise<TokenPackage[]> => {
  const { data } = await axiosClient.get<ServerResponse<TokenPackage[]>>(
    "/subscriptions/packages",
  );
  return data.data;
};
