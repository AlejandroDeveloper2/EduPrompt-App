import { SizeType } from "@/core/types";

export interface ScreenDimensionsStoreType {
  screenSize: SizeType;
  getScreenDimensions: () => void;
}
