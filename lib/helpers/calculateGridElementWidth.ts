import { DimensionValue } from "react-native";

import { SizeType } from "../types";

type NumColsConfig = {
  mobile: number;
  tablet: number;
  laptop: number;
};

export const calculateGridElementWidth = (
  size: SizeType,
  colsConfig: NumColsConfig,
  containerGap: number,
  containerVerticalPadding: number,
  windowWidth: number
) => {
  const numCols = colsConfig[size];
  const totalGap = containerGap * (numCols - 1);

  const elementWidth: DimensionValue =
    (windowWidth - totalGap - containerVerticalPadding) / numCols;

  return elementWidth;
};
