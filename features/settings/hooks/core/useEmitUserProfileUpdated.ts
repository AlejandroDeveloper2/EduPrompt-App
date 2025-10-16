import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";
import { EventKey } from "@/core/events/types";

import { useUserProfileQuery } from "../queries";

const useEmitUserProfileUpdated = () => {
  const { data, isSuccess, isLoading } = useUserProfileQuery();

  useEffect(() => {
    if (isSuccess && data) {
      eventBus.emit("userProfile.user.updated" as EventKey, data);
    }
  }, [isSuccess, data]);

  return {
    userProfile: data,
    isLoading,
  };
};

export default useEmitUserProfileUpdated;
