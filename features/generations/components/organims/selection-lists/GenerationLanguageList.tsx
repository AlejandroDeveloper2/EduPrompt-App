import { useRouter } from "expo-router";
import { useMemo } from "react";
import { View } from "react-native";

import { AppLanguage } from "@/core/types";
import { APP_LANGUAGES } from "@/shared/constants";

import { useResourceGenerationStore } from "@/features/generations/store";
import { useTranslations } from "@/shared/hooks/core";

import { Typography } from "@/shared/components/atoms";
import { DropdownOptionList } from "@/shared/components/organims";

import { AppColors } from "@/shared/styles";
import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const GenerationLanguageList = () => {
  const router = useRouter();
  const { t } = useTranslations();

  const { currentIaGeneration, updateIaGeneration } =
    useResourceGenerationStore();

  const appLanguages = useMemo(() => APP_LANGUAGES(t), [t]);

  const selectedLanguage = useMemo(
    () =>
      appLanguages.find(
        (lang) => lang.key === currentIaGeneration?.data.language.key,
      ),
    [appLanguages, currentIaGeneration],
  );

  return (
    <>
      <View style={GlobalStyles.SheetHeaderContainer}>
        <View style={GlobalStyles.ClosePopUpDragIndicator} />
        <Typography
          text={t(
            "generations_translations.language_template.language_selection_popup_labels.title",
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
          "generations_translations.language_template.language_selection_popup_labels.search_input_placeholder",
        )}
        selectedOption={selectedLanguage ?? null}
        onSelectOption={(option) => {
          if (!currentIaGeneration) return;
          updateIaGeneration(
            currentIaGeneration.generationId,
            { language: option },
            {},
            {},
          );
          router.back();
        }}
      />
    </>
  );
};

export default GenerationLanguageList;
