import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";

import { useUpdateIndicatorsMutation } from "../mutations";
import { useIndicatorsQuery } from "../queries";

const useDashboardEventListeners = () => {
  const { mutate } = useUpdateIndicatorsMutation();

  const { indicators } = useIndicatorsQuery();

  useEffect(() => {
    const handler = (lastGeneratedResource: string | null) => {
      mutate({ lastGeneratedResource });
    };
    eventBus.on("dashboard.setLastGeneratedResource", handler);
    return () => {
      eventBus.off("dashboard.setLastGeneratedResource", handler);
    };
  }, [mutate]);

  useEffect(() => {
    const handler = () => {
      if (!indicators) return;
      mutate({
        generatedResources: indicators.generatedResources + 1,
      });
    };
    eventBus.on("dashboard.addGeneratedResource", handler);
    return () => {
      eventBus.off("dashboard.addGeneratedResource", handler);
    };
  }, [mutate, indicators]);

  useEffect(() => {
    const handler = (amount: number) => {
      if (!indicators) return;
      mutate({
        usedTokens: indicators.usedTokens + amount,
      });
    };
    eventBus.on("dashboard.addUsedTokens", handler);
    return () => {
      eventBus.off("dashboard.addUsedTokens", handler);
    };
  }, [mutate, indicators]);

  useEffect(() => {
    const handler = (downloadedResources: number) => {
      if (!indicators) return;
      mutate({
        dowloadedResources: indicators.dowloadedResources + downloadedResources,
      });
    };
    eventBus.on("dashboard.addDownloadedResources", handler);
    return () => {
      eventBus.off("dashboard.addDownloadedResources", handler);
    };
  }, [mutate, indicators]);

  useEffect(() => {
    const handler = () => {
      if (!indicators) return;
      mutate({
        savedResources: indicators.savedResources + 1,
      });
    };
    eventBus.on("dashboard.addSavedResources", handler);
    return () => {
      eventBus.off("dashboard.addSavedResources", handler);
    };
  }, [mutate, indicators]);
};

export default useDashboardEventListeners;
