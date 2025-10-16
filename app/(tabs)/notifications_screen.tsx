import { View } from "react-native";

import { AppColors } from "@/shared/styles";

import { Typography } from "@/shared/components/atoms";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

export default function NotificationsScreen() {
  return (
    <View style={GlobalStyles.RootContainer}>
      <View style={GlobalStyles.PageContent}>
        <Typography
          text="Notifications Screen"
          weight="bold"
          type="h1"
          textAlign="center"
          color={AppColors.primary[400]}
          width={"auto"}
        />
      </View>
    </View>
  );
}
