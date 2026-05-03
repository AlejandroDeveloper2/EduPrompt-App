import { useRouter } from "expo-router";
import { useMemo } from "react";
import { View } from "react-native";

import { GradeLevel } from "@/features/generations/types";

import { useResourceGenerationStore } from "@/features/generations/store";
import { useTranslations } from "@/shared/hooks/core";

import { getGrades } from "../../../helpers";

import { Typography } from "@/shared/components/atoms";
import { DropdownOptionList } from "@/shared/components/organims";

import { AppColors } from "@/shared/styles";
import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const GenerationGradeLevelList = () => {
  const router = useRouter();
  const { t, lang } = useTranslations();

  const { currentIaGeneration, updateIaGeneration } =
    useResourceGenerationStore();

  const educationalLevelId =
    currentIaGeneration?.data.educationalLevel.educationalLevelId;

  const grades = useMemo(
    () => (educationalLevelId ? getGrades(educationalLevelId, lang) : []),
    [educationalLevelId, lang],
  );

  const selectedGrade = useMemo(
    () =>
      grades.find(
        (grade) =>
          grade.gradeLevelId ===
          currentIaGeneration?.data.educationalLevel.grade?.gradeLevelId,
      ),
    [grades, currentIaGeneration],
  );

  return (
    <>
      <View style={GlobalStyles.SheetHeaderContainer}>
        <View style={GlobalStyles.ClosePopUpDragIndicator} />
        <Typography
          text={t(
            "generations_translations.educational_level_template.target_grade_popup_labels.title",
          )}
          weight="medium"
          type="h2"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="100%"
          icon="ribbon-outline"
        />
      </View>

      <DropdownOptionList<GradeLevel>
        optionList={grades}
        optionIdkey="gradeLevelId"
        optionLabelKey="gradeLevelLabel"
        searchInputPlaceholder={t(
          "generations_translations.educational_level_template.target_grade_popup_labels.search_input_placeholder",
        )}
        selectedOption={selectedGrade ?? null}
        onSelectOption={(option) => {
          if (!currentIaGeneration) return;
          updateIaGeneration(
            currentIaGeneration.generationId,
            {
              educationalLevel: {
                ...currentIaGeneration.data.educationalLevel,
                grade: option,
              },
            },
            {},
            {},
          );
          router.back();
        }}
      />
    </>
  );
};

export default GenerationGradeLevelList;
