import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";
import { EventKey } from "@/core/events/types";

import { UserStats } from "../../types";

const useEmitUserProfileUpdated = (isSuccess:boolean, data: UserStats | undefined) => {
  useEffect(() => {
    if (isSuccess && data) {
      eventBus.emit("userProfile.user.updated" as EventKey, data);
    }
  }, [isSuccess, data]);
};

export default useEmitUserProfileUpdated;
