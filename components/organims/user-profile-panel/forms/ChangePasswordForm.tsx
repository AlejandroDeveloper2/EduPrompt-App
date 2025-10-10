import { useForm } from "@/lib/hooks/core";
import { useChangeUserPassword } from "@/lib/hooks/mutations/auth";

import { ChangePasswordData, changePasswordSchema } from "./validationSchema";

import Form from "../../form/Form";

const initialValues: ChangePasswordData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePasswordForm = () => {
  const { mutate, isPending } = useChangeUserPassword();

  const { data, getFieldErrors, handleChange, handleClearInput, handleSubmit } =
    useForm({
      initialValues,
      validationSchema: changePasswordSchema,
      actionCallback: () => {
        const { newPassword, currentPassword } = data;
        mutate({ newPassword, currentPassword });
      },
    });

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<ChangePasswordData>
              label="Contraseña actual"
              icon="lock-closed-outline"
              name="currentPassword"
              value={data.currentPassword}
              placeholder="Contraseña actual"
              errorMessage={getFieldErrors("currentPassword")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("currentPassword")}
              password
            />
          </Form.Row.Item>
        </Form.Row>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 2 }}>
          <Form.Row.Item span={1}>
            <Form.Input<ChangePasswordData>
              label="Nueva contraseña"
              icon="lock-closed-outline"
              name="newPassword"
              value={data.newPassword}
              placeholder="Nueva contraseña"
              errorMessage={getFieldErrors("newPassword")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("newPassword")}
              password
            />
          </Form.Row.Item>
          <Form.Row.Item span={1}>
            <Form.Input<ChangePasswordData>
              label="Confirmar nueva contraseña"
              icon="lock-closed-outline"
              name="confirmPassword"
              value={data.confirmPassword}
              placeholder="Confirmar contraseña"
              errorMessage={getFieldErrors("confirmPassword")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("confirmPassword")}
              password
            />
          </Form.Row.Item>
        </Form.Row>
      </Form.Fields>
      <Form.Actions configRows={{ sm: 1, md: 1, lg: 1 }}>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="primary"
            width="100%"
            icon="pencil-outline"
            label="Cambiar contraseña"
            onPress={handleSubmit}
            loading={isPending}
            loadingMessage="Cambiando contraseña..."
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default ChangePasswordForm;
