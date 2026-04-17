import { useEffect } from "react";
import { v4 as uuid } from "react-native-uuid/dist/v4";

import { eventBus } from "@/core/events/EventBus";

import { CreateResourcePayload } from "../../types";

import { useCreateResourceMutation } from "../mutations";

const useResourceEventListeners = () => {
  const { mutate } = useCreateResourceMutation();

  useEffect(() => {
    const handleAddResourceRequest = (
      payload: Omit<CreateResourcePayload, "resourceId">,
    ) => {
      eventBus.emit("resources.createResource.started", undefined);
      const resourceId: string = uuid();
      mutate(
        { ...payload, resourceId },
        {
          onSuccess: () => {
            eventBus.emit("resources.createResource.completed", undefined);
          },
          onError: (error) => {
            eventBus.emit("resources.createResource.failed", {
              error: String(error),
            });
          },
        },
      );
    };

    eventBus.on("resources.createResource.requested", handleAddResourceRequest);
    return () => {
      eventBus.off(
        "resources.createResource.requested",
        handleAddResourceRequest,
      );
    };
  }, [mutate]);
};

export default useResourceEventListeners;
