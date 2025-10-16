import { Href, useRouter } from "expo-router";
import { Pressable, View } from "react-native";

import { AppColors } from "../../../styles";

import Typography from "../typography/Typography";

import { LinkStyle } from "./Link.style";

interface LinkProps {
  label: string;
  linkLabel: string;
  href: Href;
  alignment?: "left" | "center" | "right";
}

const Link = ({ label, linkLabel, href, alignment }: LinkProps) => {
  const router = useRouter();

  return (
    <View style={LinkStyle(alignment).LinkContainer}>
      <Typography
        text={label}
        weight="regular"
        type="paragraph"
        textAlign="center"
        color={AppColors.neutral[1000]}
        width="auto"
      />
      <Pressable onPress={() => router.navigate(href)}>
        <Typography
          text={linkLabel}
          weight="bold"
          type="paragraph"
          textAlign="center"
          color={AppColors.primary[400]}
          width="auto"
        />
      </Pressable>
    </View>
  );
};

export default Link;
