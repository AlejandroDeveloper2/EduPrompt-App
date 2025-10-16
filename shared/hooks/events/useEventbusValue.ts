import { useEffect, useState } from "react";

import { eventBus } from "@/core/events/EventBus";
import type { AppEvents } from "@/core/events/events";

const useEventBusValue = <K extends keyof AppEvents>(
  event: K,
  initialValue: AppEvents[K]
) => {
  const [state, setState] = useState<AppEvents[K]>(initialValue);

  useEffect(() => {
    const unsubscribe = eventBus.on(event, (data) => setState(data));
    return unsubscribe;
  }, [event]);

  return state;
};

export default useEventBusValue;
