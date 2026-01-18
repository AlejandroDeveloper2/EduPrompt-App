import { Lang } from "@/core/types";
import { ResourceFormat } from "../types";

export const RESOURCE_FORMATS: Lang<ResourceFormat> = {
  es: [
    {
      formatKey: "text",
      formatLabel: "Texto",
    },
    {
      formatKey: "image",
      formatLabel: "Imagen",
    },
    {
      formatKey: "chart",
      formatLabel: "Gráfico",
    },
    {
      formatKey: "table",
      formatLabel: "Tabla",
    },
  ],
  en: [
    {
      formatKey: "text",
      formatLabel: "Text",
    },
    {
      formatKey: "image",
      formatLabel: "Image",
    },
    {
      formatKey: "chart",
      formatLabel: "Chart",
    },
    {
      formatKey: "table",
      formatLabel: "Table",
    },
  ],
  pt: [
    {
      formatKey: "text",
      formatLabel: "Texto",
    },
    {
      formatKey: "image",
      formatLabel: "Imagem",
    },
    {
      formatKey: "chart",
      formatLabel: "Gráfico",
    },
    {
      formatKey: "table",
      formatLabel: "Tabela",
    },
  ],
};
