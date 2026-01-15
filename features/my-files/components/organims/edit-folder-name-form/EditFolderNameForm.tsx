/* eslint-disable react-hooks/exhaustive-deps */
import { useForm, useTranslations } from "@/shared/hooks/core";
import { useEffect } from "react";

import { useFoldersStore } from "@/features/my-files/hooks/store";

import { editFolderSchema, FolderNameFormData } from "./validationSchema";

import { Form } from "@/shared/components/organims";

interface EditFolderNameFormProps {
  folderId: string;
  folderName: string;
  onClosePopUp: () => void;
}

const initialValues: FolderNameFormData = {
  name: "",
};

const EditFolderNameForm = ({
  folderId,
  folderName,
  onClosePopUp,
}: EditFolderNameFormProps) => {
  const { editFolderName } = useFoldersStore();

  const {
    data,
    handleChange,
    handleClearInput,
    handleSubmit,
    getFieldErrors,
    setValues,
  } = useForm({
    initialValues,
    validationSchema: editFolderSchema,
    actionCallback: () => {
      editFolderName(folderId, data.name);
      onClosePopUp();
    },
    noReset: true,
  });

  const { t } = useTranslations();

  useEffect(() => {
    setValues({ name: folderName });
  }, [folderName]);

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<FolderNameFormData>
              label={t(
                "my-files-translations.edit-folder-name-template.form-labels.name.label"
              )}
              icon="text-outline"
              name="name"
              value={data.name}
              placeholder={t(
                "my-files-translations.edit-folder-name-template.form-labels.name.placeholder"
              )}
              errorMessage={getFieldErrors("name")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("name")}
            />
          </Form.Row.Item>
        </Form.Row>
      </Form.Fields>
      <Form.Actions configRows={{ sm: 1, md: 1, lg: 2 }}>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="primary"
            width="100%"
            icon="pencil-outline"
            label={t(
              "my-files-translations.edit-folder-name-template.form-labels.btn-edit-name"
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
              "my-files-translations.edit-folder-name-template.form-labels.btn-cancel"
            )}
            onPress={onClosePopUp}
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default EditFolderNameForm;
