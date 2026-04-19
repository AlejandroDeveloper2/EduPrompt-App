import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useMemo } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NavigationPropsBase } from "@/core/types";

import { getActiveNavItem, getMainNavigationRoutes } from "../../../helpers";
import {
  useLanguageStore,
  useScreenDimensionsStore,
} from "../../../hooks/store";
import { renderNavItem } from "../../../utils";

import { GenerateButton } from "../../molecules";
import { NavActions } from "./NavActions";

import { dynamicStyles } from "./Navigation.style";

type NavigationTabProps = BottomTabBarProps & NavigationPropsBase;

const NavigationTab = ({
  actions,
  state,
  navigation,
  ...props
}: NavigationTabProps) => {
  const { lang } = useLanguageStore();
  const size = useScreenDimensionsStore();
  const insets = useSafeAreaInsets();

  const styles = useMemo(() => dynamicStyles(size, insets), [size, insets]);
  const { firstItemsSlice, secondItemsSlice, centerItemsSlice } = useMemo(
    () => getMainNavigationRoutes(state.routes),
    [state.routes],
  );
  const isActionsVisible = useMemo(() => actions.length > 0, [actions.length]);

  return (
    <View style={styles.NavigationContainer}>
      {isActionsVisible ? (
        <NavActions actions={actions} />
      ) : (
        <>
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
              const NavItem = renderNavItem(
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
export default NavigationTab;
