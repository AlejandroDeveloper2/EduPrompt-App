import { usePathname, useRouter } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useToolbar } from "@/shared/hooks/core";
import { useEventBusToggle, useEventbusValue } from "@/shared/hooks/events";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

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

  const { selectionMode, showToolbar, onHiddenToolbar, toggleSelectionMode } =
    useToolbar();

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

  const mixedNotifications = systemNotifications.concat(userNotifications);
  const thereAreNewUnreadNotifications =
    mixedNotifications.length > 0 &&
    mixedNotifications.some((n) => n.read === false);

  const headerStyle = HeaderStyle(size, insets);

  return (
    <View style={headerStyle.HeaderContainer}>
      {showToolbar ? (
        <Toolbar
          selectionMode={selectionMode}
          onHidden={onHiddenToolbar}
          toggleSelectionMode={toggleSelectionMode}
        />
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
                userProfile ? userProfile.tokenCoins.toString() : "?"
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
