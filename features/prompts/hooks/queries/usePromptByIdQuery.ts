import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Prompt } from "../../types";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useOfflinePromptsStore } from "../store";

import { getPromptById } from "../../services";

const usePromptByIdQuery = (promptId: string) => {
  const [localPrompt, setLocalPrompt] = useState<Prompt | null>(null);

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const { isLoading, findPromptById, updatePromptsSyncStatus } =
    useOfflinePromptsStore();

  const query = useQuery({
    queryKey: ["prompt", promptId],
    enabled:
      isConnected !== null && isConnected !== undefined && isAuthenticated,
    queryFn: async () => {
      const prompt = await getPromptById(promptId);
      await updatePromptsSyncStatus(true, promptId);
      return { ...prompt, sync: true };
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    const loadPromptById = async () => {
      if (!query.data) {
        const localPrompt = await findPromptById(promptId);
        setLocalPrompt(localPrompt);
      }
    };
    loadPromptById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data, promptId]);

  return {
    tag: query.data ?? localPrompt,
    isLoading: isAuthenticated && isConnected ? query.isLoading : isLoading,
  };
};

export default usePromptByIdQuery;
