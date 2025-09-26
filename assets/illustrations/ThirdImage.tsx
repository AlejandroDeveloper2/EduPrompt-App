import { Image } from "react-native";

import { useScreenDimensionsStore } from "@/lib/hooks/store";

import Illustration from "../images/third-onboarding-step-image.png";

const ThirdImage = () => {
  const size = useScreenDimensionsStore();
  return (
    <Image
      source={Illustration}
      style={{ transform: [{ scale: size === "mobile" ? 0.7 : 1 }] }}
    />
  );
};

export default ThirdImage;
