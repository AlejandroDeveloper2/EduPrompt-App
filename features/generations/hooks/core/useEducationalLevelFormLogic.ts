/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";

import {
  PRESCHOOL_GRADE_LEVELS,
  PRIMARY_GRADE_LEVELS,
  SECONDARY_GRADE_LEVELS,
  TARGET_EDUCATIONAL_LEVELS,
} from "../../constants";

import {
  EducationalLevelFormData,
  educationalLevelFormSchema,
} from "../../components/organims/educational-level-form/validationSchema";

import { useAnimatedPopUp } from "@/shared/hooks/animations";
import { useForm } from "@/shared/hooks/core";
import { useGenerationsStore } from "../store";

import { getGrades, getSelectedOption } from "../../helpers";

const initialValues: EducationalLevelFormData = {
  educationalLevelId: "",
};

const useEducationalLevelFormLogic = () => {
  const { currentIaGeneration, updateIaGeneration, setGenerationStep } =
    useGenerationsStore();
  const {
    data,
    getFieldErrors,
    handleChange,
    handleClearInput,
    handleClearOptionalInput,
    handleSubmit,
    setValues,
  } = useForm({
    initialValues,
    validationSchema: educationalLevelFormSchema,
    actionCallback: () => {
      if (!currentIaGeneration) return;

      const educationalLevel = getSelectedOption(
        TARGET_EDUCATIONAL_LEVELS,
        data.educationalLevelId,
        "educationalLevelId"
      );
      const grades = PRESCHOOL_GRADE_LEVELS.concat([
        ...PRIMARY_GRADE_LEVELS,
        ...SECONDARY_GRADE_LEVELS,
      ]);

      const grade = getSelectedOption(
        grades,
        data.gradeLevelId,
        "gradeLevelId"
      );

      if (!educationalLevel) return;

      updateIaGeneration(
        currentIaGeneration.generationId,
        {
          educationalLevel: { ...educationalLevel, grade: grade ?? undefined },
        },
        { completed: true },
        {}
      );

      setGenerationStep(currentIaGeneration.generationId, "country_selection");
    },
    noReset: true,
  });

  const educationalLevelPopUp = useAnimatedPopUp();
  const gradePopUp = useAnimatedPopUp();

  const { selectedEducationalLevel } = useMemo(
    () => ({
      selectedEducationalLevel: getSelectedOption(
        TARGET_EDUCATIONAL_LEVELS,
        data.educationalLevelId,
        "educationalLevelId"
      ),
    }),
    [data.educationalLevelId]
  );

  const { grades } = useMemo(
    () => ({
      grades: getGrades(data.educationalLevelId),
    }),
    [data.educationalLevelId]
  );

  const { selectedGrade } = useMemo(
    () => ({
      selectedGrade: getSelectedOption(
        grades,
        data.gradeLevelId,
        "gradeLevelId"
      ),
    }),
    [data.gradeLevelId, grades]
  );

  const isGradeRequired = useMemo(() => {
    const requiredGradeLevels = [
      "educational_level_preschool",
      "educational_level_primary",
      "educational_level_secondary",
    ];
    return requiredGradeLevels.includes(data.educationalLevelId);
  }, [data.educationalLevelId]);

  useEffect(() => {
    if (!currentIaGeneration) return;
    const { data: currentData } = currentIaGeneration;
    setValues({
      educationalLevelId: currentData.educationalLevel.educationalLevelId,
      gradeLevelId: currentData.educationalLevel.grade?.gradeLevelId,
    });
  }, [currentIaGeneration]);

  return {
    currentIaGeneration,
    setGenerationStep,
    form: {
      getFieldErrors,
      handleChange,
      handleClearInput,
      handleClearOptionalInput,
      handleSubmit,
    },
    popUps: {
      educationalLevelPopUp,
      gradePopUp,
    },
    selections: {
      selectedEducationalLevel,
      grades,
      selectedGrade,
      isGradeRequired,
    },
  };
};

export default useEducationalLevelFormLogic;
