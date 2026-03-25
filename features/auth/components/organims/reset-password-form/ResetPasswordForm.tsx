import { useForm, useTranslations } from "@/shared/hooks/core";
import { useResetPasswordMutation } from "../../../hooks/mutations";

import { ResetPasswordData, resetPasswordSchema } from "./validationSchema";

import { Form } from "@/shared/components/organims";

const initialValues: ResetPasswordData = {
  newPassword: "",
  confirmPassword: "",
};

const ResetPasswordForm = () => {
  const { resetUserPassword, isPending } = useResetPasswordMutation();
  const { data, getFieldErrors, handleChange, handleClearInput, handleSubmit } =
    useForm({
      initialValues,
      validationSchema: resetPasswordSchema,
      actionCallback: () => {
        resetUserPassword(data.newPassword);
      },
    });

  const { t } = useTranslations();

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<ResetPasswordData>
              label={t(
                "auth_translations.reset_password_template.form_labels.new_password.label"
              )}
              icon="lock-closed-outline"
              name="newPassword"
              value={data.newPassword}
              placeholder={t(
                "auth_translations.reset_password_template.form_labels.new_password.placeholder"
              )}
              errorMessage={getFieldErrors("newPassword")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("newPassword")}
              password
            />
          </Form.Row.Item>
          <Form.Row.Item span={1}>
            <Form.Input<ResetPasswordData>
              label={t(
                "auth_translations.reset_password_template.form_labels.confirm_password.label"
              )}
              icon="lock-closed-outline"
              name="confirmPassword"
              value={data.confirmPassword}
              placeholder={t(
                "auth_translations.reset_password_template.form_labels.confirm_password.placeholder"
              )}
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
            label={t(
              "auth_translations.reset_password_template.form_labels.btn_reset_password"
            )}
            loading={isPending}
            loadingMessage={t(
              "auth_translations.reset_password_template.form_loading_messages.updating_password_msg"
            )}
            onPress={handleSubmit}
          />
        </Form.Row.Item>
        <Form.Row.Item span={1}>
          <Form.Link
            label={t(
              "auth_translations.reset_password_template.form_labels.login_link.label"
            )}
            linkLabel={t(
              "auth_translations.reset_password_template.form_labels.login_link.link_label"
            )}
            href="/auth"
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default ResetPasswordForm;
