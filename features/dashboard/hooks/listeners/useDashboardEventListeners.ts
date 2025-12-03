import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";

import { Indicator } from "../../types";

import { useUpdateIndicators } from "../core";

const useDashboardEventListeners = () => {
  const queryClient = useQueryClient();
  const { updateIndicators } = useUpdateIndicators();

  const indicators = queryClient.getQueryData<Indicator>(["app_indicators"]);

  useEffect(() => {
    const handler = (lastGeneratedResource: string | null) => {
      updateIndicators({ lastGeneratedResource });
    };
    eventBus.on("dashboard.setLastGeneratedResource", handler);
    return () => {
      eventBus.off("dashboard.setLastGeneratedResource", handler);
    };
  }, [updateIndicators]);

  useEffect(() => {
    const handler = () => {
      if (!indicators) return;
      updateIndicators({
        generatedResources: indicators.generatedResources + 1,
      });
    };
    eventBus.on("dashboard.addGeneratedResource", handler);
    return () => {
      eventBus.off("dashboard.addGeneratedResource", handler);
    };
  }, [updateIndicators, indicators]);

  useEffect(() => {
    const handler = (amount: number) => {
      if (!indicators) return;
      updateIndicators({
        usedTokens: indicators.usedTokens + amount,
      });
    };
    eventBus.on("dashboard.addUsedTokens", handler);
    return () => {
      eventBus.off("dashboard.addUsedTokens", handler);
    };
  }, [updateIndicators, indicators]);

  useEffect(() => {
    const handler = () => {
      if (!indicators) return;
      updateIndicators({
        dowloadedResources: indicators.dowloadedResources + 1,
      });
    };
    eventBus.on("dashboard.addDownloadedResources", handler);
    return () => {
      eventBus.off("dashboard.addDownloadedResources", handler);
    };
  }, [updateIndicators, indicators]);

  useEffect(() => {
    const handler = () => {
      if (!indicators) return;
      updateIndicators({
        savedResources: indicators.savedResources + 1,
      });
    };
    eventBus.on("dashboard.addSavedResources", handler);
    return () => {
      eventBus.off("dashboard.addSavedResources", handler);
    };
  }, [updateIndicators, indicators]);
};

export default useDashboardEventListeners;
