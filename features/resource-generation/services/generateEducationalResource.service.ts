import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { AssistantResponse, ResourceFormatKey } from "../types";

export const postGenerateEducationalResource = async (
  userPrompt: string,
  formatKey: ResourceFormatKey
): Promise<AssistantResponse> => {
  const { data } = await axiosClient.post<ServerResponse<AssistantResponse>>(
    `/resourcesGeneration/${formatKey}`,
    {
      userPrompt,
    }
  );
  return data.data;
};
