import { Href, useRouter } from "expo-router";
import { Pressable, View } from "react-native";

import { AppColors } from "../../../styles";

import { openLink } from "@/shared/helpers";

import Typography from "../typography/Typography";

import { dynamicStyles } from "./Link.style";

interface LinkProps {
  label: string;
  linkLabel: string;
  href: Href;
  alignment?: "left" | "center" | "right";
}

interface ExternalLinkProps extends Omit<LinkProps, "href"> {
  href: string;
}

export const ExternalLink = ({
  label,
  linkLabel,
  href,
  alignment,
}: ExternalLinkProps) => {
  const styles = dynamicStyles(alignment);
  return (
    <View style={styles.LinkContainer}>
      <Typography
        text={label}
        weight="regular"
        type="paragraph"
        textAlign="center"
        color={AppColors.neutral[1000]}
        width="auto"
      />
      <Pressable onPress={() => openLink(href)}>
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

const Link = ({ label, linkLabel, href, alignment }: LinkProps) => {
  const router = useRouter();

  return (
    <View style={dynamicStyles(alignment).LinkContainer}>
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
