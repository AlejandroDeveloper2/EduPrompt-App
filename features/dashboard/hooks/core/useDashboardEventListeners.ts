import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";

import { useIndicatorPanelStore } from "../store";

const useDashboardEventListeners = () => {
  const { updateLastGeneratedResource, addGeneratedResource, addUsedToken } =
    useIndicatorPanelStore();

  useEffect(() => {
    const handleUpdateLastGeneratedRequest = async (
      lastResourceName: string
    ) => {
      await updateLastGeneratedResource(lastResourceName);
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
    const handleAddGeneratedResourceRequest = async () => {
      await addGeneratedResource();
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
    const handleAddUsedTokenRequest = async (amount: number) => {
      await addUsedToken(amount);
    };
    eventBus.on("dashboard.addUsedTokens", handleAddUsedTokenRequest);
    return () => {
      eventBus.off("dashboard.addUsedTokens", handleAddUsedTokenRequest);
    };
  }, [addUsedToken]);
};

export default useDashboardEventListeners;
