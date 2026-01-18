/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { useGenerationsStore } from "@/features/generations/hooks/store";
import { useForm, useTranslations } from "@/shared/hooks/core";

import { SubjectFormData, subjectFormSchema } from "./validationSchema";

import { Form } from "@/shared/components/organims";

const initialValues: SubjectFormData = {
  subjectName: "",
};

const SubjectForm = () => {
  const { currentIaGeneration, updateIaGeneration, setGenerationStep } =
    useGenerationsStore();
  const {
    data,
    getFieldErrors,
    handleChange,
    handleClearInput,
    handleSubmit,
    setValues,
  } = useForm({
    initialValues,
    validationSchema: subjectFormSchema,
    actionCallback: () => {
      if (!currentIaGeneration) return;
      updateIaGeneration(
        currentIaGeneration.generationId,
        { subjectName: data.subjectName },
        { completed: true },
        {}
      );
      setGenerationStep(
        currentIaGeneration.generationId,
        "educational_level_selection"
      );
    },
    noReset: true,
  });

  const { t } = useTranslations();

  useEffect(() => {
    const { data: currentData } = currentIaGeneration!;
    setValues({ subjectName: currentData.subjectName });
  }, [currentIaGeneration!.data]);

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<SubjectFormData>
              label={t(
                "generations-translations.subject-template.form-labels.subject.label"
              )}
              icon="book-outline"
              name="subjectName"
              value={data.subjectName}
              placeholder={t(
                "generations-translations.subject-template.form-labels.subject.placeholder"
              )}
              errorMessage={getFieldErrors("subjectName")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("subjectName")}
            />
          </Form.Row.Item>
        </Form.Row>
      </Form.Fields>
      <Form.Actions configRows={{ sm: 2, md: 2, lg: 2 }}>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="neutral"
            width="100%"
            icon="chevron-back-outline"
            label={t(
              "generations-translations.subject-template.form-labels.btn-prev-step"
            )}
            onPress={() => {
              if (!currentIaGeneration) return;
              setGenerationStep(
                currentIaGeneration.generationId,
                "resource_type_selection"
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
              "generations-translations.subject-template.form-labels.btn-next-step"
            )}
            onPress={handleSubmit}
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default SubjectForm;
