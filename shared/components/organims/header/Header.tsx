import { View } from "react-native";

import { useHeaderLogic } from "@/shared/hooks/core";

import { formatTokenAmount } from "@/shared/utils";

import { Logo } from "@/shared/components/atoms";
import {
  NavItem,
  SubscriptionIndicator,
  TokenBadge,
  Toolbar,
} from "@/shared/components/molecules";
import FloatMenu from "../float-menu/FloatMenu";

import { HeaderStyle } from "./Header.style";

const Header = () => {
  const {
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
  } = useHeaderLogic();

  const headerStyle = HeaderStyle(size, insets);

  return (
    <>
      <FloatMenu
        isMounted={isMounted}
        animatedStyle={animatedStyle}
        toggleDeploy={toggleDeploy}
      >
        <FloatMenu.Item
          label="Notificaciones"
          icon="notifications-outline"
          active={pathname === "/notifications_screen"}
          Node={
            thereAreNewUnreadNotifications ? (
              <View
                style={[
                  headerStyle.NotificationIndicator,
                  { position: "relative" },
                ]}
              />
            ) : undefined
          }
          onPress={() => handleNavigate("/(tabs)/notifications_screen", true)}
        />
        <FloatMenu.Item
          label="Tienda"
          icon="storefront-outline"
          active={pathname === "/marketplace_screen"}
          onPress={() => handleNavigate("/(tabs)/marketplace_screen", true)}
        />
        <FloatMenu.Item
          label="Etiquetas"
          icon="pricetag-outline"
          active={pathname === "/tags_screen"}
          onPress={() => handleNavigate("/(tabs)/tags_screen", true)}
        />
        <FloatMenu.Item
          label="Configuraciones"
          icon="settings-outline"
          active={pathname === "/settings_screen"}
          onPress={() => handleNavigate("/(tabs)/settings_screen", true)}
        />
      </FloatMenu>
      <View style={headerStyle.HeaderContainer}>
        {selectionMode ? (
          <Toolbar />
        ) : (
          <View style={headerStyle.NavItemListContainer}>
            <Logo />
            <View style={headerStyle.NavItems}>
              {size === "mobile" ? (
                <>
                  <TokenBadge
                    isLoading={loading}
                    tokenAmount={
                      userProfile
                        ? formatTokenAmount(userProfile.tokenCoins)
                        : "?"
                    }
                  />
                  <NavItem
                    icon="ellipsis-vertical-outline"
                    active={false}
                    onPress={toggleDeploy}
                    Node={
                      thereAreNewUnreadNotifications ? (
                        <View style={headerStyle.NotificationIndicator} />
                      ) : undefined
                    }
                  />
                </>
              ) : (
                <>
                  <NavItem
                    active={pathname === "/notifications_screen"}
                    icon={"notifications-outline"}
                    Node={
                      thereAreNewUnreadNotifications ? (
                        <View style={headerStyle.NotificationIndicator} />
                      ) : undefined
                    }
                    onPress={() =>
                      handleNavigate("/(tabs)/notifications_screen", false)
                    }
                  />
                  <NavItem
                    active={pathname === "/marketplace_screen"}
                    icon="storefront-outline"
                    onPress={() =>
                      handleNavigate("/(tabs)/marketplace_screen", false)
                    }
                  />
                  <NavItem
                    active={pathname === "/tags_screen"}
                    icon="pricetag-outline"
                    onPress={() => handleNavigate("/(tabs)/tags_screen", false)}
                  />
                  <NavItem
                    active={pathname === "/settings_screen"}
                    icon="settings-outline"
                    onPress={() =>
                      handleNavigate("/(tabs)/settings_screen", false)
                    }
                  />
                  <TokenBadge
                    isLoading={loading}
                    tokenAmount={
                      userProfile
                        ? formatTokenAmount(userProfile.tokenCoins)
                        : "?"
                    }
                  />
                </>
              )}
            </View>
          </View>
        )}
        <SubscriptionIndicator />
      </View>
    </>
  );
};

export default Header;
