import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { v4 as uuid } from "react-native-uuid/dist/v4";

import { BaseFilters, CreatePromptPayload } from "../../types";

import { eventBus } from "@/core/events/EventBus";

import useCreatePromptMutation from "../mutations/useCreatePromptMutation";
import useSyncPromptsMutation from "../mutations/useSyncPromptsMutation";
import { usePromptsQuery } from "../queries";

const usePromptEventListeners = () => {
  const queryClient = useQueryClient();

  const [baseFilters, setBaseFilters] = useState<BaseFilters | null>(null);

  const query = usePromptsQuery(baseFilters, { limit: 10 });

  const createMutation = useCreatePromptMutation();
  const syncMutation = useSyncPromptsMutation();

  useEffect(() => {
    const fetchPrompts = (filters: BaseFilters) => {
      queryClient.invalidateQueries({
        queryKey: ["prompts", filters?.tag ?? null, filters?.title ?? null],
        // exact: filters.tag ? true : false,
      });
      setBaseFilters(filters);
    };

    eventBus.on("prompts.fetch", fetchPrompts);
    return () => eventBus.off("prompts.fetch", fetchPrompts);
  }, [queryClient]);

  useEffect(() => {
    const unsubscribe = eventBus.on(
      "prompts.fetchNextPage.requested",
      query.fetchNextPage,
    );
    return unsubscribe;
  }, [query.fetchNextPage]);

  useEffect(() => {
    const unsubscribe = eventBus.on("prompts.refetch.requested", query.refetch);
    return unsubscribe;
  }, [query.refetch]);

  useEffect(() => {
    const handleAddPromptRequest = (
      payload: Omit<CreatePromptPayload, "promptId">,
    ) => {
      const promptId: string = uuid();

      eventBus.emit("prompts.savePrompt.started", undefined);

      createMutation.mutate(
        { ...payload, promptId },
        {
          onSuccess: () => {
            eventBus.emit("prompts.savePrompt.completed", undefined);
          },
          onError: (error) => {
            eventBus.emit("prompts.savePrompt.failed", {
              error: String(error),
            });
          },
        },
      );
    };

    eventBus.on("prompts.savePrompt.requested", handleAddPromptRequest);
    return () => {
      eventBus.off("prompts.savePrompt.requested", handleAddPromptRequest);
    };
  }, [createMutation]);

  useEffect(() => {
    const handler = () => {
      syncMutation.syncPrompts();
    };
    eventBus.on("prompts.syncData.requested", handler);
    return () => {
      eventBus.off("prompts.syncData.requested", handler);
    };
  }, [syncMutation]);
};

export default usePromptEventListeners;
