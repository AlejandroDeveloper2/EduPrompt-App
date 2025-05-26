import { SizeType } from "@/lib/types";

export interface ScreenDimensionsStoreType {
  screenSize: SizeType;
  getScreenDimensions: () => void;
}
