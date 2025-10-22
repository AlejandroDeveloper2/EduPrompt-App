import { useEffect, useState } from "react";

import { eventBus } from "@/core/events/EventBus";

import { checkIsNewNotification } from "../../helpers";

const useCheckIsNewNotification = (notificationDate: Date) => {
  const [state, setState] = useState(() =>
    checkIsNewNotification(notificationDate)
  );

  useEffect(() => {
    setState(checkIsNewNotification(notificationDate));

    const listener = () => {
      const newState = checkIsNewNotification(notificationDate);
      // Solo actualiza si hay cambio real (optimización)
      setState((prev) => (prev.isNew !== newState.isNew ? newState : prev));
    };

    eventBus.on("notifications.checkNotification", listener);

    return () => {
      eventBus.off("notifications.checkNotification", listener);
    };
  }, [notificationDate]);

  return state;
};

export default useCheckIsNewNotification;
