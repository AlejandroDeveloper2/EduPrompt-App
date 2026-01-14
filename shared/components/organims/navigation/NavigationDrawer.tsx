import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NavigationPropsBase } from "@/core/types";

import { getActiveDrawerItem, getMainNavigationRoutes } from "../../../helpers";
import {
  useLanguageStore,
  useScreenDimensionsStore,
} from "../../../hooks/store";
import { renderDrawerItem } from "../../../utils";

import { GenerateButton } from "../../molecules";
import { NavActions } from "./NavActions";

import { NavigationStyle } from "./Navigation.style";

type NavigationDrawerProps = DrawerContentComponentProps & NavigationPropsBase;

const NavigationDrawer = ({
  actions,
  state,
  navigation,
  ...props
}: NavigationDrawerProps) => {
  const { lang } = useLanguageStore();
  const size = useScreenDimensionsStore();
  const insets = useSafeAreaInsets();

  const navigationStyle = NavigationStyle(size, insets);

  const { firstItemsSlice, secondItemsSlice, centerItemsSlice } =
    getMainNavigationRoutes(state.routes);

  const isActionsVisible = actions.length > 0;

  return (
    <View style={navigationStyle.NavigationContainer}>
      {isActionsVisible ? (
        <NavActions actions={actions} />
      ) : (
        <>
          <View style={navigationStyle.NavSlice}>
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
          <View style={navigationStyle.NavSlice}>
            {secondItemsSlice.map((navOption, index) => {
              const NavItem = renderDrawerItem(
                lang,
                index === 0 ? 3 : 4,
                navOption,
                {
                  ...props,
                  state,
                  navigation,
                }
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
