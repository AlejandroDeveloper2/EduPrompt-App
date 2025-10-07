import { User, UserPreferences } from "../types/data-types";

export const getFormattedPreferences = (
  userProfile: User | undefined
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
