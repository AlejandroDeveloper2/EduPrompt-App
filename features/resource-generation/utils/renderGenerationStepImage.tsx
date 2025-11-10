import { ReactNode } from "react";

import { IllustrationType } from "../types";

import {
  FirstFormStepImage,
  FivethFormStepImage,
  FourthFormStepImage,
  SecondFormStepImage,
  SeventhFormStepImage,
  SixthFormStepImage,
  ThirdFormStepImage,
} from "@/assets/illustrations";

export const renderGenerationStepImage = (
  stepIllustration: IllustrationType
) => {
  const Illustrations: Record<IllustrationType, ReactNode> = {
    FirstFormStepImage: <FirstFormStepImage />,
    SecondFormStepImage: <SecondFormStepImage />,
    ThirdFormStepImage: <ThirdFormStepImage />,
    FourthFormStepImage: <FourthFormStepImage />,
    FivethFormStepImage: <FivethFormStepImage />,
    SixthFormStepImage: <SixthFormStepImage />,
    SeventhFormStepImage: <SeventhFormStepImage />,
  };

  return Illustrations[stepIllustration];
};
