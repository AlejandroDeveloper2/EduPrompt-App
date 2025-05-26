import { StyleSheet } from "react-native";

import { SizeType } from "@/lib/types";

import { Spacing } from "@/styles";

import { ResourceCardStyle } from "../resource-card/ResourceCard.style";

export const FileCardStyle = (size: SizeType) =>
  StyleSheet.create({
    ...ResourceCardStyle(size),
    FileMetadata: {
      flexDirection: "row",
      display: "flex",
      gap: Spacing.spacing_xs,
      justifyContent: "flex-start",
      alignItems: "center",
    },
  });
