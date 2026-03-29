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
          "generations_translations.educational_level_template.educational_level_popup_labels.title",
        )}
        isOpen={educationalLevelPopUp.isOpen}
        onClose={educationalLevelPopUp.closePopUp}
      >
        <DropdownOptionList<EducationalLevel>
          optionList={TARGET_EDUCATIONAL_LEVELS[lang]}
          optionIdkey="educationalLevelId"
          optionLabelKey="educationalLevelLabel"
          searchInputPlaceholder={t(
            "generations_translations.educational_level_template.educational_level_popup_labels.search_input_placeholder",
          )}
          selectedOption={selectedEducationalLevel}
          onSelectOption={(option) => {
            handleChange("educationalLevelId", option.educationalLevelId);
            educationalLevelPopUp.closePopUp();
          }}
        />
      </PopUp>
      <PopUp
        icon="school-outline"
        title={t(
          "generations_translations.educational_level_template.target_grade_popup_labels.title",
        )}
        isOpen={gradePopUp.isOpen}
        onClose={gradePopUp.closePopUp}
      >
        <DropdownOptionList<GradeLevel>
          optionList={grades}
          optionIdkey="gradeLevelId"
          optionLabelKey="gradeLevelLabel"
          searchInputPlaceholder={t(
            "generations_translations.educational_level_template.target_grade_popup_labels.search_input_placeholder",
          )}
          selectedOption={selectedGrade}
          onSelectOption={(option) => {
            handleChange("gradeLevelId", option.gradeLevelId);
            gradePopUp.closePopUp();
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
                  "generations_translations.educational_level_template.form_labels.target_educational_level.label",
                )}
                placeholder={t(
                  "generations_translations.educational_level_template.form_labels.target_educational_level.placeholder",
                )}
                selectedOption={selectedEducationalLevel}
                optionValueKey="educationalLevelLabel"
                displayDropdownOptions={educationalLevelPopUp.openPopUp}
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
                    "generations_translations.educational_level_template.form_labels.grade.label",
                  )}
                  placeholder={t(
                    "generations_translations.educational_level_template.form_labels.grade.placeholder",
                  )}
                  selectedOption={selectedGrade}
                  optionValueKey="gradeLevelLabel"
                  displayDropdownOptions={gradePopUp.openPopUp}
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
                "generations_translations.educational_level_template.form_labels.btn_prev_step",
              )}
              onPress={() => {
                if (!currentIaGeneration) return;
                setGenerationStep(
                  currentIaGeneration.generationId,
                  "subject_name",
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
                "generations_translations.educational_level_template.form_labels.btn_next_step",
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
