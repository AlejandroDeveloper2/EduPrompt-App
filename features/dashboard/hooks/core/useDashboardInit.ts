import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";

const useDashboardInit = () => {
  useEffect(() => {
    eventBus.emit("userProfile.fetch", undefined);
  }, []);
};

export default useDashboardInit;
