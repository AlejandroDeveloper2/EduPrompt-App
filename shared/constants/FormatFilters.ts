import { FormatFilter, Lang } from "@/core/types";

/** Filtros por tipo de recurso educativo */
export const FORMAT_FILTERS: Lang<FormatFilter> = {
  en: [
    { icon: "star-outline", label: "All", formatKey: null },
    { icon: "text-outline", label: "Text", formatKey: "text" },
    { icon: "grid-outline", label: "Table", formatKey: "table" },
    { icon: "bar-chart-outline", label: "Chart", formatKey: "chart" },
    { icon: "image-outline", label: "Image", formatKey: "image" },
  ],
  es: [
    { icon: "star-outline", label: "Todos", formatKey: null },
    { icon: "text-outline", label: "Texto", formatKey: "text" },
    { icon: "grid-outline", label: "Tabla", formatKey: "table" },
    { icon: "bar-chart-outline", label: "Gráfico", formatKey: "chart" },
    { icon: "image-outline", label: "Imagen", formatKey: "image" },
  ],
  pt: [
    { icon: "star-outline", label: "Todos", formatKey: null },
    { icon: "text-outline", label: "Texto", formatKey: "text" },
    { icon: "grid-outline", label: "Tabela", formatKey: "table" },
    { icon: "bar-chart-outline", label: "Gráfico", formatKey: "chart" },
    { icon: "image-outline", label: "Imagem", formatKey: "image" },
  ],
};
