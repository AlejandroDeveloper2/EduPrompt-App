import { Image } from "react-native";

import { useResponsive } from "@/shared/hooks/core";

import Illustration from "../../images/welcome-onboarding-image.png";

const IntroImage = () => {
  const size = useResponsive();
  return (
    <Image
      source={Illustration}
      style={{ transform: [{ scale: size === "mobile" ? 0.8 : 1 }] }}
    />
  );
};

export default IntroImage;
