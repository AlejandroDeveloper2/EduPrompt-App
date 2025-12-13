import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Tag } from "../../types";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useOfflineTagsStore } from "../store";

import { getTagById } from "../../services";

const useTagByIdQuery = (tagId: string) => {
  const [localTag, setLocalTag] = useState<Tag | null>(null);
  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const { isLoading, findTagById, updateTagsSyncStatus } =
    useOfflineTagsStore();

  const query = useQuery({
    queryKey: ["tag", tagId],
    enabled:
      isConnected !== null && isConnected !== undefined && isAuthenticated,
    queryFn: async () => {
      const tag = await getTagById(tagId);
      await updateTagsSyncStatus(true, tagId);
      return tag;
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    const loadTagById = async () => {
      if (!query.data) {
        const localTag = await findTagById(tagId);
        setLocalTag(localTag);
      }
    };
    loadTagById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data, tagId]);

  return {
    tag: query.data ?? localTag,
    isLoading: isAuthenticated && isConnected ? query.isLoading : isLoading,
  };
};

export default useTagByIdQuery;
