import { View } from "react-native";

import { NavOption } from "@/lib/types/data-types";

import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { NavItem } from "@/components/molecules";

import { NavigationStyle } from "./Navigation.style";

interface NavActionsProps {
  actions: NavOption[];
}

export const NavActions = ({ actions }: NavActionsProps) => {
  const size = useScreenDimensionsStore();

  return (
    <View style={NavigationStyle(size).NavSlice}>
      {actions.map(({ navItemId, ...navAction }) => (
        <NavItem key={navItemId} active={false} {...navAction} />
      ))}
    </View>
  );
};
