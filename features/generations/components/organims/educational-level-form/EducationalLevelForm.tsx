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
    lang,
    t,
  } = useEducationalLevelFormLogic();

  return (
    <>
      <PopUp
        icon="school-outline"
        title={t(
          "generations-translations.educational-level-template.educational-level-popup-labels.title"
        )}
        isPopUpMounted={educationalLevelPopUp.isPopUpMounted}
        gesture={educationalLevelPopUp.dragGesture}
        animatedPopUpStyle={educationalLevelPopUp.animatedPopUpStyle}
        onClosePopUp={educationalLevelPopUp.onClosePopUp}
      >
        <DropdownOptionList<EducationalLevel>
          optionList={TARGET_EDUCATIONAL_LEVELS[lang]}
          optionIdkey="educationalLevelId"
          optionLabelKey="educationalLevelLabel"
          searchInputPlaceholder={t(
            "generations-translations.educational-level-template.educational-level-popup-labels.search-input-placeholder"
          )}
          selectedOption={selectedEducationalLevel}
          onSelectOption={(option) => {
            handleChange("educationalLevelId", option.educationalLevelId);
            educationalLevelPopUp.onClosePopUp();
          }}
        />
      </PopUp>
      <PopUp
        icon="school-outline"
        title={t(
          "generations-translations.educational-level-template.target-grade-popup-labels.title"
        )}
        isPopUpMounted={gradePopUp.isPopUpMounted}
        gesture={gradePopUp.dragGesture}
        animatedPopUpStyle={gradePopUp.animatedPopUpStyle}
        onClosePopUp={gradePopUp.onClosePopUp}
      >
        <DropdownOptionList<GradeLevel>
          optionList={grades}
          optionIdkey="gradeLevelId"
          optionLabelKey="gradeLevelLabel"
          searchInputPlaceholder={t(
            "generations-translations.educational-level-template.target-grade-popup-labels.search-input-placeholder"
          )}
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
                label={t(
                  "generations-translations.educational-level-template.form-labels.target-educational-level.label"
                )}
                placeholder={t(
                  "generations-translations.educational-level-template.form-labels.target-educational-level.placeholder"
                )}
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
                  label={t(
                    "generations-translations.educational-level-template.form-labels.grade.label"
                  )}
                  placeholder={t(
                    "generations-translations.educational-level-template.form-labels.grade.placeholder"
                  )}
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
              label={t(
                "generations-translations.educational-level-template.form-labels.btn-prev-step"
              )}
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
              label={t(
                "generations-translations.educational-level-template.form-labels.btn-next-step"
              )}
              onPress={handleSubmit}
            />
          </Form.Row.Item>
        </Form.Actions>
      </Form>
    </>
  );
};

export default EducationalLevelForm;
