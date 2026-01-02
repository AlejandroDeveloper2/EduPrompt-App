import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";

import { CreateResourcePayload } from "../../types";

import { useCreateResource } from "../core";

const useResourceEventListeners = () => {
  const { addResource } = useCreateResource();

  useEffect(() => {
    const handleAddResourceRequest = async (
      payload: Omit<CreateResourcePayload, "resourceId">
    ) => {
      await addResource(payload);
    };

    eventBus.on("resources.createResource.requested", handleAddResourceRequest);
    return () => {
      eventBus.off(
        "resources.createResource.requested",
        handleAddResourceRequest
      );
    };
  }, [addResource]);
};

export default useResourceEventListeners;
