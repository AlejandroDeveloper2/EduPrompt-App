import { useForm } from "@/lib/hooks/core";

import { ResetPasswordData, resetPasswordSchema } from "./validationSchema";

import Form from "../form/Form";

const initialValues: ResetPasswordData = {
  newPassword: "",
  confirmPassword: "",
};

const ResetPasswordForm = () => {
  const { data, getFieldErrors, handleChange, handleClearInput, handleSubmit } =
    useForm({
      initialValues,
      validationSchema: resetPasswordSchema,
      actionCallback: async () => {
        console.log(data);
      },
    });

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<ResetPasswordData>
              label="Nueva contraseña"
              icon="lock-closed-outline"
              name="newPassword"
              value={data.newPassword}
              placeholder="Nueva contraseña de acceso"
              errorMessage={getFieldErrors("newPassword")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("newPassword")}
              password
            />
          </Form.Row.Item>
          <Form.Row.Item span={1}>
            <Form.Input<ResetPasswordData>
              label="Confirmar contraseña"
              icon="lock-closed-outline"
              name="confirmPassword"
              value={data.confirmPassword}
              placeholder="Confirmar nueva contraseña"
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
            label="Actualizar contraseña"
            onPress={handleSubmit}
          />
        </Form.Row.Item>
        <Form.Row.Item span={1}>
          <Form.Link
            label="¿Ya tienes una cuenta?"
            linkLabel="Iniciar sesión"
            href="/auth"
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default ResetPasswordForm;
