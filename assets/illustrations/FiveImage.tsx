import { Image } from "react-native";

import { useScreenDimensionsStore } from "@/lib/hooks/store";

import Illustration from "../images/five-onboarding-step-image.png";

const FiveImage = () => {
  const size = useScreenDimensionsStore();
  return (
    <Image
      source={Illustration}
      style={{ transform: [{ scale: size === "mobile" ? 0.8 : 1 }] }}
    />
  );
};

export default FiveImage;
