import { useEffect, useRef, useState } from "react";

import { eventBus } from "@/core/events/EventBus";

import { EventKey } from "@/core/events/types";

const useEventBusToggle = <K extends EventKey>(
  startEvent: K,
  endEvents: K[]
) => {
  const [active, setActive] = useState<boolean>(false);
  /** Referencia para evitar renders innecesarios solo hace el render si active cambia de estado*/
  const activeRef = useRef(false);

  useEffect(() => {
    const start = () => {
      if (!activeRef.current) {
        activeRef.current = true;
        setActive(true);
      }
    };

    const end = () => {
      if (activeRef.current) {
        activeRef.current = false;
        setActive(false);
      }
    };

    eventBus.on(startEvent, start);
    endEvents.forEach((event) => eventBus.on(event, end));

    return () => {
      eventBus.off(startEvent, start);
      endEvents.forEach((event) => eventBus.off(event, end));
    };
  }, [startEvent, endEvents]);

  return active;
};

export default useEventBusToggle;
