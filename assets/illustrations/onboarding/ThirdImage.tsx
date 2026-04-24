import { Image } from "react-native";

import { useResponsive } from "@/shared/hooks/core";

import Illustration from "../../images/third-onboarding-step-image.png";

const ThirdImage = () => {
  const size = useResponsive();
  return (
    <Image
      source={Illustration}
      style={{ transform: [{ scale: size === "mobile" ? 0.7 : 1 }] }}
    />
  );
};

export default ThirdImage;
