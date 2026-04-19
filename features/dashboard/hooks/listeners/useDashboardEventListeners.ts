import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";

import {
  useSyncIndicatorsMutation,
  useUpdateIndicatorsMutation,
} from "../mutations";
import { useIndicatorsQuery } from "../queries";

const useDashboardEventListeners = () => {
  const updateMutation = useUpdateIndicatorsMutation();
  const syncMutation = useSyncIndicatorsMutation();

  const { indicators } = useIndicatorsQuery();

  useEffect(() => {
    const handler = (lastGeneratedResource: string | null) => {
      updateMutation.mutate({ lastGeneratedResource });
    };
    eventBus.on("dashboard.setLastGeneratedResource", handler);
    return () => {
      eventBus.off("dashboard.setLastGeneratedResource", handler);
    };
  }, [updateMutation]);

  useEffect(() => {
    const handler = () => {
      if (!indicators) return;
      updateMutation.mutate({
        generatedResources: indicators.generatedResources + 1,
      });
    };
    eventBus.on("dashboard.addGeneratedResource", handler);
    return () => {
      eventBus.off("dashboard.addGeneratedResource", handler);
    };
  }, [updateMutation, indicators]);

  useEffect(() => {
    const handler = (amount: number) => {
      if (!indicators) return;
      updateMutation.mutate({
        usedTokens: indicators.usedTokens + amount,
      });
    };
    eventBus.on("dashboard.addUsedTokens", handler);
    return () => {
      eventBus.off("dashboard.addUsedTokens", handler);
    };
  }, [updateMutation, indicators]);

  useEffect(() => {
    const handler = (downloadedResources: number) => {
      if (!indicators) return;
      updateMutation.mutate({
        dowloadedResources: indicators.dowloadedResources + downloadedResources,
      });
    };
    eventBus.on("dashboard.addDownloadedResources", handler);
    return () => {
      eventBus.off("dashboard.addDownloadedResources", handler);
    };
  }, [updateMutation, indicators]);

  useEffect(() => {
    const handler = () => {
      if (!indicators) return;
      updateMutation.mutate({
        savedResources: indicators.savedResources + 1,
      });
    };
    eventBus.on("dashboard.addSavedResources", handler);
    return () => {
      eventBus.off("dashboard.addSavedResources", handler);
    };
  }, [updateMutation, indicators]);

  useEffect(() => {
    const handler = () => {
      syncMutation.syncIndicators();
    };
    eventBus.on("dashboard.syncData.requested", handler);
    return () => {
      eventBus.off("dashboard.syncData.requested", handler);
    };
  }, [syncMutation]);
};

export default useDashboardEventListeners;
