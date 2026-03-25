import { useForm, useTranslations } from "@/shared/hooks/core";

import {
  ResetPassVerificationCodeData,
  resetPassVerificationCodeSchema,
} from "./validationSchema";

import { useValidateResetPassCodeMutation } from "../../../hooks/mutations";

import { Form } from "@/shared/components/organims";

const initialValues: ResetPassVerificationCodeData = {
  code: "",
};

const ResetPassVerificationCodeForm = () => {
  const validateResetPassCode = useValidateResetPassCodeMutation();
  const { data, getFieldErrors, handleChange, handleSubmit } = useForm({
    initialValues,
    validationSchema: resetPassVerificationCodeSchema,
    actionCallback: () => {
      validateResetPassCode.mutate(data.code);
    },
  });

  const { t } = useTranslations();

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.InputCode<ResetPassVerificationCodeData>
              label={t(
                "auth_translations.reset_pass_verification_code_template.form_labels.code.label"
              )}
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
            label={t(
              "auth_translations.reset_pass_verification_code_template.form_labels.btn_verify_code"
            )}
            loading={validateResetPassCode.isPending}
            loadingMessage={t(
              "auth_translations.reset_pass_verification_code_template.form_loading_messages.verifying_code_msg"
            )}
            onPress={handleSubmit}
          />
        </Form.Row.Item>
        <Form.Row.Item span={1}>
          <Form.Link
            label={t(
              "auth_translations.reset_pass_verification_code_template.form_labels.login_link.label"
            )}
            linkLabel={t(
              "auth_translations.reset_pass_verification_code_template.form_labels.login_link.link_label"
            )}
            href="/auth"
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default ResetPassVerificationCodeForm;
