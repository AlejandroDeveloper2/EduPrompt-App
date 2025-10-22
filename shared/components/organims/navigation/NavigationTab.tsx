import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NavigationPropsBase } from "@/core/types";

import { getActiveNavItem } from "../../../helpers";
import { useScreenDimensionsStore } from "../../../hooks/store";
import { renderNavItem } from "../../../utils";

import { GenerateButton } from "../../molecules";
import { NavActions } from "./NavActions";

import { NavigationStyle } from "./Navigation.style";

type NavigationTabProps = BottomTabBarProps & NavigationPropsBase;

const NavigationTab = ({
  actions,
  state,
  navigation,
  ...props
}: NavigationTabProps) => {
  const language = "es";
  const size = useScreenDimensionsStore();
  const insets = useSafeAreaInsets();

  const navigationStyle = NavigationStyle(size, insets);

  const firstItemsSlice = [state.routes[0], state.routes[4]];
  const secondItemsSlice = [state.routes[6], state.routes[1]];
  const isActionsVisible = actions.length > 0;

  return (
    <View style={navigationStyle.NavigationContainer}>
      {isActionsVisible ? (
        <NavActions actions={actions} />
      ) : (
        <>
          <View style={navigationStyle.NavSlice}>
            {firstItemsSlice.map((navOption, index) => {
              const NavItem = renderNavItem(language, index, navOption, {
                ...props,
                state,
                navigation,
              });
              return NavItem;
            })}
          </View>
          <GenerateButton
            active={getActiveNavItem(state.routes[2], state)}
            onPress={() => navigation.navigate(state.routes[2].name)}
          />
          <View style={navigationStyle.NavSlice}>
            {secondItemsSlice.map((navOption, index) => {
              const NavItem = renderNavItem(
                language,
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
export default NavigationTab;
