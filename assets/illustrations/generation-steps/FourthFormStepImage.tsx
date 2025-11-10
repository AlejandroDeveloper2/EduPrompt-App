import { Image } from "react-native";

import { useScreenDimensionsStore } from "@/shared/hooks/store";

import Illustration from "../../images/fourth-form-step-image.png";

const FourthFormStepImage = () => {
  const size = useScreenDimensionsStore();
  return (
    <Image
      source={Illustration}
      style={{ transform: [{ scale: size === "mobile" ? 0.8 : 1 }] }}
    />
  );
};

export default FourthFormStepImage;
