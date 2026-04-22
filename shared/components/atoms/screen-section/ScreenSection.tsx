import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import { AlignTextType } from "@/core/types";

import { AppColors } from "../../../styles";

import { useResponsive } from "@/shared/hooks/core";

import Typography from "../typography/Typography";

import { dynamicStyles } from "./ScreenSection.style";

interface ScreenSectionProps {
  description: string;
  color?: string;
  title?: string;
  fullTitleWidth?: boolean;
  icon: keyof typeof Ionicons.glyphMap;
}

const ScreenSection = ({
  description,
  title,
  fullTitleWidth,
  icon,
  color,
}: ScreenSectionProps) => {
  const size = useResponsive();

  const styles = dynamicStyles(size);
  const textAlign: AlignTextType = size === "laptop" ? "left" : "center";

  return (
    <View style={styles.Container}>
      {title && (
        <Typography
          text={title}
          weight="medium"
          type="h1"
          textAlign={textAlign}
          color={color ? color : AppColors.neutral[1000]}
          width={fullTitleWidth ? "100%" : "auto"}
          icon={icon}
        />
      )}

      <Typography
        text={description}
        weight="regular"
        type="paragraph"
        textAlign="left"
        color={AppColors.neutral[1000]}
        width="100%"
      />
    </View>
  );
};

export default ScreenSection;
