import { View } from "react-native";

import { CleanFrecuencyOption } from "@/features/settings/types";

import { AppColors } from "@/shared/styles";

import { useUserPreferencesLogic } from "@/features/settings/hooks/core";

import { Typography } from "@/shared/components/atoms";
import { DropdownOptionList } from "@/shared/components/organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const CleanFrecuencyOptions = () => {
  const {
    router,
    /** Language */
    t,
    /** Queries */
    mutate,
    /** Data */
    preferences,
    cleanFrecuencyOptions,
    getSelectedFrecuency,
  } = useUserPreferencesLogic();

  return (
    <>
      <View style={GlobalStyles.SheetHeaderContainer}>
        <Typography
          text={t(
            "settings_translations.preferences_popups_labels.auto_clean_frecuency.title",
          )}
          weight="medium"
          type="h2"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="100%"
          icon="time-outline"
        />
      </View>
      <DropdownOptionList<CleanFrecuencyOption>
        optionList={cleanFrecuencyOptions}
        optionIdkey="key"
        optionLabelKey="label"
        searchInputPlaceholder={t(
          "settings_translations.preferences_popups_labels.auto_clean_frecuency.list_search_placeholder",
        )}
        selectedOption={
          preferences.cleanFrecuency
            ? getSelectedFrecuency(preferences.cleanFrecuency)
            : cleanFrecuencyOptions[0]
        }
        onSelectOption={(option) =>
          mutate(
            { cleanFrecuency: option.key },
            {
              onSuccess: () => router.back(),
            },
          )
        }
      />
    </>
  );
};

export default CleanFrecuencyOptions;
