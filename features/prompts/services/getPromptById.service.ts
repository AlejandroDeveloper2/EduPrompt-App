import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { Prompt } from "../types";

export const getPromptById = async (promptId: string): Promise<Prompt> => {
  const { data } = await axiosClient.get<ServerResponse<Prompt>>(
    `/prompts/${promptId}`
  );
  return data.data;
};
