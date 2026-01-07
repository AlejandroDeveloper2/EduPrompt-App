import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { eventBus } from "@/core/events/EventBus";

import { BaseFilters, CreateTagPayload } from "../../types";

import { useCreateTag } from "../core";
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

  const { addTag } = useCreateTag();

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
      query.fetchNextPage
    );
    return unsubscribe;
  }, [query.fetchNextPage]);

  useEffect(() => {
    const unsubscribe = eventBus.on(
      "tags.resourceType.refetch.requested",
      query.refetch
    );
    return unsubscribe;
  }, [query.refetch]);

  useEffect(() => {
    const unsubscribe = eventBus.on(
      "tags.promptType.fetchNextPage.requested",
      promptTagsQuery.fetchNextPage
    );
    return unsubscribe;
  }, [promptTagsQuery.fetchNextPage]);

  useEffect(() => {
    const unsubscribe = eventBus.on(
      "tags.promptType.refetch.requested",
      promptTagsQuery.refetch
    );
    return unsubscribe;
  }, [promptTagsQuery.refetch]);

  useEffect(() => {
    const handleAddTagRequest = async (
      payload: Omit<CreateTagPayload, "tagId">
    ) => {
      await addTag(payload);
    };

    eventBus.on("tags.createTag.requested", handleAddTagRequest);
    return () => {
      eventBus.off("tags.createTag.requested", handleAddTagRequest);
    };
  }, [addTag]);
};

export default useTagEventListeners;
