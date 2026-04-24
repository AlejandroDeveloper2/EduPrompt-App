import { useOfflineResourcesStore } from "@/features/educational-resources/store";
import { useForm, useTranslations } from "@/shared/hooks/core";

import {
  NameResourcesGroupFormData,
  nameResourcesGroupSchema,
} from "./validationSchema";

import { Form } from "@/shared/components/organims";

interface NameResourcesGroupFormProps {
  goBack: () => void;
  closePopUp: () => void;
  clearSteps: () => void;
}

const initialValues: NameResourcesGroupFormData = {
  groupName: "",
};

const NameResourcesGroupForm = ({
  goBack,
  closePopUp,
}: NameResourcesGroupFormProps) => {
  const { shareResources, isSharing } = useOfflineResourcesStore(
    ({ shareResources, isSharing }) => ({ shareResources, isSharing }),
  );
  const { data, getFieldErrors, handleChange, handleClearInput, handleSubmit } =
    useForm({
      validationSchema: nameResourcesGroupSchema,
      initialValues,
      actionCallback: async () => {
        await shareResources(data.groupName).then(() => closePopUp());
      },
    });
  const { t } = useTranslations();

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<NameResourcesGroupFormData>
              label={t(
                "resources_translations.name_group_template.form_labels.name.label",
              )}
              icon="grid-outline"
              name="groupName"
              value={data.groupName}
              placeholder={t(
                "resources_translations.name_group_template.form_labels.name.placeholder",
              )}
              errorMessage={getFieldErrors("groupName")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("groupName")}
            />
          </Form.Row.Item>
        </Form.Row>
      </Form.Fields>
      <Form.Actions configRows={{ sm: 1, md: 1, lg: 2 }}>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="primary"
            width="100%"
            icon="share-outline"
            label={t(
              "resources_translations.name_group_template.form_labels.btn_share_resources",
            )}
            loading={isSharing}
            loadingMessage={t(
              "resources_translations.name_group_template.form_loading_messages.sharing_resources_msg",
            )}
            onPress={handleSubmit}
          />
        </Form.Row.Item>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="neutral"
            width="100%"
            icon="close-outline"
            label={t(
              "resources_translations.name_group_template.form_labels.btn_back",
            )}
            onPress={goBack}
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default NameResourcesGroupForm;
