import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { BaseFilters, CreatePromptPayload } from "../../types";

import { eventBus } from "@/core/events/EventBus";

import { useCreatePrompt } from "../core";
import { usePromptsQuery } from "../queries";

const usePromptEventListeners = () => {
  const queryClient = useQueryClient();

  const [baseFilters, setBaseFilters] = useState<BaseFilters | null>(null);

  const query = usePromptsQuery(baseFilters, { limit: 10 });
  const { addPrompt } = useCreatePrompt();

  useEffect(() => {
    const fetchPrompts = (filters: BaseFilters) => {
      queryClient.invalidateQueries({
        queryKey: ["prompts"],
        exact: true,
      });
      setBaseFilters(filters);
    };

    eventBus.on("prompts.fetch", fetchPrompts);
    return () => eventBus.off("prompts.fetch", fetchPrompts);
  }, [queryClient]);

  useEffect(() => {
    const unsubscribe = eventBus.on(
      "prompts.fetchNextPage.requested",
      query.fetchNextPage
    );
    return unsubscribe;
  }, [query.fetchNextPage]);

  useEffect(() => {
    const unsubscribe = eventBus.on("prompts.refetch.requested", query.refetch);
    return unsubscribe;
  }, [query.refetch]);

  useEffect(() => {
    const handleAddPromptRequest = async (
      payload: Omit<CreatePromptPayload, "promptId">
    ) => {
      await addPrompt(payload);
    };

    eventBus.on("prompts.savePrompt.requested", handleAddPromptRequest);
    return () => {
      eventBus.off("prompts.savePrompt.requested", handleAddPromptRequest);
    };
  }, [addPrompt]);
};

export default usePromptEventListeners;
