import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";

import { useIndicatorPanelStore } from "../store";

const useDashboardEventListeners = () => {
  const { updateLastGeneratedResource, addGeneratedResource, addUsedToken } =
    useIndicatorPanelStore();

  useEffect(() => {
    const handleUpdateLastGeneratedRequest = (lastResourceName: string) => {
      updateLastGeneratedResource(lastResourceName);
    };

    eventBus.on(
      "dashboard.setLastGeneratedResource",
      handleUpdateLastGeneratedRequest
    );
    return () => {
      eventBus.off(
        "dashboard.setLastGeneratedResource",
        handleUpdateLastGeneratedRequest
      );
    };
  }, [updateLastGeneratedResource]);

  useEffect(() => {
    const handleAddGeneratedResourceRequest = () => {
      addGeneratedResource();
    };
    eventBus.on(
      "dashboard.addGeneratedResource",
      handleAddGeneratedResourceRequest
    );
    return () => {
      eventBus.off(
        "dashboard.addGeneratedResource",
        handleAddGeneratedResourceRequest
      );
    };
  }, [addGeneratedResource]);

  useEffect(() => {
    const handleAddUsedTokenRequest = (amount: number) => {
      addUsedToken(amount);
    };
    eventBus.on("dashboard.addUsedTokens", handleAddUsedTokenRequest);
    return () => {
      eventBus.off("dashboard.addUsedTokens", handleAddUsedTokenRequest);
    };
  }, [addUsedToken]);
};

export default useDashboardEventListeners;
