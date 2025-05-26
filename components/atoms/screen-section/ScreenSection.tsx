import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import { AlignTextType } from "@/lib/types";

import { AppColors } from "@/styles";

import { useScreenDimensionsStore } from "@/lib/hooks/store";

import Typography from "../typography/Typography";

import { ScreenSectionStyle } from "./ScreenSection.style";

interface ScreenSectionProps {
  description: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const ScreenSection = ({ description, title, icon }: ScreenSectionProps) => {
  const size = useScreenDimensionsStore();

  const textAlign: AlignTextType = size === "laptop" ? "left" : "center";

  return (
    <View style={ScreenSectionStyle("mobile").Container}>
      <Typography
        text={title}
        weight="medium"
        type="h2"
        textAlign={textAlign}
        color={AppColors.neutral[1000]}
        width="100%"
        icon={icon}
      />
      <Typography
        text={description}
        weight="regular"
        type="paragraph"
        textAlign={textAlign}
        color={AppColors.neutral[1000]}
        width="100%"
      />
    </View>
  );
};

export default ScreenSection;
