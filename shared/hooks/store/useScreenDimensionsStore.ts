import { useEffect } from "react";
import { Dimensions } from "react-native";
import { useStore } from "zustand";

import { SizeType } from "@/core/types";

import { ScreenDimensionsStore } from "@/core/store";

const useScreenDimensionsStore = (): SizeType => {
  const { screenSize, getScreenDimensions } = useStore(ScreenDimensionsStore);

  useEffect(() => {
    Dimensions.addEventListener("change", () => getScreenDimensions());
  }, [getScreenDimensions]);

  return screenSize;
};

export default useScreenDimensionsStore;
