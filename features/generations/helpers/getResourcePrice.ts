import { config } from "@/core/config/enviromentVariables";

import { ResourceFormatKey } from "../types";

export const getResourcePrice = (format: ResourceFormatKey) => {
  const pricePerResourceFormat: Record<ResourceFormatKey, number> = {
    image: config.imageResourcePrice,
    table: config.tableResourcePrice,
    text: config.textResourcePrice,
    chart: config.chartResourcePrice,
  };

  return pricePerResourceFormat[format];
};
