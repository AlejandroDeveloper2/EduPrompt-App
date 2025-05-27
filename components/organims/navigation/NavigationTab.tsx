import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NavigationPropsBase } from "@/lib/types";

import { getActiveNavItem } from "@/lib/helpers";
import { useScreenDimensionsStore } from "@/lib/hooks/store";
import { renderNavItem } from "@/lib/utils";

import { GenerateButton } from "@/components/molecules";
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

  const firstItemsSlice = [state.routes[0], state.routes[3]];
  const secondItemsSlice = [state.routes[4], state.routes[1]];
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
