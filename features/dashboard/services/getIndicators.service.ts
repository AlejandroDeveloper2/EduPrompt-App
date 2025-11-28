import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { Indicator } from "../types";

export const getIndicators = async (): Promise<Indicator> => {
  const { data } = await axiosClient.get<ServerResponse<Indicator>>(
    "/indicators"
  );
  return data.data;
};
