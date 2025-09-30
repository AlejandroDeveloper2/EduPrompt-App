import { createContext } from "react";

import { FormContextType } from "./types";

import { Spacing } from "@/styles";

export const FormContext = createContext<FormContextType>({
  size: "mobile",
  containerWidth: 0,
  gap: Spacing.spacing_sm,
});
