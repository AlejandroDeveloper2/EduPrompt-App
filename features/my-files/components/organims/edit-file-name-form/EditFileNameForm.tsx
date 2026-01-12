/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { useFilesStore } from "@/features/my-files/hooks/store";
import { useForm } from "@/shared/hooks/core";

import { FileNameFormData, editFileSchema } from "./validationSchema";

import { Form } from "@/shared/components/organims";

interface EditFileNameFormProps {
  folderId: string;
  fileId: string;
  fileName: string;
  onClosePopUp: () => void;
}

const initialValues: FileNameFormData = {
  name: "",
};

const EditFileNameForm = ({
  folderId,
  fileId,
  fileName,
  onClosePopUp,
}: EditFileNameFormProps) => {
  const { editFileName } = useFilesStore();

  const {
    data,
    handleChange,
    handleClearInput,
    handleSubmit,
    getFieldErrors,
    setValues,
  } = useForm({
    initialValues,
    validationSchema: editFileSchema,
    actionCallback: () => {
      editFileName(folderId, fileId, data.name);
      onClosePopUp();
    },
    noReset: true,
  });

  useEffect(() => {
    setValues({ name: fileName });
  }, [fileName]);

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<FileNameFormData>
              label="Nombre (*)"
              icon="text-outline"
              name="name"
              value={data.name}
              placeholder="Digita el nombre del archivo"
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
            label="Actualizar nombre"
            onPress={handleSubmit}
          />
        </Form.Row.Item>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="neutral"
            width="100%"
            icon="close-outline"
            label="Cancelar"
            onPress={onClosePopUp}
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default EditFileNameForm;
