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
          "generations-translations.resource-type-template.resource-type-popup-labels.title"
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
            "generations-translations.resource-type-template.resource-type-popup-labels.search-input-placeholder"
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
                  "generations-translations.resource-type-template.form-labels.resource-type.label"
                )}
                placeholder={t(
                  "generations-translations.resource-type-template.form-labels.resource-type.placeholder"
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
                    "generations-translations.resource-type-template.form-labels.other.label"
                  )}
                  icon="document-text-outline"
                  name="otherResourceType"
                  value={data.otherResourceType ?? ""}
                  placeholder={t(
                    "generations-translations.resource-type-template.form-labels.other.placeholder"
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
                "generations-translations.resource-type-template.form-labels.btn-next-step"
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
