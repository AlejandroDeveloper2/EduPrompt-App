import { Href, usePathname, useRouter } from "expo-router";
import { useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAnimatedFloatMenu } from "../animations";
import { useEventBusToggle, useEventbusValue } from "../events";
import { useScreenDimensionsStore, useSelectionModeStore } from "../store";
import useTranslations from "./useTranslations";

const useHeaderLogic = () => {
  const router = useRouter();
  const pathname = usePathname();

  const insets = useSafeAreaInsets();
  const size = useScreenDimensionsStore();

  const { isMounted, animatedStyle, toggleDeploy } = useAnimatedFloatMenu();

  const { selectionMode } = useSelectionModeStore();

  const userProfile = useEventbusValue("userProfile.user.updated", null);
  const systemNotifications = useEventbusValue(
    "notifications.systemNotifications.updated",
    []
  );
  const userNotifications = useEventbusValue(
    "notifications.userNotifications.updated",
    []
  );

  const loading = useEventBusToggle("userProfile.updateTokeUserCoins.started", [
    "userProfile.updateTokeUserCoins.completed",
    "userProfile.updateTokeUserCoins.failed",
  ]);

  const { t } = useTranslations();

  const thereAreNewUnreadNotifications = useMemo(() => {
    const mixedNotifications = systemNotifications.concat(userNotifications);
    return (
      mixedNotifications.length > 0 &&
      mixedNotifications.some((n) => n.read === false)
    );
  }, [systemNotifications, userNotifications]);

  const handleNavigate = (href: Href, floatMenu: boolean): void => {
    router.navigate(href);
    if (floatMenu) toggleDeploy();
  };

  return {
    /** Screen size */
    size,
    insets,
    /** Router */
    pathname,
    handleNavigate,
    /** Float menu */
    isMounted,
    animatedStyle,
    toggleDeploy,
    /** Selection Mode */
    selectionMode,
    /** Events bus */
    userProfile,
    loading,
    thereAreNewUnreadNotifications,
    /** Language */
    t,
  };
};

export default useHeaderLogic;
