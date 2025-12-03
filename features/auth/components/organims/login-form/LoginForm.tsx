import { useForm } from "@/shared/hooks/core";
import { useLoginMutation } from "../../../hooks/mutations";

import { LoginCredentials, loginSchema } from "./validationSchema";

import { Form } from "@/shared/components/organims";

const initialValues: LoginCredentials = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const login = useLoginMutation();
  const { data, getFieldErrors, handleChange, handleClearInput, handleSubmit } =
    useForm({
      initialValues,
      validationSchema: loginSchema,
      actionCallback: () => {
        login.mutate(data);
      },
    });

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<LoginCredentials>
              label="Correo electrónico"
              icon="at-outline"
              name="email"
              value={data.email}
              placeholder="Correo electrónico"
              errorMessage={getFieldErrors("email")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("email")}
            />
          </Form.Row.Item>
          <Form.Row.Item span={1}>
            <Form.Input<LoginCredentials>
              label="Contraseña"
              icon="lock-closed-outline"
              name="password"
              value={data.password}
              placeholder="Contraseña de acceso"
              errorMessage={getFieldErrors("password")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("password")}
              password
            />
          </Form.Row.Item>
          <Form.Row.Item>
            <Form.Link
              label="¿Has olvidado tu contraseña?"
              linkLabel="Recuperar aquí"
              href="/auth/request_password_reset_screen"
            />
          </Form.Row.Item>
        </Form.Row>
      </Form.Fields>
      <Form.Actions configRows={{ sm: 1, md: 1, lg: 1 }}>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="primary"
            width="100%"
            icon="log-in-outline"
            label="Iniciar sesión"
            onPress={handleSubmit}
            loading={login.isPending}
            loadingMessage="Validando credenciales..."
          />
        </Form.Row.Item>
        <Form.Row.Item span={1}>
          <Form.Link
            label="¿Aún no tienes una cuenta?"
            linkLabel="Registrate aquí"
            href="/auth/signup_screen"
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default LoginForm;
