import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";
import { EventKey } from "@/core/events/types";

import { useUserProfileQuery } from "../queries";

const useEmitUserProfileUpdated = () => {
  const { data, isSuccess } = useUserProfileQuery();

  useEffect(() => {
    if (isSuccess && data) {
      eventBus.emit("userProfile:updated" as EventKey, data);
    }
  }, [isSuccess, data]);
};

export default useEmitUserProfileUpdated;
