import { useForm, useTranslations } from "@/shared/hooks/core";
import { useSendResetPassRequestMutation } from "../../../hooks/mutations";

import {
  RequestPassResetData,
  requestPassResetSchema,
} from "./validationSchema";

import { Form } from "@/shared/components/organims";

const initialValues: RequestPassResetData = {
  email: "",
};

const RequestPassResetForm = () => {
  const sendResetPassRequest = useSendResetPassRequestMutation();
  const { data, getFieldErrors, handleChange, handleClearInput, handleSubmit } =
    useForm({
      initialValues,
      validationSchema: requestPassResetSchema,
      actionCallback: () => {
        sendResetPassRequest.mutate(data.email);
      },
    });

  const { t } = useTranslations();

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<RequestPassResetData>
              label={t(
                "auth_translations.request_pass_reset_template.form_labels.email.label"
              )}
              icon="at-outline"
              name="email"
              value={data.email}
              placeholder={t(
                "auth_translations.request_pass_reset_template.form_labels.email.placeholder"
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
              "auth_translations.request_pass_reset_template.form_labels.btn_send_request"
            )}
            loading={sendResetPassRequest.isPending}
            loadingMessage={t(
              "auth_translations.request_pass_reset_template.form_loading_messages.sending_request_msg"
            )}
            onPress={handleSubmit}
          />
        </Form.Row.Item>
        <Form.Row.Item>
          <Form.Link
            label={t(
              "auth_translations.request_pass_reset_template.form_labels.login_link.label"
            )}
            linkLabel={t(
              "auth_translations.request_pass_reset_template.form_labels.login_link.link_label"
            )}
            href="/auth"
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default RequestPassResetForm;
