import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";

import { APP_LANGUAGES } from "@/shared/constants";
import { CLEAN_FRECUENCY_OPTIONS } from "../../constants";

import { useTranslations } from "@/shared/hooks/core";
import { useUpdatePreferencesMutation } from "../mutations";
import { useUserProfileQuery } from "../queries";

import { getFormattedPreferences } from "../../helpers";

const useUserPreferencesLogic = () => {
  const router = useRouter();

  const { userProfile, isLoading } = useUserProfileQuery();
  const { mutate } = useUpdatePreferencesMutation();

  const { t, setLanguage } = useTranslations();

  const preferences = useMemo(
    () => getFormattedPreferences(userProfile),
    [userProfile],
  );

  const cleanFrecuencyOptions = useMemo(() => CLEAN_FRECUENCY_OPTIONS(t), [t]);
  const appLanguages = useMemo(() => APP_LANGUAGES(t), [t]);

  const getSelectedFrecuency = useCallback(
    (cleanFrecuency: string) => {
      return cleanFrecuencyOptions.filter(
        (frecuency) => frecuency.key === cleanFrecuency,
      )[0];
    },
    [cleanFrecuencyOptions],
  );

  const getSelectedLanguage = useCallback(
    (language: string) => {
      return appLanguages.filter((lang) => lang.key === language)[0];
    },
    [appLanguages],
  );

  return {
    /** Routing */
    router,
    /** Language */
    t,
    setLanguage,
    /** Queries */
    isLoading,
    mutate,
    /** Data */
    preferences,
    cleanFrecuencyOptions,
    appLanguages,
    getSelectedFrecuency,
    getSelectedLanguage,
  };
};

export default useUserPreferencesLogic;
