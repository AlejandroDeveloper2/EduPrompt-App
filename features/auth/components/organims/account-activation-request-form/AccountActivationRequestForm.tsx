import { useForm, useTranslations } from "@/shared/hooks/core";
import { useResendEmailVerificationMutation } from "../../../hooks/mutations";

import {
  AccountActivationRequestData,
  accountActivationRequestSchema,
} from "./validationSchema";

import { Form } from "@/shared/components/organims";

const initialValues: AccountActivationRequestData = {
  email: "",
};

const AccountActivationRequestForm = () => {
  const { mutate, isPending } = useResendEmailVerificationMutation();
  const { data, getFieldErrors, handleChange, handleClearInput, handleSubmit } =
    useForm({
      initialValues,
      validationSchema: accountActivationRequestSchema,
      actionCallback: () => {
        mutate(data.email);
      },
    });

  const { t } = useTranslations();

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<AccountActivationRequestData>
              label={t(
                "auth_translations.account_activation_request_template.form_labels.email.label"
              )}
              icon="at-outline"
              name="email"
              value={data.email}
              placeholder={t(
                "auth_translations.account_activation_request_template.form_labels.email.placeholder"
              )}
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
            label={t(
              "auth_translations.account_activation_request_template.form_labels.btn_send_activation_request"
            )}
            loading={isPending}
            loadingMessage={t(
              "auth_translations.account_activation_request_template.form_loading_messages.sending_request_msg"
            )}
            onPress={handleSubmit}
          />
        </Form.Row.Item>
        <Form.Row.Item>
          <Form.Link
            label={t(
              "auth_translations.account_activation_request_template.form_labels.login_link.label"
            )}
            linkLabel={t(
              "auth_translations.account_activation_request_template.form_labels.login_link.link_label"
            )}
            href="/auth"
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default AccountActivationRequestForm;
