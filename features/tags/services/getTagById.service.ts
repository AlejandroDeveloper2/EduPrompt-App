import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { Tag } from "../types";

export const getTagById = async (tagId: string): Promise<Tag> => {
  const { data } = await axiosClient.get<ServerResponse<Tag>>(`/tags/${tagId}`);
  return data.data;
};
