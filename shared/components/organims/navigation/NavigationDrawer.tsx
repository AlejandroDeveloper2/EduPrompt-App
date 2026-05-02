import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getActiveDrawerItem, getMainNavigationRoutes } from "../../../helpers";
import { renderDrawerItem } from "../../../utils";

import { useLanguageStore } from "@/core/store";
import { useResponsive } from "@/shared/hooks/core";

import { GenerateButton } from "../../molecules";

import { dynamicStyles } from "./Navigation.style";

type NavigationDrawerProps = DrawerContentComponentProps;

const NavigationDrawer = ({
  state,
  navigation,
  ...props
}: NavigationDrawerProps) => {
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
          const NavItem = renderDrawerItem(lang, index, navOption, {
            ...props,
            state,
            navigation,
          });
          return NavItem;
        })}
      </View>
      <GenerateButton
        active={getActiveDrawerItem(centerItemsSlice[0], state)}
        onPress={() => navigation.navigate(centerItemsSlice[0].name)}
      />
      <View style={styles.NavSlice}>
        {secondItemsSlice.map((navOption, index) => {
          const NavItem = renderDrawerItem(
            lang,
            index === 0 ? 3 : 4,
            navOption,
            {
              ...props,
              state,
              navigation,
            },
          );
          return NavItem;
        })}
      </View>
    </View>
  );
};

export default NavigationDrawer;
