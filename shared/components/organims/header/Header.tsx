import { usePathname, useRouter } from "expo-router";
import { useMemo } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useSelectionModeContext } from "@/shared/hooks/context";
import { useEventBusToggle, useEventbusValue } from "@/shared/hooks/events";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { formatTokenAmount } from "@/shared/utils";

import { Logo } from "@/shared/components/atoms";
import {
  NavItem,
  SubscriptionIndicator,
  TokenBadge,
  Toolbar,
} from "@/shared/components/molecules";

import { HeaderStyle } from "./Header.style";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const size = useScreenDimensionsStore();

  const { selectionMode } = useSelectionModeContext();

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

  const thereAreNewUnreadNotifications = useMemo(() => {
    const mixedNotifications = systemNotifications.concat(userNotifications);
    return (
      mixedNotifications.length > 0 &&
      mixedNotifications.some((n) => n.read === false)
    );
  }, [systemNotifications, userNotifications]);

  const headerStyle = HeaderStyle(size, insets);

  return (
    <View style={headerStyle.HeaderContainer}>
      {selectionMode ? (
        <Toolbar />
      ) : (
        <View style={headerStyle.NavItemListContainer}>
          <Logo />
          <View style={headerStyle.NavItems}>
            <NavItem
              active={pathname === "/notifications_screen"}
              icon={"notifications-outline"}
              Node={
                thereAreNewUnreadNotifications ? (
                  <View style={headerStyle.NotificationIndicator} />
                ) : undefined
              }
              onPress={() => router.navigate("/(tabs)/notifications_screen")}
            />
            <NavItem
              active={pathname === "/marketplace_screen"}
              icon="storefront-outline"
              onPress={() => router.navigate("/(tabs)/marketplace_screen")}
            />
            <NavItem
              active={pathname === "/settings_screen"}
              icon="settings-outline"
              onPress={() => router.navigate("/(tabs)/settings_screen")}
            />
            <TokenBadge
              isLoading={loading}
              tokenAmount={
                userProfile ? formatTokenAmount(userProfile.tokenCoins) : "?"
              }
            />
          </View>
        </View>
      )}
      <SubscriptionIndicator />
    </View>
  );
};

export default Header;
