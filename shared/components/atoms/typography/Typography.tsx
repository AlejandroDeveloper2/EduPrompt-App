import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { Text, View } from "react-native";

import { AlignTextType, FontWeigthType, TypographyType } from "@/core/types";

import { FontIconSizes } from "../../../styles";

import { useScreenDimensionsStore } from "../../../hooks/store";

import { Ionicon } from "../icon/Icon";

import { dynamicStyles } from "./Typography.style";

interface TypographyProps {
  text: string;
  weight: FontWeigthType;
  type: TypographyType;
  textAlign: AlignTextType;
  color: string;
  width: "auto" | "100%" | number;
  icon?: keyof typeof Ionicons.glyphMap;
}

const Typography = ({
  text,
  color,
  icon,
  weight,
  type,
  textAlign,
  width,
}: TypographyProps) => {
  const size = useScreenDimensionsStore();

  const styles = useMemo(
    () => dynamicStyles({ size, color, weight, type, textAlign, width }),
    [color, size, textAlign, type, weight, width],
  );

  return (
    <View style={styles.TextContainer}>
      {icon && (
        <Ionicon name={icon} size={FontIconSizes[size][type]} color={color} />
      )}
      <Text style={styles.Text}>{text}</Text>
    </View>
  );
};

export default Typography;
