import { useEffect, useState } from "react";

import { checkIsNewNotification } from "../../helpers";

const useCheckIsNewNotification = (notificationDate: Date) => {
  const [{ isNew, formattedDate }, setNewState] = useState(() =>
    checkIsNewNotification(notificationDate)
  );

  useEffect(() => {
    const { isNew, formattedDate } = checkIsNewNotification(notificationDate);
    setNewState({ isNew, formattedDate });

    if (!isNew) return;

    // calcular cuánto falta para que deje de ser nueva
    const TWENTY_MINUTES = 20 * 60 * 1000;
    const creationTime = new Date(notificationDate).getTime();
    const now = Date.now();
    const timeLeft = Math.max(TWENTY_MINUTES - (now - creationTime), 0);

    const timer = setTimeout(() => {
      setNewState(checkIsNewNotification(notificationDate));
    }, timeLeft);

    return () => clearTimeout(timer);
  }, [notificationDate]);

  return { isNew, formattedDate };
};

export default useCheckIsNewNotification;
