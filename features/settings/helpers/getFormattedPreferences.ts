import { UserPreferences, UserStats } from "../types";

export const getFormattedPreferences = (
  userProfile: UserStats | undefined
): UserPreferences => {
  const preferences: UserPreferences = {
    autoSync: userProfile ? userProfile.userPreferences.autoSync : false,
    cleanFrecuency: userProfile
      ? userProfile.userPreferences.cleanFrecuency
      : null,
    pushNotifications: userProfile
      ? userProfile.userPreferences.pushNotifications
      : false,
    autoCleanNotifications: userProfile
      ? userProfile.userPreferences.autoCleanNotifications
      : false,
    language: userProfile ? userProfile.userPreferences.language : "es",
  };
  return preferences;
};
