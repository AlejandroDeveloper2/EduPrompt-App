import { useRouter } from "expo-router";
import { useMemo } from "react";
import { View } from "react-native";

import { TARGET_EDUCATIONAL_LEVELS } from "@/features/generations/constants";
import { EducationalLevel } from "@/features/generations/types";

import { useResourceGenerationStore } from "@/features/generations/store";
import { useTranslations } from "@/shared/hooks/core";

import { Typography } from "@/shared/components/atoms";
import { DropdownOptionList } from "@/shared/components/organims";

import { AppColors } from "@/shared/styles";
import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const GenerationEducationalLevelList = () => {
  const router = useRouter();
  const { t, lang } = useTranslations();

  const { currentIaGeneration, updateIaGeneration } =
    useResourceGenerationStore();

  const educationalLevelList = useMemo(
    () => TARGET_EDUCATIONAL_LEVELS[lang],
    [lang],
  );

  const selectedEducationalLevel = useMemo(
    () =>
      educationalLevelList.find(
        (level) =>
          level.educationalLevelId ===
          currentIaGeneration?.data.educationalLevel.educationalLevelId,
      ),
    [educationalLevelList, currentIaGeneration],
  );

  return (
    <>
      <View style={GlobalStyles.SheetHeaderContainer}>
        <View style={GlobalStyles.ClosePopUpDragIndicator} />
        <Typography
          text={t(
            "generations_translations.educational_level_template.educational_level_popup_labels.title",
          )}
          weight="medium"
          type="h2"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="100%"
          icon="school-outline"
        />
      </View>

      <DropdownOptionList<EducationalLevel>
        optionList={educationalLevelList}
        optionIdkey="educationalLevelId"
        optionLabelKey="educationalLevelLabel"
        searchInputPlaceholder={t(
          "generations_translations.educational_level_template.educational_level_popup_labels.search_input_placeholder",
        )}
        selectedOption={selectedEducationalLevel ?? null}
        onSelectOption={(option) => {
          if (!currentIaGeneration) return;
          updateIaGeneration(
            currentIaGeneration.generationId,
            { educationalLevel: { ...option, grade: undefined } },
            {},
            {},
          );
          router.back();
        }}
      />
    </>
  );
};

export default GenerationEducationalLevelList;
