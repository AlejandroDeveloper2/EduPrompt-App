import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { InfiniteQueryOptions, PaginatedResponse } from "@/core/types";
import { BaseFilters, Prompt, PromptFilters } from "../../types";

import { eventBus } from "@/core/events/EventBus";

import { useSyncDataStore } from "@/core/store";
import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useOfflinePromptsStore } from "../../store";

import { getPromptsByUser } from "../../services";

const usePromptsQuery = (
  baseFilters: BaseFilters | null,
  options: InfiniteQueryOptions,
) => {
  const limit = options?.limit ?? 10;

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const { findPrompts, updatePromptsSyncStatus, createPrompt } =
    useOfflinePromptsStore(
      useShallow((state) => ({
        findPrompts: state.findPrompts,
        updatePromptsSyncStatus: state.updatePromptsSyncStatus,
        createPrompt: state.createPrompt,
      })),
    );

  const updateModuleSyncMapState = useSyncDataStore(
    (state) => state.updateModuleSyncMapState,
  );

  const queryKey = useMemo(
    () => [
      "prompts",
      baseFilters?.tag ?? null,
      baseFilters?.title ?? null,
      limit,
    ],
    [baseFilters?.tag, baseFilters?.title, limit],
  );

  const query = useInfiniteQuery<PaginatedResponse<Prompt>>({
    queryKey,
    initialPageParam: "1",
    queryFn: async ({ pageParam = "1" }) => {
      const filters: PromptFilters = {
        ...baseFilters!,
        page: String(pageParam),
        limit: String(limit),
      };

      const localPrompts = await findPrompts(filters);

      if (isConnected && isAuthenticated) {
        const paginatedPrompts = await getPromptsByUser(filters);

        /** Sincronizamos los prompts online si no estan en el almacenamiento local */
        await Promise.all(
          paginatedPrompts.records.map(async (prompt) => {
            const localPrompt = localPrompts.records.find(
              (p) => p.promptId === prompt.promptId,
            );
            if (!localPrompt) {
              const addedPrompt = await createPrompt({
                tag: prompt.tag,
                promptId: prompt.promptId,
                promptTitle: prompt.promptTitle,
                promptText: prompt.promptText,
              });
              await updatePromptsSyncStatus(true, addedPrompt.promptId);
              return addedPrompt;
            }
          }),
        );

        const isAllSynced = localPrompts.records.every((r) => r.sync);

        updateModuleSyncMapState("prompts", { isDataSynced: isAllSynced });

        return {
          ...paginatedPrompts,
          records: paginatedPrompts.records
            .map((r) => ({ ...r, sync: true }))
            .concat(localPrompts.records.filter((p) => !p.sync)),
        };
      }
      return localPrompts;
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.page < lastPage.totalPages
        ? String(lastPage.page + 1)
        : undefined;
    },
    enabled:
      (options?.enabled ?? true) &&
      isConnected !== null &&
      isConnected !== undefined &&
      baseFilters !== null,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (query.data) {
      const prompts = query.data.pages.flatMap((page) => page.records);
      eventBus.emit("prompts.list.pagination.updated", {
        prompts,
        hasNextPage: query.hasNextPage,
        isFetchingNextPage: query.isFetchingNextPage,
        refreshing: query.isRefetching,
      });
    }
  }, [
    query.data,
    query.hasNextPage,
    query.isFetchingNextPage,
    query.isRefetching,
  ]);

  return query;
};

export default usePromptsQuery;
