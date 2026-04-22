import { Href, usePathname, useRouter } from "expo-router";
import { useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAnimatedFloatMenu } from "../animations";
import { useEventBusToggle, useEventbusValue } from "../events";
import { useSelectionModeStore } from "../store";
import useCheckPremium from "./useCheckPremium";
import useResponsive from "./useResponsive";
import useTranslations from "./useTranslations";

/** TODO: optimizar logica de este hook separando responsabilidades */

const useHeaderLogic = () => {
  const router = useRouter();
  const pathname = usePathname();

  const insets = useSafeAreaInsets();
  const size = useResponsive();

  const { isMounted, animatedStyle, toggleDeploy } = useAnimatedFloatMenu();

  const { selectionMode } = useSelectionModeStore();

  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const userProfile = useEventbusValue("userProfile.user.updated", null);
  const systemNotifications = useEventbusValue(
    "notifications.systemNotifications.updated",
    [],
  );
  const userNotifications = useEventbusValue(
    "notifications.userNotifications.updated",
    [],
  );
  const loading = useEventBusToggle("userProfile.updateTokeUserCoins.started", [
    "userProfile.updateTokeUserCoins.completed",
    "userProfile.updateTokeUserCoins.failed",
  ]);

  const { t } = useTranslations();

  const isPremium = useCheckPremium();

  const thereAreNewUnreadNotifications = useMemo(() => {
    return (
      (systemNotifications.length > 0 &&
        systemNotifications.some((n) => n.read === false)) ||
      (userNotifications.length > 0 &&
        userNotifications.some((n) => n.read === false))
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
    /** Premium status */
    isPremium,
    /** Auth  */
    isAuthenticated,
  };
};

export default useHeaderLogic;
