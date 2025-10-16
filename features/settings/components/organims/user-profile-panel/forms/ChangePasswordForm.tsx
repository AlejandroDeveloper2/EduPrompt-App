import { eventBus } from "@/core/events/EventBus";

import { useForm } from "@/shared/hooks/core";
import { useEventBusToggle } from "@/shared/hooks/events";

import { ChangePasswordData, changePasswordSchema } from "./validationSchema";

import { Form } from "@/shared/components/organims";

const initialValues: ChangePasswordData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePasswordForm = () => {
  const loading = useEventBusToggle("auth.changePassword.started", [
    "auth.changePassword.completed",
    "auth.changePassword.failed",
  ]);

  const { data, getFieldErrors, handleChange, handleClearInput, handleSubmit } =
    useForm({
      initialValues,
      validationSchema: changePasswordSchema,
      actionCallback: () => {
        const { newPassword, currentPassword } = data;
        eventBus.emit("auth.changePassword.requested", {
          newPassword,
          currentPassword,
        });
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
            loading={loading}
            loadingMessage="Cambiando contraseña..."
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default ChangePasswordForm;
