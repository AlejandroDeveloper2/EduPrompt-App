import { Href, useRouter } from "expo-router";
import { Pressable } from "react-native";

import { AppColors } from "@/styles";

import { useScreenDimensionsStore } from "@/lib/hooks/store";

import Typography from "../typography/Typography";

import { ToastLinkStyle } from "./ToastLink.style";

interface ToastLinkProps {
  href: Href;
  label: string;
}

const ToastLink = ({ href, label }: ToastLinkProps) => {
  const router = useRouter();
  const size = useScreenDimensionsStore();

  const toastLinkStyle = ToastLinkStyle(size);

  return (
    <Pressable
      style={toastLinkStyle.Container}
      onPress={() => router.replace(href)}
    >
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
