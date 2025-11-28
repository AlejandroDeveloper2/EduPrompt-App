import { differenceInDays } from "date-fns";

import { UserStats } from "@/features/auth/types";

export const shouldPerformClean = (
  userProfile: Omit<UserStats, "sync" | "userName" | "email"> | null | undefined
): boolean => {
  if (!userProfile) return false;
  if (!userProfile.userPreferences) return false;
  if (userProfile.userPreferences.autoCleanNotifications === false)
    return false;
  const cleanFrecuency = userProfile.userPreferences.cleanFrecuency
    ? parseInt(userProfile.userPreferences.cleanFrecuency.split("-")[0] ?? 2)
    : 2;
  const days = cleanFrecuency;
  if (!userProfile.userPreferences.lastCleanAt) return true;

  const last = new Date(userProfile.userPreferences.lastCleanAt);
  const now = new Date();

  const diffInDays = differenceInDays(now, last);
  return diffInDays >= days;
};
