import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useToolbar } from "@/lib/hooks/core";
import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { Logo } from "@/components/atoms";
import {
  NavItem,
  SubscriptionIndicator,
  TokenBadge,
  Toolbar,
} from "@/components/molecules";

import { HeaderStyle } from "./Header.style";

const Header = () => {
  const insets = useSafeAreaInsets();
  const size = useScreenDimensionsStore();
  const { selectionMode, showToolbar, onHiddenToolbar, toggleSelectionMode } =
    useToolbar();

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
              active={false}
              icon="notifications-outline"
              onPress={() => {}}
            />
            <NavItem
              active={false}
              icon="storefront-outline"
              onPress={() => {}}
            />
            <TokenBadge tokenAmount="100K" />
          </View>
        </View>
      )}
      <SubscriptionIndicator />
    </View>
  );
};

export default Header;
