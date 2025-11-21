import { TARGET_EDUCATIONAL_LEVELS } from "@/features/generations/constants";

import { EducationalLevel, GradeLevel } from "@/features/generations/types";

import { EducationalLevelFormData } from "./validationSchema";

import { useEducationalLevelFormLogic } from "@/features/generations/hooks/core";

import { DropdownOptionList, Form, PopUp } from "@/shared/components/organims";

const EducationalLevelForm = () => {
  const {
    currentIaGeneration,
    setGenerationStep,
    form: {
      getFieldErrors,
      handleChange,
      handleClearInput,
      handleClearOptionalInput,
      handleSubmit,
    },
    popUps: { educationalLevelPopUp, gradePopUp },
    selections: {
      selectedEducationalLevel,
      grades,
      selectedGrade,
      isGradeRequired,
    },
  } = useEducationalLevelFormLogic();

  return (
    <>
      <PopUp
        icon="school-outline"
        title="Elije el nivel educativo objetivo"
        isPopUpMounted={educationalLevelPopUp.isPopUpMounted}
        gesture={educationalLevelPopUp.dragGesture}
        animatedPopUpStyle={educationalLevelPopUp.animatedPopUpStyle}
        onClosePopUp={educationalLevelPopUp.onClosePopUp}
      >
        <DropdownOptionList<EducationalLevel>
          optionList={TARGET_EDUCATIONAL_LEVELS}
          optionIdkey="educationalLevelId"
          optionLabelKey="educationalLevelLabel"
          searchInputPlaceholder="Buscar nivel educativo"
          selectedOption={selectedEducationalLevel}
          onSelectOption={(option) => {
            handleChange("educationalLevelId", option.educationalLevelId);
            educationalLevelPopUp.onClosePopUp();
          }}
        />
      </PopUp>
      <PopUp
        icon="school-outline"
        title="Elije el grado académico objetivo"
        isPopUpMounted={gradePopUp.isPopUpMounted}
        gesture={gradePopUp.dragGesture}
        animatedPopUpStyle={gradePopUp.animatedPopUpStyle}
        onClosePopUp={gradePopUp.onClosePopUp}
      >
        <DropdownOptionList<GradeLevel>
          optionList={grades}
          optionIdkey="gradeLevelId"
          optionLabelKey="gradeLevelLabel"
          searchInputPlaceholder="Buscar grado académico"
          selectedOption={selectedGrade}
          onSelectOption={(option) => {
            handleChange("gradeLevelId", option.gradeLevelId);
            gradePopUp.onClosePopUp();
          }}
        />
      </PopUp>

      <Form>
        <Form.Fields>
          <Form.Row configRows={{ sm: 1, md: 1, lg: 2 }}>
            <Form.Row.Item span={1}>
              <Form.Dropdown<EducationalLevelFormData, EducationalLevel>
                name="educationalLevelId"
                icon="school-outline"
                label="Nivel académico objetivo (*)"
                placeholder="Seleccione una opción"
                selectedOption={selectedEducationalLevel}
                optionValueKey="educationalLevelLabel"
                displayDropdownOptions={educationalLevelPopUp.onOpenPopUp}
                errorMessage={getFieldErrors("educationalLevelId")?.join(", ")}
                clearSelectedOption={() =>
                  handleClearInput("educationalLevelId")
                }
              />
            </Form.Row.Item>
            {isGradeRequired && (
              <Form.Row.Item span={1}>
                <Form.Dropdown<EducationalLevelFormData, GradeLevel>
                  name="gradeLevelId"
                  icon="school-outline"
                  label="Grado (*)"
                  placeholder="Seleccione una opción"
                  selectedOption={selectedGrade}
                  optionValueKey="gradeLevelLabel"
                  displayDropdownOptions={gradePopUp.onOpenPopUp}
                  errorMessage={getFieldErrors("gradeLevelId")?.join(", ")}
                  clearSelectedOption={() =>
                    handleClearOptionalInput("gradeLevelId")
                  }
                />
              </Form.Row.Item>
            )}
          </Form.Row>
        </Form.Fields>
        <Form.Actions configRows={{ sm: 2, md: 2, lg: 2 }}>
          <Form.Row.Item span={1}>
            <Form.Button
              variant="neutral"
              width="100%"
              icon="chevron-back-outline"
              label="Anterior"
              onPress={() => {
                if (!currentIaGeneration) return;
                setGenerationStep(
                  currentIaGeneration.generationId,
                  "subject_name"
                );
              }}
            />
          </Form.Row.Item>
          <Form.Row.Item span={1}>
            <Form.Button
              variant="primary"
              width="100%"
              icon="chevron-forward-outline"
              label="Siguiente"
              onPress={handleSubmit}
            />
          </Form.Row.Item>
        </Form.Actions>
      </Form>
    </>
  );
};

export default EducationalLevelForm;
