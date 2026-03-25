import { EDUCATIONAL_RESOURCE_TYPES } from "@/features/generations/constants";

import { ResourceType } from "@/features/generations/types";

import { ResourceTypeFormData } from "./validationSchema";

import { useResourceTypeFormLogic } from "@/features/generations/hooks/core";

import { DropdownOptionList, Form, PopUp } from "@/shared/components/organims";

const ResourceTypeForm = () => {
  const {
    form: {
      data,
      getFieldErrors,
      handleChange,
      handleClearInput,
      handleClearOptionalInput,
      handleSubmit,
    },
    chooseResourceTypePopUp,
    isLastOptionSelected,
    selectedOption,
    lang,
    t,
  } = useResourceTypeFormLogic();

  return (
    <>
      <PopUp
        icon="shapes-outline"
        title={t(
          "generations_translations.resource_type_template.resource_type_popup_labels.title"
        )}
        isPopUpMounted={chooseResourceTypePopUp.isPopUpMounted}
        gesture={chooseResourceTypePopUp.dragGesture}
        animatedPopUpStyle={chooseResourceTypePopUp.animatedPopUpStyle}
        onClosePopUp={chooseResourceTypePopUp.onClosePopUp}
      >
        <DropdownOptionList<ResourceType>
          optionList={EDUCATIONAL_RESOURCE_TYPES[lang]}
          optionIdkey="resourceTypeId"
          optionLabelKey="resourceTypeLabel"
          searchInputPlaceholder={t(
            "generations_translations.resource_type_template.resource_type_popup_labels.search_input_placeholder"
          )}
          selectedOption={selectedOption}
          onSelectOption={(option) => {
            handleChange("resourceTypeId", option.resourceTypeId);
            chooseResourceTypePopUp.onClosePopUp();
          }}
        />
      </PopUp>
      <Form>
        <Form.Fields>
          <Form.Row
            configRows={{ sm: 1, md: 1, lg: isLastOptionSelected ? 2 : 1 }}
          >
            <Form.Row.Item span={1}>
              <Form.Dropdown<ResourceTypeFormData, ResourceType>
                name="resourceTypeId"
                icon="book-outline"
                label={t(
                  "generations_translations.resource_type_template.form_labels.resource_type.label"
                )}
                placeholder={t(
                  "generations_translations.resource_type_template.form_labels.resource_type.placeholder"
                )}
                selectedOption={selectedOption}
                optionValueKey="resourceTypeLabel"
                displayDropdownOptions={chooseResourceTypePopUp.onOpenPopUp}
                errorMessage={getFieldErrors("resourceTypeId")?.join(", ")}
                clearSelectedOption={() => handleClearInput("resourceTypeId")}
              />
            </Form.Row.Item>
            {isLastOptionSelected && (
              <Form.Row.Item span={1}>
                <Form.Input<ResourceTypeFormData>
                  label={t(
                    "generations_translations.resource_type_template.form_labels.other.label"
                  )}
                  icon="document-text-outline"
                  name="otherResourceType"
                  value={data.otherResourceType ?? ""}
                  placeholder={t(
                    "generations_translations.resource_type_template.form_labels.other.placeholder"
                  )}
                  errorMessage={getFieldErrors("otherResourceType")?.join(", ")}
                  onChange={handleChange}
                  onClearInput={() =>
                    handleClearOptionalInput("otherResourceType")
                  }
                />
              </Form.Row.Item>
            )}
          </Form.Row>
        </Form.Fields>
        <Form.Actions configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Button
              variant="primary"
              width="100%"
              icon="chevron-forward-outline"
              label={t(
                "generations_translations.resource_type_template.form_labels.btn_next_step"
              )}
              onPress={handleSubmit}
            />
          </Form.Row.Item>
        </Form.Actions>
      </Form>
    </>
  );
};

export default ResourceTypeForm;
