import { Image } from "react-native";

import { useScreenDimensionsStore } from "@/shared/hooks/store";

import Illustration from "../images/second-onboarding-step-image.png";

const SecondImage = () => {
  const size = useScreenDimensionsStore();
  return (
    <Image
      source={Illustration}
      style={{ transform: [{ scale: size === "mobile" ? 0.8 : 1 }] }}
    />
  );
};

export default SecondImage;
