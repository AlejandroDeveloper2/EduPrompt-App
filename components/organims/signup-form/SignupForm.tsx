import { SignupData, signupSchema } from "./validationSchema";

import { useForm } from "@/lib/hooks/core";
import { useSignup } from "@/lib/hooks/mutations/auth";

import Form from "../form/Form";
import TermsAndPolicies from "./terms-and-policies/TermsAndPolicies";

const initialValues: SignupData = {
  email: "",
  password: "",
  userName: "",
  confirmPassword: "",
  termsAndPolicies: false,
};

const SignupForm = () => {
  const signup = useSignup();
  const {
    data,
    getFieldErrors,
    handleChange,
    onExternalInputChange,
    handleClearInput,
    handleSubmit,
  } = useForm({
    initialValues,
    validationSchema: signupSchema,
    actionCallback: () => {
      const { userName, email, password } = data;
      signup.mutate({ userName, email, password });
    },
  });

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<SignupData>
              label="Nombre de usuario"
              icon="person-outline"
              name="userName"
              value={data.userName}
              placeholder="Nombre de usuario"
              errorMessage={getFieldErrors("userName")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("userName")}
            />
          </Form.Row.Item>
          <Form.Row.Item span={1}>
            <Form.Input<SignupData>
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
        </Form.Row>
        <Form.Row configRows={{ sm: 1, md: 2, lg: 2 }}>
          <Form.Row.Item span={1}>
            <Form.Input<SignupData>
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
          <Form.Row.Item span={1}>
            <Form.Input<SignupData>
              label="Confirmar contraseña"
              icon="lock-closed-outline"
              name="confirmPassword"
              value={data.confirmPassword}
              placeholder="Confirmar contraseña "
              errorMessage={getFieldErrors("confirmPassword")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("confirmPassword")}
              password
            />
          </Form.Row.Item>
        </Form.Row>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item>
            <Form.Link
              label="¿Ya tienes una cuenta?"
              linkLabel="Iniciar sesión"
              href="/auth"
            />
          </Form.Row.Item>
        </Form.Row>
      </Form.Fields>
      <Form.Actions configRows={{ sm: 1, md: 1, lg: 1 }}>
        <Form.Row.Item span={1}>
          <TermsAndPolicies
            data={data}
            errorMessage={getFieldErrors("termsAndPolicies")?.join(", ")}
            onExternalInputChange={onExternalInputChange}
          />
        </Form.Row.Item>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="primary"
            width="100%"
            icon="add-outline"
            label="Crear cuenta"
            loading={signup.isPending}
            loadingMessage="Creando cuenta..."
            onPress={handleSubmit}
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default SignupForm;
