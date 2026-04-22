import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NavOption } from "@/core/types";

import { useResponsive } from "@/shared/hooks/core";

import { NavItem } from "../../molecules";

import { dynamicStyles } from "./Navigation.style";

interface NavActionsProps {
  actions: NavOption[];
}
export const NavActions = ({ actions }: NavActionsProps) => {
  const insets = useSafeAreaInsets();
  const size = useResponsive();

  const styles = dynamicStyles(size, insets);

  return (
    <View style={styles.NavSlice}>
      {actions.map(({ navItemId, ...navAction }) => (
        <NavItem key={navItemId} active={false} {...navAction} />
      ))}
    </View>
  );
};
