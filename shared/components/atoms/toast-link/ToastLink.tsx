import { Href, useRouter } from "expo-router";
import { Pressable } from "react-native";

import { AppColors } from "../../../styles";

import useResponsive from "@/shared/hooks/core/useResponsive";

import Typography from "../typography/Typography";

import { dynamicStyles } from "./ToastLink.style";

interface ToastLinkProps {
  href: Href;
  label: string;
}

const ToastLink = ({ href, label }: ToastLinkProps) => {
  const router = useRouter();
  const size = useResponsive();

  const styles = dynamicStyles(size);

  return (
    <Pressable style={styles.Container} onPress={() => router.replace(href)}>
      <Typography
        text={label}
        weight="regular"
        type="paragraph"
        textAlign="center"
        color={AppColors.neutral[1000]}
        width="auto"
      />
    </Pressable>
  );
};

export default ToastLink;
