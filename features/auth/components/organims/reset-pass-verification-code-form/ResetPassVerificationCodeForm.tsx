import { useForm } from "@/shared/hooks/core";

import {
  ResetPassVerificationCodeData,
  resetPassVerificationCodeSchema,
} from "./validationSchema";

import { useValidateResetPassCode } from "../../../hooks/mutations";

import { Form } from "@/shared/components/organims";

const initialValues: ResetPassVerificationCodeData = {
  code: "",
};

const ResetPassVerificationCodeForm = () => {
  const validateResetPassCode = useValidateResetPassCode();
  const { data, getFieldErrors, handleChange, handleSubmit } = useForm({
    initialValues,
    validationSchema: resetPassVerificationCodeSchema,
    actionCallback: () => {
      validateResetPassCode.mutate(data.code);
    },
  });

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.InputCode<ResetPassVerificationCodeData>
              label="Código de verificación"
              name="code"
              value={data.code}
              placeholders={{
                character1: "X",
                character2: "X",
                character3: "X",
                character4: "X",
              }}
              errorMessage={getFieldErrors("code")?.join(", ")}
              onChange={handleChange}
            />
          </Form.Row.Item>
        </Form.Row>
      </Form.Fields>
      <Form.Actions configRows={{ sm: 1, md: 1, lg: 1 }}>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="primary"
            width="100%"
            icon="checkmark-done-outline"
            label="Verificar código"
            loading={validateResetPassCode.isPending}
            loadingMessage="Validando código..."
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

export default ResetPassVerificationCodeForm;
