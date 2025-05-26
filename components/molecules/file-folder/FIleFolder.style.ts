import { StyleSheet, ViewStyle } from "react-native";

import { SizeType } from "@/lib/types";

import { AppColors, Spacing } from "@/styles";

const sharedStyle: ViewStyle = {
  width: "85%",
  flexDirection: "row",
  display: "flex",
  justifyContent: "space-between",
};

export const FileFolderStyle = (size: SizeType) =>
  StyleSheet.create({
    FileFolderContainer: {
      width: "100%",
      height: 90,
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingLeft: size === "mobile" ? Spacing.spacing_xs : Spacing.spacing_sm,
      gap: size === "mobile" ? Spacing.spacing_sm : Spacing.spacing_md,
    },
    Header: {
      ...sharedStyle,
      alignItems: "center",
    },
    MetadataContainer: {
      ...sharedStyle,
      alignItems: "flex-end",
    },
    Metadata: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: Spacing.spacing_xs,
    },
    OpenFolderPressable: {
      position: "absolute",
      right: 0,
      bottom: 0,
      height: "100%",
      backgroundColor: AppColors.primary[400],
      paddingHorizontal: Spacing.spacing_4xs,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });
