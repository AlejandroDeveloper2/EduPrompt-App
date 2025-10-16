import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

export const LogoStyle = (size: SizeType) =>
  StyleSheet.create({
    logoSvg: {
      transform: [{ scale: size === "mobile" ? 0.8 : 1.3 }],
      width: 36,
      height: 53,
    },
    logoV2Svg: {
      width: 202,
      height: 91,
    },
  });
