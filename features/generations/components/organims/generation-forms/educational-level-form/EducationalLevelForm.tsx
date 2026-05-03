import { useRouter } from "expo-router";

import { EducationalLevel, GradeLevel } from "@/features/generations/types";

import { EducationalLevelFormData } from "./validationSchema";

import { useEducationalLevelFormLogic } from "@/features/generations/hooks/forms";

import { Form } from "@/shared/components/organims";

const EducationalLevelForm = () => {
  const router = useRouter();
  const {
    currentIaGeneration,
    setGenerationStep,
    form: {
      getFieldErrors,
      handleClearInput,
      handleClearOptionalInput,
      handleSubmit,
    },
    selections: { selectedEducationalLevel, selectedGrade, isGradeRequired },
    t,
  } = useEducationalLevelFormLogic();

  return (
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
              displayDropdownOptions={() =>
                router.push("/generation_educational_level_sheet")
              }
              errorMessage={getFieldErrors("educationalLevelId")?.join(", ")}
              clearSelectedOption={() => handleClearInput("educationalLevelId")}
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
                displayDropdownOptions={() =>
                  router.push("/generation_grade_level_sheet")
                }
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
  );
};

export default EducationalLevelForm;
