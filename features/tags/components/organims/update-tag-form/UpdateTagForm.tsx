import { View } from "react-native";

import { TagType } from "@/features/tags/types";

import { AppColors } from "@/shared/styles";

import { UpdateTagFormData } from "./validationSchema";

import { useUpdateTagForm } from "@/features/tags/hooks/core";

import { Typography } from "@/shared/components/atoms";
import { Form } from "@/shared/components/organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const UpdateTagForm = () => {
  const {
    data,
    isPending,
    t,
    handleSubmit,
    handleChange,
    handleClearInput,
    getFieldErrors,
  } = useUpdateTagForm();

  return (
    <>
      <View style={GlobalStyles.SheetHeaderContainer}>
        <View style={GlobalStyles.ClosePopUpDragIndicator} />
        <Typography
          text={t(
            "tags_translations.tag_list_labels.update_tag_popup_labels.title",
          )}
          weight="medium"
          type="h2"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="100%"
          icon="language-outline"
        />
      </View>
      <Form>
        <Form.Fields>
          <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
            <Form.Row.Item span={1}>
              <Form.Input<UpdateTagFormData>
                label={t(
                  "tags_translations.update_tag_template.form_labels.name.label",
                )}
                icon="pricetag-outline"
                name="name"
                value={data.name}
                placeholder={t(
                  "tags_translations.update_tag_template.form_labels.name.placeholder",
                )}
                errorMessage={getFieldErrors("name")?.join(", ")}
                onChange={handleChange}
                onClearInput={() => handleClearInput("name")}
              />
            </Form.Row.Item>
            <Form.Row.Item span={1}>
              <Form.MultiOptionInput<UpdateTagFormData, TagType>
                label={t(
                  "tags_translations.update_tag_template.form_labels.type.label",
                )}
                name="type"
                value={data.type}
                errorMessage={getFieldErrors("type")?.join(", ")}
                onChange={handleChange}
              >
                <Form.MultiOptionInput.Option
                  label={t(
                    "tags_translations.update_tag_template.form_labels.type.options.prompts",
                  )}
                  optionValue="prompt_tag"
                  isSelected={data.type === "prompt_tag"}
                />
                <Form.MultiOptionInput.Option
                  label={t(
                    "tags_translations.update_tag_template.form_labels.type.options.resources",
                  )}
                  optionValue="resource_tag"
                  isSelected={data.type === "resource_tag"}
                />
              </Form.MultiOptionInput>
            </Form.Row.Item>
          </Form.Row>
        </Form.Fields>
        <Form.Actions configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Button
              variant="primary"
              width="100%"
              icon="pencil-outline"
              label={t(
                "tags_translations.update_tag_template.form_labels.btn_update_tag",
              )}
              onPress={handleSubmit}
              loading={isPending}
              loadingMessage={t(
                "tags_translations.update_tag_template.form_loading_messages.updating_tag_msg",
              )}
            />
          </Form.Row.Item>
        </Form.Actions>
      </Form>
    </>
  );
};

export default UpdateTagForm;
