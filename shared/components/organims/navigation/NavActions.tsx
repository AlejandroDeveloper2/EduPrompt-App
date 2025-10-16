import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NavOption } from "@/core/types";

import { useScreenDimensionsStore } from "../../../hooks/store";

import { NavItem } from "../../molecules";

import { NavigationStyle } from "./Navigation.style";

interface NavActionsProps {
  actions: NavOption[];
}
export const NavActions = ({ actions }: NavActionsProps) => {
  const insets = useSafeAreaInsets();
  const size = useScreenDimensionsStore();

  return (
    <View style={NavigationStyle(size, insets).NavSlice}>
      {actions.map(({ navItemId, ...navAction }) => (
        <NavItem key={navItemId} active={false} {...navAction} />
      ))}
    </View>
  );
};
