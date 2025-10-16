import { SizeType } from "@/core/types";

import { Spacing } from "../../styles";

import { calculateGridElementWidth } from "../../helpers";

export const getIndicatorPanelGrid = (size: SizeType, width: number) => {
  const firstWidth = calculateGridElementWidth(
    size,
    { mobile: 2, tablet: 2, laptop: 3 },
    Spacing.spacing_xs,
    size === "laptop" ? 190 : 48,
    width
  );
  const secondWidth = calculateGridElementWidth(
    size,
    { mobile: 2, tablet: 2, laptop: 2 },
    Spacing.spacing_xs,
    size === "laptop" ? 190 : 48,
    width
  );
  const thirdWidth = calculateGridElementWidth(
    size,
    { mobile: 1, tablet: 1, laptop: 2 },
    Spacing.spacing_xs,
    size === "laptop" ? 190 : 48,
    width
  );

  return { firstWidth, secondWidth, thirdWidth };
};
