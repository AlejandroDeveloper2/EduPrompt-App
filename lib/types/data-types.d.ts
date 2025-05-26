import { Ionicons } from "@expo/vector-icons";
import { ProcessType, ProgressConfig } from ".";

type ResourceFormatKey = "text" | "image" | "chart" | "table";
type Lang<T> = {
  en: T[];
  es: T[];
  pt: T[];
};

interface EducationalResource {
  resourceId: string;
  title: string;
  content: string;
  format: string;
  formatKey: ResourceFormatKey;
  groupTag: string;
  creationDate: string;
}

interface DownloadedResource {
  fileId: string;
  name: string;
  fileExtension: string;
  fileUri: string;
  format: string;
  formatKey: ResourceFormatKey;
  downloadDate: string;
  fileSize: string;
}

interface Prompt {
  promptId: string;
  promptTitle: string;
  promptText: string;
  tag: string;
}

interface Process {
  processId: string;
  type: ProcessType;
  processName: string;
  progressConfig: ProgressConfig;
  tasksDone?: number;
}

interface Notification {
  notificationId: string;
  title: string;
  notificationDate: string;
  message: string;
}

interface NavOption {
  navItemId: string;
  label?: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

export type {
  DownloadedResource,
  EducationalResource,
  Lang,
  NavOption,
  Notification,
  Process,
  Prompt,
  ResourceFormatKey,
};
