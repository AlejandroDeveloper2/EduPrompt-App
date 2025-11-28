import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";

import { Indicator } from "../../types";

import { useUpdateIndicators } from "../mutations";

const useDashboardEventListeners = () => {
  const queryClient = useQueryClient();
  const updateIndicatorMutation = useUpdateIndicators();

  const indicators = queryClient.getQueryData<Indicator>(["app_indicators"]);

  useEffect(() => {
    const handler = (lastGeneratedResource: string | null) => {
      updateIndicatorMutation.mutate({ lastGeneratedResource });
    };
    eventBus.on("dashboard.setLastGeneratedResource", handler);
    return () => {
      eventBus.off("dashboard.setLastGeneratedResource", handler);
    };
  }, [updateIndicatorMutation]);

  useEffect(() => {
    const handler = () => {
      if (!indicators) return;
      updateIndicatorMutation.mutate({
        generatedResources: indicators.generatedResources + 1,
      });
    };
    eventBus.on("dashboard.addGeneratedResource", handler);
    return () => {
      eventBus.off("dashboard.addGeneratedResource", handler);
    };
  }, [updateIndicatorMutation, indicators]);

  useEffect(() => {
    const handler = (amount: number) => {
      if (!indicators) return;
      updateIndicatorMutation.mutate({
        usedTokens: indicators.usedTokens + amount,
      });
    };
    eventBus.on("dashboard.addUsedTokens", handler);
    return () => {
      eventBus.off("dashboard.addUsedTokens", handler);
    };
  }, [updateIndicatorMutation, indicators]);

  useEffect(() => {
    const handler = () => {
      if (!indicators) return;
      updateIndicatorMutation.mutate({
        dowloadedResources: indicators.dowloadedResources + 1,
      });
    };
    eventBus.on("dashboard.addDownloadedResources", handler);
    return () => {
      eventBus.off("dashboard.addDownloadedResources", handler);
    };
  }, [updateIndicatorMutation, indicators]);

  useEffect(() => {
    const handler = () => {
      if (!indicators) return;
      updateIndicatorMutation.mutate({
        savedResources: indicators.savedResources + 1,
      });
    };
    eventBus.on("dashboard.addSavedResources", handler);
    return () => {
      eventBus.off("dashboard.addSavedResources", handler);
    };
  }, [updateIndicatorMutation, indicators]);
};

export default useDashboardEventListeners;
