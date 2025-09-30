import { StyleSheet } from "react-native";

import { SizeType } from "@/lib/types";

import { Spacing } from "@/styles";

export const FormStyle = (size: SizeType) =>
  StyleSheet.create({
    FormBody: {
      width: "100%",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      gap: size === "mobile" ? Spacing.spacing_xs : Spacing.spacing_3xs,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export const FormFieldsStyle = (size: SizeType) =>
  StyleSheet.create({
    FieldsSet: {
      width: "100%",
      display: "flex",
      gap: size === "mobile" ? Spacing.spacing_sm : Spacing.spacing_md,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  });

export const FormRowStyle = (gap: number) =>
  StyleSheet.create({
    FormRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-start",
      marginBottom: gap,
    },
  });

export const FormActionsStyle = StyleSheet.create({
  FormActions: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
});
