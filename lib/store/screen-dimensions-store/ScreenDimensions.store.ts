import { Dimensions } from "react-native";
import { create } from "zustand";

import { SizeType } from "@/lib/types";
import { ScreenDimensionsStoreType } from "./store-types";

import { Breakpoints } from "@/styles";

export const ScreenDimensionsStore = create<ScreenDimensionsStoreType>(
  (set) => ({
    screenSize: "mobile" as SizeType,
    getScreenDimensions: (): void => {
      if (
        Dimensions.get("window").width >= Breakpoints.mobile &&
        Dimensions.get("window").width < Breakpoints.tablet
      ) {
        set({ screenSize: "mobile" });
      } else if (
        Dimensions.get("window").width >= Breakpoints.tablet &&
        Dimensions.get("window").width < Breakpoints.laptop
      )
        set({ screenSize: "tablet" });
      else set({ screenSize: "laptop" });
    },
  })
);
