import { Dimensions } from "react-native";
import { create } from "zustand";

import { SizeType } from "../../types";
import { ScreenDimensionsStoreType } from "./store-types";

import { Breakpoints } from "@/shared/styles";

export const ScreenDimensionsStore = create<ScreenDimensionsStoreType>(
  (set) => ({
    screenSize: "mobile" as SizeType,
    getScreenDimensions: (): void => {
      const screenWidth = Dimensions.get("window").width;
      if (
        screenWidth >= Breakpoints.mobile &&
        screenWidth < Breakpoints.tablet
      ) {
        set({ screenSize: "mobile" });
      } else if (
        screenWidth >= Breakpoints.tablet &&
        screenWidth < Breakpoints.laptop
      )
        set({ screenSize: "tablet" });
      else set({ screenSize: "laptop" });
    },
  })
);
