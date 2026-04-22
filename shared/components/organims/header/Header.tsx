import { View } from "react-native";

import { useHeaderLogic } from "@/shared/hooks/core";

import { formatTokenAmount } from "@/shared/utils";

import { Logo } from "@/shared/components/atoms";
import {
  NavItem,
  SubscriptionIndicator,
  SyncronizationIndicatorBar,
  TokenBadge,
  Toolbar,
} from "@/shared/components/molecules";
import FloatMenu from "../float-menu/FloatMenu";

import { dynamicStyles } from "./Header.style";

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
    /** Language */
    t,
    isPremium,
    /** Auth  */
    isAuthenticated,
  } = useHeaderLogic();

  const styles = dynamicStyles(size, insets);

  return (
    <>
      <FloatMenu
        isMounted={isMounted}
        animatedStyle={animatedStyle}
        toggleDeploy={toggleDeploy}
      >
        <FloatMenu.Item
          label={t("common_translations.header_labels.notifications")}
          icon="notifications-outline"
          active={pathname === "/notifications_screen"}
          Node={
            thereAreNewUnreadNotifications ? (
              <View
                style={[styles.NotificationIndicator, { position: "relative" }]}
              />
            ) : undefined
          }
          onPress={() =>
            handleNavigate("/(app)/(tabs)/notifications_screen", true)
          }
        />
        <FloatMenu.Item
          label={t("common_translations.header_labels.marketplace")}
          icon="storefront-outline"
          active={pathname === "/marketplace_screen"}
          onPress={() =>
            handleNavigate("/(app)/(tabs)/marketplace_screen", true)
          }
        />
        <FloatMenu.Item
          label={t("common_translations.header_labels.settings")}
          icon="settings-outline"
          active={pathname === "/settings_screen"}
          onPress={() => handleNavigate("/(app)/(tabs)/settings_screen", true)}
        />
      </FloatMenu>
      <View style={styles.HeaderContainer}>
        {selectionMode ? (
          <Toolbar />
        ) : (
          <View style={styles.NavItemListContainer}>
            <Logo />
            <View style={styles.NavItems}>
              {size === "mobile" ? (
                <>
                  <TokenBadge
                    isLoading={loading}
                    tokenAmount={
                      userProfile
                        ? formatTokenAmount(userProfile.tokenCoins)
                        : "?"
                    }
                    isPremium={isPremium}
                  />
                  <NavItem
                    icon="ellipsis-vertical-outline"
                    active={false}
                    onPress={toggleDeploy}
                    Node={
                      thereAreNewUnreadNotifications ? (
                        <View style={styles.NotificationIndicator} />
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
                        <View style={styles.NotificationIndicator} />
                      ) : undefined
                    }
                    onPress={() =>
                      handleNavigate(
                        "/(app)/(tabs)/notifications_screen",
                        false,
                      )
                    }
                  />
                  <NavItem
                    active={pathname === "/marketplace_screen"}
                    icon="storefront-outline"
                    onPress={() =>
                      handleNavigate("/(app)/(tabs)/marketplace_screen", false)
                    }
                  />
                  <NavItem
                    active={pathname === "/settings_screen"}
                    icon="settings-outline"
                    onPress={() =>
                      handleNavigate("/(app)/(tabs)/settings_screen", false)
                    }
                  />
                  <TokenBadge
                    isLoading={loading}
                    isPremium={isPremium}
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
        {isAuthenticated && <SyncronizationIndicatorBar />}
      </View>
    </>
  );
};

export default Header;
