import { View } from "react-native";

import { AppColors } from "@/styles";

import { Typography } from "@/components/atoms";

import { GlobalStyles } from "@/styles/GlobalStyles.style";

export default function FilesScreen() {
  return (
    <View style={GlobalStyles.RootContainer}>
      <View style={GlobalStyles.PageContent}>
        <Typography
          text="Files Screen"
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
