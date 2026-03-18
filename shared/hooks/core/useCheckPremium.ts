import { useMemo } from "react";

import { useEventbusValue } from "../events";

const useCheckPremium = (): boolean => {
  const userProfile = useEventbusValue("userProfile.user.updated", null);
  const isPremium = useMemo(
    () => userProfile !== null && userProfile.isPremiumUser,
    [userProfile],
  );

  return isPremium;
};

export default useCheckPremium;
