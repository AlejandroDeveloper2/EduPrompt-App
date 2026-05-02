import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getActiveNavItem, getMainNavigationRoutes } from "../../../helpers";
import { renderNavItem } from "../../../utils/functions/renderNavItem";

import { useLanguageStore } from "@/core/store";
import useResponsive from "@/shared/hooks/core/useResponsive";

import { GenerateButton } from "../../molecules";

import { dynamicStyles } from "./Navigation.style";

type NavigationTabProps = BottomTabBarProps;

const NavigationTab = ({ state, navigation, ...props }: NavigationTabProps) => {
  const lang = useLanguageStore((state) => state.lang);
  const size = useResponsive();
  const insets = useSafeAreaInsets();

  const styles = dynamicStyles(size, insets);
  const { firstItemsSlice, secondItemsSlice, centerItemsSlice } =
    getMainNavigationRoutes(state.routes);

  return (
    <View style={styles.NavigationContainer}>
      <View style={styles.NavSlice}>
        {firstItemsSlice.map((navOption, index) => {
          const NavItem = renderNavItem(lang, index, navOption, {
            ...props,
            state,
            navigation,
          });
          return NavItem;
        })}
      </View>
      <GenerateButton
        active={getActiveNavItem(centerItemsSlice[0], state)}
        onPress={() => navigation.navigate(centerItemsSlice[0].name)}
      />
      <View style={styles.NavSlice}>
        {secondItemsSlice.map((navOption, index) => {
          const NavItem = renderNavItem(lang, index === 0 ? 3 : 4, navOption, {
            ...props,
            state,
            navigation,
          });
          return NavItem;
        })}
      </View>
    </View>
  );
};
export default NavigationTab;
