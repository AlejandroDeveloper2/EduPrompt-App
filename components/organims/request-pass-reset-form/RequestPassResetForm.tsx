import { useRouter } from "expo-router";

import { useForm } from "@/lib/hooks/core";

import {
  RequestPassResetData,
  requestPassResetSchema,
} from "./validationSchema";

import Form from "../form/Form";

const initialValues: RequestPassResetData = {
  email: "",
};

const RequestPassResetForm = () => {
  const router = useRouter();
  const { data, getFieldErrors, handleChange, handleClearInput, handleSubmit } =
    useForm({
      initialValues,
      validationSchema: requestPassResetSchema,
      actionCallback: async () => {
        console.log(data);
        router.navigate("/auth/verify_reset_pass_code_screen");
      },
    });

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<RequestPassResetData>
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
      </Form.Fields>
      <Form.Actions configRows={{ sm: 1, md: 1, lg: 1 }}>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="primary"
            width="100%"
            icon="send-outline"
            label="Enviar solicitud"
            onPress={handleSubmit}
          />
        </Form.Row.Item>
        <Form.Row.Item>
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

export default RequestPassResetForm;
