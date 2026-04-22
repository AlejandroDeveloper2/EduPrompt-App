import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NavigationPropsBase } from "@/core/types";

import { getActiveDrawerItem, getMainNavigationRoutes } from "../../../helpers";
import { renderDrawerItem } from "../../../utils";

import { useResponsive } from "@/shared/hooks/core";
import { useLanguageStore } from "../../../hooks/store";

import { GenerateButton } from "../../molecules";
import { NavActions } from "./NavActions";

import { dynamicStyles } from "./Navigation.style";

type NavigationDrawerProps = DrawerContentComponentProps & NavigationPropsBase;

const NavigationDrawer = ({
  actions,
  state,
  navigation,
  ...props
}: NavigationDrawerProps) => {
  const { lang } = useLanguageStore();
  const size = useResponsive();
  const insets = useSafeAreaInsets();

  const styles = dynamicStyles(size, insets);
  const { firstItemsSlice, secondItemsSlice, centerItemsSlice } =
    getMainNavigationRoutes(state.routes);
  const isActionsVisible = actions.length > 0;

  return (
    <View style={styles.NavigationContainer}>
      {isActionsVisible ? (
        <NavActions actions={actions} />
      ) : (
        <>
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
        </>
      )}
    </View>
  );
};

export default NavigationDrawer;
