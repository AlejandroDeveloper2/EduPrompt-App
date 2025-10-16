import { useEffect, useState } from "react";

import { eventBus } from "@/core/events/EventBus";
import type { AppEvents } from "@/core/events/events";

const useEventBusValue = <K extends keyof AppEvents>(
  event: K,
  initialValue: AppEvents[K]
) => {
  const [state, setState] = useState<AppEvents[K]>(
    eventBus.getLast(event) ?? initialValue
  );

  useEffect(() => {
    const unsubscribe = eventBus.on(
      event,
      (data) => {
        // Evitamos re-render si el valor es el mismo
        setState((prev) => (Object.is(prev, data) ? prev : data));
      },
      { immediate: false }
    );
    return unsubscribe;
  }, [event]);

  return state;
};

export default useEventBusValue;
