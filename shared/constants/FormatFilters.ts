import { FormatFilter, Lang } from "@/core/types";

/** Filtros por tipo de recurso educativo */
export const FORMAT_FILTERS: Lang<FormatFilter> = {
  en: [
    { icon: "star-outline", label: "All" },
    { icon: "text-outline", label: "Text" },
    { icon: "grid-outline", label: "Table" },
    { icon: "bar-chart-outline", label: "Chart" },
    { icon: "image-outline", label: "Image" },
  ],
  es: [
    { icon: "star-outline", label: "Todos" },
    { icon: "text-outline", label: "Texto" },
    { icon: "grid-outline", label: "Tabla" },
    { icon: "bar-chart-outline", label: "Gráfico" },
    { icon: "image-outline", label: "Imagen" },
  ],
  pt: [
    { icon: "star-outline", label: "Todos" },
    { icon: "text-outline", label: "Texto" },
    { icon: "grid-outline", label: "Tabela" },
    { icon: "bar-chart-outline", label: "Gráfico" },
    { icon: "image-outline", label: "Imagem" },
  ],
};
