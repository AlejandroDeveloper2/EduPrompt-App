type ResourceFormatKey = "text" | "image" | "chart" | "table";

interface EducationalResource {
  resourceId: string;
  title: string;
  content: string;
  format: string;
  formatKey: ResourceFormatKey;
  groupTag: string;
  creationDate: string;
}

export type { EducationalResource, ResourceFormatKey };
