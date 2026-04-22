import { useWindowDimensions } from "react-native";

import { SizeType } from "@/core/types";

import { Breakpoints } from "@/shared/styles";

const useResponsive = (): SizeType => {
  const { width } = useWindowDimensions();

  if (width < Breakpoints.tablet) return "mobile";
  if (width < Breakpoints.laptop) return "tablet";

  return "laptop";
};

export default useResponsive;
