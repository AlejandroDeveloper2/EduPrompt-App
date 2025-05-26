import { useEffect } from "react";
import { Dimensions } from "react-native";
import { useStore } from "zustand";

import { SizeType } from "@/lib/types";

import { ScreenDimensionsStore } from "@/lib/store";

const useScreenDimensionsStore = (): SizeType => {
  const { screenSize, getScreenDimensions } = useStore(ScreenDimensionsStore);

  useEffect(() => {
    Dimensions.addEventListener("change", () => getScreenDimensions());
  }, [getScreenDimensions]);

  return screenSize;
};

export default useScreenDimensionsStore;
