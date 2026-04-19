import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { v4 as uuid } from "react-native-uuid/dist/v4";

import { eventBus } from "@/core/events/EventBus";

import { BaseFilters, CreateTagPayload } from "../../types";

import { useCreateTagMutation, useSyncTagMutation } from "../mutations";
import { usePromptTagsQuery, useResourceTagsQuery } from "../queries";

const useTagEventListeners = () => {
  const queryClient = useQueryClient();

  const [baseResourceFilters, setBaseResourceFilters] =
    useState<BaseFilters | null>(null);
  const [basePromptFilters, setPromptBaseFilters] =
    useState<BaseFilters | null>(null);

  const query = useResourceTagsQuery(baseResourceFilters, {
    limit: 10,
  });
  const promptTagsQuery = usePromptTagsQuery(basePromptFilters, {
    limit: 10,
  });

  const createMutation = useCreateTagMutation();
  const syncMutation = useSyncTagMutation();

  useEffect(() => {
    const fetchResourceTags = (name?: string | undefined) => {
      queryClient.invalidateQueries({
        queryKey: ["tags", name, "resource_tag"],
      });
      setBaseResourceFilters({ name, type: "resource_tag" });
    };
    eventBus.on("tags.resourceType.fetch", fetchResourceTags);
    return () => eventBus.off("tags.resourceType.fetch", fetchResourceTags);
  }, [queryClient]);

  useEffect(() => {
    const fetchPromptsTags = (name?: string | undefined) => {
      queryClient.invalidateQueries({
        queryKey: ["tags", name, "prompt_tag"],
      });

      setPromptBaseFilters({ name, type: "prompt_tag" });
    };

    eventBus.on("tags.promptType.fetch", fetchPromptsTags);
    return () => eventBus.off("tags.promptType.fetch", fetchPromptsTags);
  }, [queryClient]);

  useEffect(() => {
    const unsubscribe = eventBus.on(
      "tags.resourceType.fetchNextPage.requested",
      query.fetchNextPage,
    );
    return unsubscribe;
  }, [query.fetchNextPage]);

  useEffect(() => {
    const unsubscribe = eventBus.on(
      "tags.resourceType.refetch.requested",
      query.refetch,
    );
    return unsubscribe;
  }, [query.refetch]);

  useEffect(() => {
    const unsubscribe = eventBus.on(
      "tags.promptType.fetchNextPage.requested",
      promptTagsQuery.fetchNextPage,
    );
    return unsubscribe;
  }, [promptTagsQuery.fetchNextPage]);

  useEffect(() => {
    const unsubscribe = eventBus.on(
      "tags.promptType.refetch.requested",
      promptTagsQuery.refetch,
    );
    return unsubscribe;
  }, [promptTagsQuery.refetch]);

  useEffect(() => {
    const handleAddTagRequest = (payload: Omit<CreateTagPayload, "tagId">) => {
      const tagId: string = uuid();

      eventBus.emit("tags.createTag.started", undefined);

      createMutation.mutate(
        { ...payload, tagId },
        {
          onSuccess: () => {
            eventBus.emit("tags.createTag.completed", undefined);
          },
          onError: (error) => {
            eventBus.emit("tags.createTag.failed", {
              error: String(error),
            });
          },
        },
      );
    };

    eventBus.on("tags.createTag.requested", handleAddTagRequest);
    return () => {
      eventBus.off("tags.createTag.requested", handleAddTagRequest);
    };
  }, [createMutation]);

  useEffect(() => {
    const handler = () => {
      syncMutation.syncTags();
    };
    eventBus.on("tags.syncData.requested", handler);
    return () => {
      eventBus.off("tags.syncData.requested", handler);
    };
  }, [syncMutation]);
};

export default useTagEventListeners;
