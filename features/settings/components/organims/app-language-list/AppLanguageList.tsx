import { View } from "react-native";

import { AppLanguage } from "@/core/types";

import { AppColors } from "@/shared/styles";

import { useUserPreferencesLogic } from "@/features/settings/hooks/core";

import { Typography } from "@/shared/components/atoms";
import { DropdownOptionList } from "@/shared/components/organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const AppLanguageList = () => {
  const {
    router,
    /** Language */
    t,
    setLanguage,
    /** Queries */
    mutate,
    /** Data */
    preferences,
    appLanguages,
    getSelectedLanguage,
  } = useUserPreferencesLogic();

  return (
    <>
      <View style={GlobalStyles.SheetHeaderContainer}>
        <View style={GlobalStyles.ClosePopUpDragIndicator} />
        <Typography
          text={t(
            "settings_translations.preferences_popups_labels.language.title",
          )}
          weight="medium"
          type="h2"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="100%"
          icon="language-outline"
        />
      </View>
      <DropdownOptionList<AppLanguage>
        optionList={appLanguages}
        optionIdkey="key"
        optionLabelKey="label"
        searchInputPlaceholder={t(
          "settings_translations.preferences_popups_labels.language.list_search_placeholder",
        )}
        selectedOption={
          preferences.language
            ? getSelectedLanguage(preferences.language)
            : appLanguages[0]
        }
        onSelectOption={(option) => {
          setLanguage(option.key);
          mutate(
            { language: option.key },
            {
              onSuccess: () => router.navigate("/(app)/(tabs)/settings_screen"),
            },
          );
        }}
      />
    </>
  );
};

export default AppLanguageList;
