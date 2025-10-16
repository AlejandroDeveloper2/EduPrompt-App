import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { AppColors, FontSizes } from "@/shared/styles";

import { getFontFamily } from "@/shared/helpers";

export const ResourceViewerStyle = (scroll: boolean) =>
  StyleSheet.create({
    ViewerContainer: {
      width: "100%",
      backgroundColor: AppColors.basic.white,
      justifyContent: "flex-start",
      alignItems: "center",
      // padding: Spacing.spacing_md,
      maxHeight: scroll ? 500 : "auto",
    },
    Image: {
      width: "100%",
      height: 400,
    },
  });

export const MarkdownStyle = (size: SizeType) =>
  StyleSheet.create({
    heading1: {
      fontSize: FontSizes[size]["display"],
      color: AppColors.primary[400],
      fontFamily: getFontFamily("bold"),
    },
    heading2: {
      fontSize: FontSizes[size]["h1"],
      color: AppColors.primary[400],
      fontFamily: getFontFamily("bold"),
    },
    heading3: {
      fontSize: FontSizes[size]["h2"],
      color: AppColors.neutral[1000],
      fontFamily: getFontFamily("bold"),
    },
    heading4: {
      fontSize: FontSizes[size]["button"],
      color: AppColors.neutral[1000],
      fontFamily: getFontFamily("medium"),
    },
    heading5: {
      fontSize: FontSizes[size]["paragraph"],
      color: AppColors.neutral[1000],
      fontFamily: getFontFamily("medium"),
    },
    heading6: {
      fontSize: FontSizes[size]["caption"],
      color: AppColors.neutral[1000],
      fontFamily: getFontFamily("medium"),
    },
    paragraph: {
      fontSize: FontSizes[size]["paragraph"],
      color: AppColors.neutral[1000],
      fontFamily: getFontFamily("regular"),
    },
  });
