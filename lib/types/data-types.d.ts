import { Ionicons } from "@expo/vector-icons";

import { ProcessType, ProgressConfig } from ".";

type ResourceFormatKey = "text" | "image" | "chart" | "table";
type Lang<T> = {
  en: T[];
  es: T[];
  pt: T[];
};
type ProcessStateType = "pending" | "done" | "in-progress" | "error";

interface FormatFilter {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}

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

interface Folder {
  folderId: string;
  folderName: string;
  files: number;
  folderUri: string;
  creationDate: string;
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
  progress: number;
  state: ProcessStateType;
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

interface Step {
  stepId: string;
  stepIcon: keyof typeof Ionicons.glyphMap;
  stepTitle: string;
  description: string;
  stepIllustration:
    | "FirstStepImage"
    | "SecondStepImage"
    | "ThirdStepImage"
    | "FourthStepImage"
    | "FiveStepImage";
}

/** Auth Module types */
interface LoginResponse {
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupPayload {
  userName: string;
  email: string;
  password: string;
}

interface ResetPassCodeResponse {
  userId: string;
}

interface ResetPassPayload {
  newPassword: string;
  userId: string;
}

/** Tipos Modulo de usuarios */
interface UserPreferences {
  autoSync: boolean;
  cleanFrecuency: string | null;
  pushNotifications: boolean;
  autoCleanNotifications: boolean;
  language: string;
}

interface User {
  userName: string;
  email: string;
  tokenCoins: number;
  isPremiumUser: boolean;
  userPreferences: UserPreferences;
}

interface UserStats extends User {
  sync: boolean;
}

export type {
  DownloadedResource,
  EducationalResource,
  Folder,
  FormatFilter,
  Lang,
  LoginCredentials,
  LoginResponse,
  NavOption,
  Notification,
  Process,
  ProcessStateType,
  Prompt,
  ResetPassCodeResponse,
  ResetPassPayload,
  ResourceFormatKey,
  SignupPayload,
  Step,
  User,
  UserPreferences,
  UserStats,
};
