import { StyleSheet } from "react-native";

import { SizeType } from "@/lib/types";
import { Spacing } from "@/styles";

export const DropdownStyle = (size: SizeType) =>
  StyleSheet.create({
    Body: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: "auto",
      width: "100%",
      overflow: "hidden",
    },
    Tools: {
      flex: 2,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: Spacing.spacing_xs,
    },
    Option: {
      width: "100%",
      flex: 3,
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingVertical:
        size === "mobile" ? Spacing.spacing_md : Spacing.spacing_lg,
    },
  });
