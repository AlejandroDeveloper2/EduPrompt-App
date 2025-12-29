import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { eventBus } from "@/core/events/EventBus";

import { BaseFilters, CreateTagPayload } from "../../types";

import { useCreateTag } from "../core";
import { useTagsQuery } from "../queries";

const useTagEventListeners = () => {
  const queryClient = useQueryClient();

  const [baseFilters, setBaseFilters] = useState<BaseFilters | null>(null);

  const query = useTagsQuery(baseFilters, { limit: 10 });
  const { addTag } = useCreateTag();

  useEffect(() => {
    const fetchTags = (filters: BaseFilters) => {
      queryClient.invalidateQueries({
        queryKey: ["tags"],
        exact: false,
      });
      setBaseFilters(filters);
    };

    eventBus.on("tags.fetch", fetchTags);
    return () => eventBus.off("tags.fetch", fetchTags);
  }, [queryClient]);

  useEffect(() => {
    const unsubscribe = eventBus.on(
      "tags.fetchNextPage.requested",
      query.fetchNextPage
    );
    return unsubscribe;
  }, [query.fetchNextPage]);

  useEffect(() => {
    const unsubscribe = eventBus.on("tags.refetch.requested", query.refetch);
    return unsubscribe;
  }, [query.refetch]);

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
