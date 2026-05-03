import { useRouter } from "expo-router";

import { ResourceDescriptionFormData } from "./validationSchema";

import { useResourceDescriptionFormLogic } from "@/features/generations/hooks/forms";

import { Form } from "@/shared/components/organims";

const ResourceDescriptionForm = () => {
  const router = useRouter();
  const {
    currentIaGeneration,
    setGenerationStep,
    updateIaGeneration,
    form: {
      data,
      isPending,
      getFieldErrors,
      handleChange,
      handleClearInput,
      handleSubmit,
    },
    t,
  } = useResourceDescriptionFormLogic();

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.PromptInput<ResourceDescriptionFormData>
              label={t(
                "generations_translations.resource_description_template.form_labels.prompt_description.label",
              )}
              icon="chatbox-ellipses-outline"
              name="descriptionPrompt"
              value={data.descriptionPrompt}
              placeholder={t(
                "generations_translations.resource_description_template.form_labels.prompt_description.placeholder",
              )}
              errorMessage={getFieldErrors("descriptionPrompt")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("descriptionPrompt")}
              onSavePrompt={() => {
                if (!currentIaGeneration) return;
                updateIaGeneration(
                  currentIaGeneration.generationId,
                  { resourceDescriptionPrompt: data.descriptionPrompt },
                  {},
                  {},
                );
                router.push("/generation_save_prompt_sheet");
              }}
              onSearchPrompt={() =>
                router.push("/generation_prompt_selection_sheet")
              }
            />
          </Form.Row.Item>
        </Form.Row>
      </Form.Fields>
      <Form.Actions configRows={{ sm: 1, md: 2, lg: 2 }}>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="primary"
            width="100%"
            icon="bulb-outline"
            label={t(
              "generations_translations.resource_description_template.form_labels.btn_generate_resource",
            )}
            loading={isPending}
            disabled={
              currentIaGeneration
                ? !currentIaGeneration.generationCompleted
                : true
            }
            loadingMessage={t(
              "generations_translations.resource_description_template.form_loading_messages.generating_resource_msg",
            )}
            onPress={handleSubmit}
          />
        </Form.Row.Item>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="neutral"
            width="100%"
            icon="chevron-back-outline"
            label={t(
              "generations_translations.resource_description_template.form_labels.btn_prev_step",
            )}
            onPress={() => {
              if (!currentIaGeneration) return;
              setGenerationStep(
                currentIaGeneration.generationId,
                "language_selection",
              );
            }}
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default ResourceDescriptionForm;
